<template>
  <div class="container">
    <div class="header">我的全部购物车</div>
    <div class="box">
      <!-- 局部滚动实现方法，给content加一个高度限制，和一个overflow-y：scroll
          然后元素超出这个高度，就会自动实现在这个content区域的滚动！ -->
      <template v-for="(item, index) in cartList" :key="index">
        <li class="content" v-if="JSON.stringify(item) !== '{}'">
          <h3 class="shopname">{{ index }}</h3>
          <ul>
            <li v-for="(product, i) in item" :key="product._id" v-show="foldControl[index].showNum.includes(i)">
              <img :src="product.imgUrl" alt="" />
              <div class="info">
                <h3>{{ product.name ? product.name : '' }}</h3>
                <div class="price">
                  <div class="price__now">{{ product.price }} x {{ product.count }}</div>
                </div>
              </div>
              <!-- 一开始没有的话，赋0！！ -->
              <div class="allprice">{{ (product.count * product.price).toFixed(2) }}</div>
            </li>
            <div class="fold" @click="() => productHiddenChange(index)" v-if="Object.keys(item).length > 2 ? true : false">共计{{ Object.keys(item).length }}件/1.4kg <span class="iconfont" v-html="foldControl[index].foldIcon ? '&#xe665;' : '&#xe686;'"></span></div>
          </ul>
        </li>
      </template>
    </div>
  </div>
  <Foot />
</template>
<script>
import Foot from '../../components/Foot.vue'
import { useStore } from 'vuex'
import { reactive } from 'vue'

const hiddenProductsEffect = cartList => {
  // 由于一开始的cartList的数据结构设计的不好，所以现在只能通过分析返回一个新的数据
  // showProducts--通过click控制显示的商品个数
  // foldIcon--通过click控制icon的显示
  // 设置默认值
  const foldControl = reactive({})
  for (const item in cartList) {
    // 默认值
    const productList = cartList[item]
    const productKeys = Object.keys(productList)
    foldControl[item] = { foldIcon: true, showNum: productKeys.length > 2 ? productKeys.slice(0, 2) : productKeys, allNum: productKeys }
  }
  const productHiddenChange = shopName => {
    // 点击判断，如果目前是折叠的，就让foldIcon的值变为false同时，改变showProducts，如果不是则相反
    foldControl[shopName].foldIcon = !foldControl[shopName].foldIcon
    foldControl[shopName].showNum = foldControl[shopName].foldIcon ? foldControl[shopName].allNum.slice(0, 2) : foldControl[shopName].allNum
    // foldIcon.value ? (showProducts.value = productKeys) : (showProducts.value = productKeys.slice(0, 2))
    // foldIcon.value = !foldIcon.value
  }
  // 点击折叠按钮之后，折叠按钮变成折叠功能并且显示所有的商品----改变icon图标而已
  // 再次点击折叠按钮，将商品折叠为2个
  return { foldControl, productHiddenChange }
}
export default {
  name: 'CartList',
  components: { Foot },
  setup() {
    const store = useStore()
    const { cartList } = store.state
    const { foldControl, productHiddenChange } = hiddenProductsEffect(cartList)
    return { cartList, foldControl, productHiddenChange }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/virable.scss';
.container {
  background-color: #f9f9f9;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  .header {
    padding-top: 0.2rem;
    width: 3.75rem;
    height: 0.64rem;
    line-height: 0.44rem;
    background: #fff;
    font-size: 0.16rem;
    color: #333333;
    text-align: center;
  }
  .box {
    height: 5.2rem;
    overflow-y: scroll;
    margin: 0.16rem;
    background-color: #fff;
  }
  // .prompt {
  //   // z-index只能在position属性值为relative或absolute或fixed的元素上有效。
  //   // display: float;
  //   position: absolute;
  //   left: 50%;
  //   top: 20%;
  //   z-index: -1;
  // }
  .content {
    // margin-bottom: 0.16rem;
    // height: 4rem;
    overflow-y: scroll;
    .shopname {
      padding: 0.2rem 0 0 0.16rem;
      background-color: #fff;
    }
    ul {
      padding: 0 0.16rem;
      // z-index: 100;
      background-color: #fff;
      li {
        padding-top: 0.16rem;
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
</style>
