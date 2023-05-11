<template>
  <div class="container">
    <div class="head">
      <router-link to="../" class="back iconfont">&#xe6db;</router-link>
      <div class="head__search"><a href="#" class="iconfont">&#xe6ac;</a> <input type="text" style="width: 1.4rem" placeholder="螺蛳粉" /></div>
      <div class="head__cancle">取消</div>
    </div>
    <div class="history">
      <div class="history__top">
        <div class="title">搜索历史</div>
        <div class="clean">清除搜索历史</div>
      </div>
      <ul class="history__info">
        <li>尖椒肉丝</li>
        <li>鲜花</li>
        <li>山姆会员商店</li>
        <li>新鲜水果</li>
        <li>生日鲜花</li>
      </ul>
    </div>
    <div class="hot">
      <div class="hot__title">热门搜索</div>
      <ul class="hot__info">
        <li>尖椒肉丝</li>
        <li>鲜花</li>
        <li>山姆会员商店</li>
        <li>新鲜水果</li>
        <li>生日鲜花</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  setup() {
    // 1、输入搜索跳到另外一个页面
    // 2、将每次搜索的新的内容记录到localstorage中，并显示其中一部分页面上
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/virable.scss';
@import '../../style/mixins.scss';
.container {
  margin: 0.16rem 0.18rem;
  .head {
    position: relative;
    display: flex;
    justify-content: space-between;
    .back {
      position: absolute;
      color: #b6b6b6;
      font-size: 0.3rem;
      line-height: 0.32rem;
    }
    &__search {
      margin-left: 0.24rem;
      height: 0.32rem;
      width: 2.7rem;
      background-color: $search-bgColor;
      border-radius: 0.16rem;
      .iconfont {
        margin-left: 0.16rem;
        // display: inline-block;
        color: $search-fontColor;
        font-size: 0.16rem;
        // line-height控制垂直居中--设置为父元素的高度，就设置了垂直居中
        line-height: 0.32rem;
      }
      input {
        margin-left: 0.1rem;
        line-height: 0.32rem;
        font-size: 0.14rem;
        background-color: $search-bgColor;
        color: #333333;
      }
      // 只改变placehoder的样式，而不是改变输入框的文字样式
      input::placeholder {
        // height: 100%;
        font-size: 0.14rem;
        color: #000;
      }
    }
    &__cancle {
      font-size: 0.16rem;
      color: #333333;
      line-height: 0.32rem;
    }
  }
  .history {
    margin: 0.24rem 0;
    &__top {
      display: flex;
      justify-content: space-between;
      height: 0.22rem;
      .title {
        font-size: 0.16rem;
        font-weight: 700;
      }
      .clean {
        line-height: 0.2rem;
        font-size: 0.14rem;
      }
    }
    &__info {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        margin: 0.12rem 0.08rem 0 0;
        padding: 0.08rem 0.1rem;
        height: 0.32rem;
        font-size: 0.14rem;
        background: #f5f5f5;
        border-radius: 0.02rem;
      }
    }
  }
  .hot {
    &__title {
      font-size: 0.16rem;
      font-weight: 700;
    }
    &__info {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        margin: 0.12rem 0.08rem 0 0;
        padding: 0.08rem 0.1rem;
        height: 0.32rem;
        font-size: 0.14rem;
        background: #f5f5f5;
        border-radius: 0.02rem;
      }
    }
  }
}
</style>
