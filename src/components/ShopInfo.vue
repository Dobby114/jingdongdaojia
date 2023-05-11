<template>
  <li class="shop">
    <!-- id控制跳转到不同的商品详情页面 -->
    <!-- 用item.name来当路由地址，可能会出现item.name不存在的问题！ -->
    <!-- 校验一下：如果有item.name就用item.name否则就用item._id -->
    <router-link :to="`/shop/${item.name ? item.name : item._id}`"
      ><div class="container"><img :src="item.imgUrl" alt="" /></div>
      <!-- 参数控制是否有下划线这个class---参数动态控制标签的样式 -->
      <!-- <div class="shop__info shop__info--border"> -->
      <!-- 用这种方式来控制多个样式 -->
      <div :class="{ shop__info: true, 'shop__info--border': hiddeBorder ? false : true }">
        <h4 class="title">{{ item.name ? item.name : item._id }}</h4>
        <div class="tag">
          <span>月售:{{ item.sales }}</span
          ><span>起送:{{ item.expressLimit }}</span
          ><span>基础运费:{{ item.expressPrice }}</span>
          <span v-for="(innerItem, innerIndex) in item.tag" :key="innerIndex">{{ innerItem }}</span>
        </div>
        <div class="highlight">{{ item.slogan }}</div>
      </div></router-link
    >
  </li>
</template>

<script>
// hiddeBorder是传入的用来控制是否有这个样式的参数.....
export default {
  name: 'ShopInfo',
  props: ['item', 'hiddeBorder']
}
</script>

<style lang="scss" scoped>
@import '../style/virable.scss';
@import '../style/mixins.scss';
.shop {
  margin-top: 0.12rem;
  a {
    display: flex;
    flex: 1;
  }
  .container {
    width: 0.56rem;
    height: 0.56rem;
    img {
      width: 0.56rem;
    }
  }

  &__info {
    margin-left: 0.16rem;
    width: 100%;
    &--border {
      border-bottom: 0.01rem solid #f1f1f1;
    }
    .title {
      font-weight: 400;
      font-size: 0.16rem;
    }
    .tag {
      font-size: 0.13rem;
      margin-top: 0.08rem;
      span {
        padding-right: 0.16rem;
      }
    }
    .highlight {
      font-size: 0.13rem;
      color: #e93b3b;
      padding: 0.08rem 0 0.12rem 0;
    }
  }
}
</style>
