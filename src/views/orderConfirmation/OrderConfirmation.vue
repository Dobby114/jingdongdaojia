<template>
  <div class="container">
    <div class="topbackground"></div>
    <div class="wrappar">
      <div class="header">
        <!-- :to="`/shop/${item.name}` -->
        <div class="themes"><router-link :to="`/shop/${shopId}`" class="iconfont">&#xe6db;</router-link>确认订单</div>
        <div class="address">
          <div class="address__info">
            <h3>收货地址</h3>
            <p class="address__info__text">上海大学延长校区行健楼10层技园2号楼10层</p>
            <p class="address__info__concact">牛牛(先生) 1234556767</p>
          </div>
          <div class="iconfont address__organize">&#xe6db;</div>
        </div>
      </div>
      <div class="content">
        <!-- 局部滚动实现方法，给content加一个高度限制，和一个overflow-y：scroll
          然后元素超出这个高度，就会自动实现在这个content区域的滚动！ -->
        <h3 class="shopname">{{ shopId }}</h3>
        <ul>
          <li v-for="item in products" :key="item._id" v-show="showProducts.includes(item._id)">
            <img :src="item.imgUrl" alt="" />
            <div class="info">
              <h3>{{ item.name ? item.name : '' }}</h3>
              <div class="price">
                <div class="price__now">{{ item.price }} x {{ item.count }}</div>
              </div>
            </div>
            <!-- 一开始没有的话，赋0！！ -->
            <div class="allprice">{{ (item.count * item.price).toFixed(2) }}</div>
          </li>
          <div class="fold" @click="productHiddenChange" v-if="showFold">共计{{ Object.keys(products).length }}件/1.4kg <span class="iconfont" v-html="foldIcon ? '&#xe665;' : '&#xe686;'"></span></div>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="allprice">
        实付金额 <b>¥{{ totalPrice }}</b>
      </div>
      <button class="submit" @click="submitClick">提交订单</button>
    </div>
    <div v-show="mask" class="mask">
      <div v-show="!paySuccess" class="confirm">
        <h3>确认要离开收银台？</h3>
        <p>请尽快完成支付，否则将被取消</p>
        <div class="chose">
          <button class="cancle" @click="cancleClick">取消订单</button>
          <button @click="() => payClick(shopId, products)">确认支付</button>
        </div>
      </div>
      <div v-show="paySuccess" class="paysuccess">
        <div class="iconfont exit" @click="() => exitClick(router)">&#xe65c;</div>
        <div class="iconfont yes">&#xe80f;</div>
        <div class="prompt">支付成功，等待配送</div>
      </div>
    </div>
    <Toast v-if="show" :toastMessa="toastMessa" />
  </div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/commonCartEffect'
import { useCartEffect } from '../shop/ShopCart.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const submitOrder = (store, orderInfo) => {
  store.commit('submitOrder', { orderInfo })
}
const useButtonEffect = (showToast, clearAll, shopId, store) => {
  // 点击事件
  // 点击提交订单后出现mask
  const mask = ref(false)
  const paySuccess = ref(false)
  const submitClick = () => {
    mask.value = true
  }
  // 点击取消订单，mask消失---用变量来控制mask是否渲染--v-if或者v-show
  const cancleClick = () => {
    mask.value = false
  }
  // 点击确认支付，mask不要消失--同时进入确认订单页面（这个先不做）用弹出支付成功，等待配送取代---变量控制
  // 下完订单后对应商铺的购物车应该清空然后跳到我的订单页面
  const payClick = async (shopId, productsList) => {
    // 把订单数据传递到后端，创建订单
    const products = []
    const orderProducts = []
    for (const i in productsList) {
      const product = productsList[i]
      products.push({ id: product._id, name: product.name })
      orderProducts.push({ orderSales: product.count, product: { name: product.name, img: product.imgUrl, price: product.price, sales: product.sales } })
    }
    // try———catch保证就算是地址错了，还能往下，最后得到catch的错误
    // 点击登录发起post请求,传入后端需要的参数---接口返回数据，根据数据判断是否请求成功
    try {
      // 如果用户没有输入账号或者密码的话，做一个校验提示---如果没填的话，就不会进行下面的发出请求操作

      // 根据后端接口返回的数据来判断
      // const result1 = await post2('/api/test', { username: 'lyh' })
      // console.log(result1)
      const result = await post('/api/order', {
        addressId: '上海大学延长校区行健楼10层技园2号楼10层',
        shopId,
        shopName: shopId,
        isCanceled: false,
        products
      })
      if (result?.errno === 0) {
        // 创建订单成功，显示成功
        paySuccess.value = true
      } else {
        showToast('提交订单失败')
      }
    } catch (err) {
      showToast('提交订单失败')
      // console.error(err.message)
    }
    // console.log(orderProducts)
    // 把订单数据存到localstorage里的
    const orderInfo = {
      address: '上海大学延长校区行健楼10层技园2号楼10层',
      shopId: shopId,
      shopName: shopId,
      isCanceled: false,
      products: orderProducts
    }
    // console.log(orderInfo)
    submitOrder(store, orderInfo)
  }
  const exitClick = router => {
    mask.value = false
    paySuccess.value = false
    router.push({ name: 'OrderList' })
    // 跳转之后清空这个页面的购物车的内容
    clearAll(shopId)
  }
  return { submitClick, cancleClick, payClick, exitClick, mask, paySuccess }
}
const hiddenProductsEffect = products => {
  // 唉貌似不对，不是改变product因为他牵扯到页面上的计算，用v-show来控制，点击按钮i改变给v-show的值
  // 当商品数量超过2个，只显示前两个商品且出现折叠按钮--折叠按钮上的信息对应
  const showFold = ref(false)
  // 默认是折叠的
  const foldIcon = ref(true)
  // 获取所有商品的keyid--对应每个商品的_id的值
  const productKeys = Object.keys(products)
  const showProducts = ref(productKeys)
  if (productKeys.length > 2) {
    showFold.value = true
    // 当用变量作为对象中的属性名时，要用[]把变量包裹起来！！}
    // 取前两个商品---slice不会改变原数组splice会改变
    showProducts.value = productKeys.slice(0, 2)
    // includes函数判断某个数字中是否包含某个元素！
    // console.log(showProducts)
  }
  const productHiddenChange = () => {
    // 点击判断，如果目前是折叠的，就让foldIcon的值变为false同时，改变showProducts，如果不是则相反
    foldIcon.value ? (showProducts.value = productKeys) : (showProducts.value = productKeys.slice(0, 2))
    foldIcon.value = !foldIcon.value
  }
  // 点击折叠按钮之后，折叠按钮变成折叠功能并且显示所有的商品----改变icon图标而已
  // 再次点击折叠按钮，将商品折叠为2个
  return { showFold, showProducts, foldIcon, productHiddenChange }
}
export default {
  name: 'OrderConfirmation',
  components: { Toast },
  setup() {
    // 1.拿到相对应的商户的购物车里的信息
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.id
    // 发现一个问题，这种写法只能在setup函数里使用获得路由和store！！？？
    const store = useStore()
    const { cartList } = useCommonCartEffect()
    const products = cartList.value[shopId]
    // 为啥我这里用计算属性就要变成这样？
    const { calculate, clearAll } = useCartEffect(shopId, products)
    const totalPrice = calculate.value.totalPrice
    const { show, toastMessa, showToast } = useToastEffect()
    const { submitClick, cancleClick, payClick, exitClick, mask, paySuccess } = useButtonEffect(showToast, clearAll, shopId, store)
    const { showFold, productHiddenChange, foldIcon, showProducts } = hiddenProductsEffect(products)
    return { shopId, products, totalPrice, submitClick, cancleClick, payClick, exitClick, mask, paySuccess, show, toastMessa, router, showFold, foldIcon, productHiddenChange, showProducts }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/virable.scss';
.container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #eee;
  .topbackground {
    width: 100%;
    height: 1.59rem;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
    z-index: 1;
  }
  .wrappar {
    position: absolute;
    left: 0.18rem;
    top: 0.26rem;
    right: 0.18rem;
    bottom: 0.5rem;
  }
  .header {
    .themes {
      color: #fff;
      font-size: 0.16rem;
      .iconfont {
        color: #fff;
        margin-right: 1.2rem;
        display: inline-block;
        font-size: 0.27rem;
        vertical-align: middle;
      }
    }
    .address {
      margin-top: 0.22rem;
      height: 1.11rem;
      width: 3.39rem;
      background-color: #fff;
      display: float;
      &__info {
        float: left;
        padding: 0.16rem 0 0.16rem 0.16rem;
        color: #333333;
        h3 {
          font-size: 0.16rem;
          padding-bottom: 0.14rem;
        }
        &__text {
          font-size: 0.14rem;
          padding-bottom: 0.1rem;
          color: #333333;
          width: 2rem;
          @include ellipsis;
        }
        &__concact {
          color: #666666;
        }
      }
      &__organize {
        float: right;
        line-height: 1.11rem;
        font-size: 0.2rem;
        transform: rotateY(180deg);
        color: #666666;
        margin-right: 0.16rem;
      }
    }
  }

  .content {
    margin-top: 0.16rem;
    padding-bottom: 0.55rem;
    height: 4rem;
    overflow-y: scroll;
    .shopname {
      padding: 0.16rem 0 0 0.16rem;
      background-color: #fff;
    }
    ul {
      padding: 0.16rem;
      // z-index: 100;
      background-color: #fff;
      li {
        padding-bottom: 0.16rem;
        position: relative;
        display: flex;
        img {
          height: 0.46rem;
          width: 0.46rem;
          margin-right: 0.16rem;
          // margin-bottom: 0.12rem;
        }
        .info {
          margin-bottom: 0.12rem;
          h3 {
            display: inline-block;
            width: 1.2rem;
            //   单行文字超出用省略号
            //   scss语法：引入某一个样式
            margin-bottom: 0.06rem;
            @include ellipsis;
          }
          .price {
            display: flex;
            height: 0.14rem;
            &__now {
              font-size: 0.14rem;
              font-weight: 700;
              line-height: 0.2rem;
              color: #e93b3b;
              &::before {
                content: '¥';
                font-size: 0.1rem;
                font-weight: 400;
                transform: scale(0.5, 0.5);
                transform-origin: center top;
              }
            }
          }
        }
      }
      .fold {
        width: 3.08rem;
        height: 0.28rem;
        background: #f5f5f5;
        text-align: center;
        line-height: 0.28rem;
        font-size: 0.14rem;
        color: #999999;
        span {
          font-size: 0.18rem;
        }
      }
    }
    .allprice {
      position: absolute;
      right: 0;
      bottom: 0.24rem;
      // height: 0.18rem;
      font-size: 0.14rem;
      font-weight: 700;
      color: #333;
      &::before {
        content: '¥';
        font-size: 0.1rem;
        font-weight: 400;
      }
      &__minus {
        margin-right: 0.04rem;
      }
      &__add {
        background-color: #0091ff;
        color: $base-color;
        border: none;
        margin-left: 0.04rem;
      }
    }
  }
}
.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 0.5rem;
  width: 100%;
  .allprice {
    flex: 1;
    background-color: #fff;
    font-size: 0.14rem;
    padding: 0 0 0 0.24rem;
    line-height: 0.5rem;
  }
  .submit {
    width: 0.98rem;
    background-color: #4fb0f9;
    border: none;
    color: #fff;
    font-size: 0.14rem;
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  .confirm,
  .paysuccess {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.58rem;
    background-color: #fff;
    text-align: center;
  }
  .confirm {
    h3 {
      padding-top: 0.24rem;
      font-size: 0.18rem;
    }
    p {
      padding-top: 0.1rem;
      font-size: 0.14rem;
      color: #666666;
    }
    .chose {
      padding-top: 0.24rem;
      button {
        margin: 0;
        padding: 0;
        outline: none; //消除默认点击蓝色边框效果
        font-size: 0.14rem;
        border: 0.01rem solid #4fb0f9;
        background: #4fb0f9;
        width: 0.8rem;
        height: 0.32rem;
        border-radius: 0.32rem;
        color: #ffffff;
      }
      .cancle {
        margin-right: 0.24rem;
        background: #fff;
        color: #4fb0f9;
      }
    }
  }
  .paysuccess {
    position: relative;
    .exit {
      position: absolute;
      top: 0.12rem;
      right: 0.12rem;
      font-size: 0.18rem;
      color: #666666;
    }
    .yes {
      padding-top: 0.42rem;
      font-size: 0.4rem;
      color: #000000;
      font-weight: 700;
    }
    .prompt {
      padding-top: 0.12rem;
      font-size: 0.18rem;
      font-weight: 700;
      color: #333333;
    }
  }
}
</style>
