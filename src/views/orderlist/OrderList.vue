<template>
  <div class="container">
    <div class="header">我的订单</div>
    <div class="order">
      <ul>
        <li v-for="(item, index) in orderList" :key="index">
          <div class="content">
            <div class="order__info">
              <div class="shopname">{{ item.shopName }}</div>
              <div class="state">{{ item.isCanceled ? '已取消' : '已支付' }}</div>
            </div>
            <div class="order__product">
              <div class="imgs">
                <template v-for="(product, i) in item.products" :key="i">
                  <img :src="product.product.img" alt="#" v-if="i < 4" />
                </template>
              </div>
              <div class="sale">
                <div class="totalprice">&yen;{{ item.totalPrice.toFixed(2) }}</div>
                <div class="totalnum">共{{ item.totalNum }}件</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <Foot />
</template>
<script>
import Foot from '../../components/Foot.vue'
import { useStore } from 'vuex'
export default {
  name: 'OrderList',
  components: { Foot },
  setup() {
    const store = useStore()
    const { orderList } = store.state
    // 处理数据
    orderList.forEach(order => {
      order.totalPrice = order.products.reduce((total, currentValue, currentIndex) => (total += currentValue.orderSales * currentValue.product.price), 0)
      order.totalNum = order.products.reduce((total, currentValue, currentIndex) => (total += currentValue.orderSales), 0)
    })

    // console.log(orderList)
    return { orderList }
  }
}
</script>
<style lang="scss" scoped>
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
  .order {
    padding: 0 0.18rem 0.2rem 0.18rem;
    .content {
      padding: 0.16rem;
    }
    li {
      margin-top: 0.16rem;
      background: #fff;
      width: 3.38rem;
      height: 1.1rem;
    }
    &__info,
    &__product {
      display: flex;
      justify-content: space-between;
    }
    &__info {
      margin-bottom: 0.16rem;
      .shopname {
        font-size: 0.16rem;
      }
      .state {
        font-size: 0.14rem;
        color: #999999;
      }
    }
    &__product {
      .imgs {
        display: flex;
        img {
          width: 0.4rem;
          margin-right: 0.12rem;
        }
      }
      .sale {
        text-align: right;
        .totalprice {
          font-size: 0.14rem;
          color: #e93b3b;
          padding-bottom: 0.09rem;
        }
        .totalnum {
          font-size: 0.12rem;
          color: #333;
        }
      }
    }
  }
}
</style>
