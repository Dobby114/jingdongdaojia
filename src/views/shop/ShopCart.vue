<template>
  <div class="mask" v-if="showCartList && calculate.totalNum > 0" @click="handleShowCartlist"></div>
  <div class="product" v-if="showCartList && calculate.totalNum > 0">
    <div class="product__state">
      <div class="product__state__selectall">
        <span
          class="icon iconfont"
          v-html="calculate.allSelectd ? '&#xe810;' : '&#xe61a;'"
          @click="
            () => {
              changeSelectAllState(shopId)
            }
          "
        ></span>
        全选
      </div>
      <div
        class="product__state__cleanall"
        @click="
          () => {
            clearAll(shopId)
          }
        "
      >
        清空购物车
      </div>
    </div>
    <ul>
      <li v-for="item in product" :key="item._id" v-show="item.count > 0">
        <div class="iconfont check" v-html="item.check ? '&#xe810;' : '&#xe61a;'" @click="() => changeProductCheck(shopId, item._id)"></div>
        <img :src="item.imgUrl" alt="" />
        <div class="info">
          <h3>{{ item.name }}</h3>
          <div class="price">
            <div class="price__now">{{ item.price }}</div>
            <div class="price__origin">{{ item.oldPrice }}</div>
          </div>
        </div>
        <div class="number">
          <span
            class="number__minus"
            @click="
              () => {
                changeCount(shopId, item._id, item, -1)
              }
            "
            >-</span
          >
          <!-- 一开始没有的话，赋0！！ -->
          {{ item.count || 0 }}
          <span
            class="number__add"
            @click="
              () => {
                changeCount(shopId, item._id, item, 1)
              }
            "
            >+</span
          >
        </div>
      </li>
    </ul>
  </div>
  <div class="bottom">
    <div class="bottom__basket" @click="handleShowCartlist">
      <img src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="" />
      <div class="tag">{{ calculate.totalNum }}</div>
    </div>
    <div class="bottom__allprice">
      总计：<span class="price">&yen;{{ calculate.totalPrice }}</span>
    </div>
    <!-- 这里应该添加一个判断，如果购物车为0的话，弹出提示框，如果不为0才跳转 -->
    <div class="bottom__check" @click="checkClick">去结算</div>
  </div>
  <Toast v-if="show" :toastMessa="toastMessa" />
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/commonCartEffect'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useCheckEffect = (product, shopId) => {
  const router = useRouter()
  const { show, toastMessa, showToast } = useToastEffect()
  // console.log(JSON.stringify(product.value))
  // console.log(product)o')
  // 判断它是否为空对象！
  const checkClick = () => {
    JSON.stringify(product.value) === '{}' ? showToast('请至少添加一种添加商品!') : router.push({ path: `/orderConfirmation/${shopId}` })
  }
  return { checkClick, show, toastMessa }
}
// 底部商品数量总和与价格总和//底部勾选的逻辑
export const useCartEffect = (shopId, showCartList) => {
  const store = useStore()
  const cartList = store.state.cartList
  const calculate = computed(() => {
    const productList = cartList[shopId]
    let totalNum = 0
    let totalPrice = 0
    let allSelectd = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        totalNum += product.count
        if (product.check) {
          totalPrice += product.count * product.price
        }
        // 循环里面的商品，只要有一个不满足check为真，那就会改变result的值
        if (!product.check) {
          allSelectd = false
        }
      }
    }
    if (totalNum <= 0) {
      showCartList.value = false
    }
    totalPrice = totalPrice.toFixed(2)
    return { totalNum, totalPrice, allSelectd }
  })
  // 直接用计算属性来写全部选中的状态
  // 因为这里其实不涉及到需要改变stroe里存储的数据状态，只是选中按钮的状态而已！！
  // 底部购物栏中的商品展示的逻辑
  // 1、拿到store中的数据，然后利用里面的数据，将商品通过v-for的方式展示出来
  const product = computed(() => {
    const productList = cartList[shopId] || {}
    return productList
  })
  const { changeCount } = useCommonCartEffect()
  // 底部勾选的逻辑----绑定click事件，点击，发起修改store中的数据的请求，将这个页面对应的商品的check属性置反，一开始的属性应该为true---加入购物车的默认状态应该是选中
  const changeProductCheck = (shopId, productId) => {
    store.commit('changeProductCheck', { shopId, productId })
  }
  const changeSelectAllState = shopId => {
    store.commit('changeSelectAllState', { shopId })
  }
  const clearAll = shopId => {
    store.commit('clearAll', { shopId })
  }
  return { calculate, product, changeCount, changeProductCheck, changeSelectAllState, clearAll }
}
// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  // 定义一个响应式数据来决定是否显示购物车---直接再这里写
  const showCartList = ref(false)
  const handleShowCartlist = () => {
    showCartList.value = !showCartList.value
  }
  // if (totalNum === 0) {
  //   showCartList.value = ref(false)
  // }
  return { showCartList, handleShowCartlist }
}

export default {
  name: 'ShopCart',
  components: { Toast },
  setup() {
    // 为什么要用computed？
    // 定义页面上的商品数量总和和价钱总和的函数
    const route = useRoute()
    const shopId = route.params.id
    const { showCartList, handleShowCartlist } = toggleCartEffect()
    const { calculate, product, changeCount, changeProductCheck, changeSelectAllState, clearAll } = useCartEffect(shopId, showCartList)
    const { checkClick, show, toastMessa } = useCheckEffect(product, shopId)
    return { calculate, product, shopId, showCartList, changeCount, changeProductCheck, changeSelectAllState, clearAll, handleShowCartlist, checkClick, show, toastMessa }
  }
}
</script>
<style scoped lang="scss">
@import '../../style/virable.scss';
@import '../../style/mixins.scss';
.mask {
  // 为什么一定要这样写才生效？？！只设置两个数值，然后写height100%和wight100%为啥不可以
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.product {
  // 在子元素上写flex=1，就表示占父元素剩下的空间的几份
  width: 100%;
  position: absolute;
  bottom: 0.5rem;
  background: #fff;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  &__state {
    display: flex;
    justify-content: space-between;
    height: 0.52rem;
    line-height: 0.52rem;
    font-size: 0.14rem;
    margin: 0 0.18rem 0 0.18rem;
    // z-index: 100;
    background-color: #fff;
    &__selectall {
      span {
        display: inline-block;
        color: #0091ff;
        margin-right: 0.084rem;
        font-size: 0.18rem;
      }
    }
  }
  ul {
    padding-top: 0.16rem;
    border-top: solid 0.01rem #f1f1f1;
    border-bottom: solid 0.01rem #f1f1f1;
    // z-index: 100;
  }
  li {
    height: 0.46rem;
    position: relative;
    display: flex;
    margin: 0 0.18rem 0.16rem 0;
    .check {
      line-height: 0.54rem;
      text-align: center;
      width: 0.54rem;
      height: 100%;
      font-size: 0.18rem;
      color: #0091ff;
    }
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
          font-size: 0.14 rem;
          font-weight: 700;

          line-height: 0.2rem;
          color: red;
          &::before {
            content: '￥';
            font-size: 0.12rem;
            font-weight: 400;
          }
        }
        &__origin {
          margin-left: 0.06rem;
          line-height: 0.2rem;
          font-size: 0.12rem;
          color: #999;
          text-decoration: line-through;
          &::before {
            content: '￥';
            font-size: 0.12rem;
          }
        }
      }
    }
    .number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      height: 0.18rem;
      font-size: 0.12rem;
      color: #333;
      &__minus,
      &__add {
        display: inline-block;
        width: 0.18rem;
        height: 0.18rem;
        border: solid 0.01rem #666;
        border-radius: 50%;
        font-size: 0.18rem;
        line-height: 0.14rem;
        text-align: center;
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
.bottom {
  width: 100%;
  height: 0.5rem;
  background-color: white;
  position: absolute;
  left: 0;
  bottom: 0;
  border: 0.01rem solid #fff;
  display: flex;
  &__basket {
    position: relative;
    line-height: 0.5rem;
    width: 0.76rem;
    text-align: center;
    img {
      width: 0.29rem;
    }
    .tag {
      // 只能一起放大缩小！
      position: absolute;
      top: 0.04rem;
      left: 0.48rem;
      padding: 0 0.06rem;
      // width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      text-align: center;
      color: #fff;
      border-radius: 0.1rem;
      background-color: red;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__allprice {
    flex: 1;
    line-height: 0.5rem;
    .price {
      // 这个vertical-align不是很懂
      vertical-align: middle;
      font-size: 0.18rem;
      color: red;
      font-weight: 700;
    }
  }
  &__check {
    height: 100%;
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.14rem;
    color: #fff;
  }
}
</style>
