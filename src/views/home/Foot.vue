<template>
  <div class="footer">
    <!-- span标签是行内元素，一行显示多个，不可以设置宽高，宽高由内容默认撑开 -->
    <!-- margin的位置书写顺序：上右下左（顺时针） -->
    <!-- 浏览器默认能显示的最小字号为12px，所以如果需要字号为10px的文字，不能直接设置字体大小为10，可以通过缩放（transform:scale()）的方法来实现具体大小！！ -->
    <!-- 实现active 控制某个元素有某个属性-->
    <div v-for="(item, index) in items" :key="index" :class="{ footer__item: true, 'footer__item--active': index === 0 }">
      <!-- v-html用html的方式去显示某个变量，不让某个浏览器对一些特殊的字符转义 -->
      <div v-html="item.iconfont" class="iconfont"></div>
      <div class="footer__title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Foot',
  setup() {
    const items = [
      { iconfont: '&#xe6b8;', title: '首页' },
      { iconfont: '&#xe789;', title: '购物车' },
      { iconfont: '&#xe64b;', title: '订单' },
      { iconfont: '&#xe7bd;', title: '我的' }
    ]
    return { items }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virable.scss';
@import '../../style/mixins.scss';
.footer {
  display: flex;
  position: absolute;
  bottom: 0;
  height: 0.49rem;
  width: 100%;
  // background-color: pink;
  border-top: solid 0.01rem #f1f1f1;
  box-sizing: border-box;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.2rem;
      margin: 0.07rem 0 0.02rem 0;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 20px;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
