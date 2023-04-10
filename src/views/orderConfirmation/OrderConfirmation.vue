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
        <ul>
          <h3>{{ shopId }}</h3>
          <li v-for="item in products" :key="item._id" v-show="item.count > 0">
            <img :src="item.imgUrl" alt="" />
            <div class="info">
              <h3>{{ item.name }}</h3>
              <div class="price">
                <div class="price__now">{{ item.price }} x {{ item.count }}</div>
              </div>
            </div>
            <!-- 一开始没有的话，赋0！！ -->
            <div class="number">{{ item.count * item.price }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="allprice">实付金额 ¥{{ totalPrice }}</div>
      <button class="submit">提交订单</button>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/commonCartEffect'
import { useCartEffect } from '../shop/ShopCart.vue'
import { useRoute } from 'vue-router'
export default {
  name: 'OrderConfirmation',
  setup() {
    // 1.拿到相对应的商户的购物车里的信息
    const store = useRoute()
    const shopId = store.params.id

    const { cartList } = useCommonCartEffect()
    const products = cartList.value[shopId]
    // 为啥我这里用计算属性就要变成这样？
    const { calculate } = useCartEffect(shopId, products)
    const totalPrice = calculate.value.totalPrice
    return { shopId, products, totalPrice }
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
}
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
  background-color: #fff;
  ul {
    padding: 0.16rem;
    // z-index: 100;
  }
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
    .number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
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
  position: absolute;
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
</style>
