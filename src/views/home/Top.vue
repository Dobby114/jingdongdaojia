<template>
  <div class="header">
    <div class="header__top">
      <span class="iconfont header__position">&#xe619;</span>
      <span class="header__item">上海大学延长校区行健楼10层技园2号楼10层</span>
      <span class="iconfont header__notice">&#xe613;</span>
    </div>
    <div class="header__search"><a href="#" class="iconfont">&#xe6ac;</a> <input type="text" style="width: 140px" placeholder="山姆会员商店优惠商品" /></div>
  </div>
  <!-- 轮播图---后期用js做成轮播图的样子 -->
  <div class="banner">
    <img src="https://www.dell-lee.com/imgs/vue3/banner.jpg" alt="后面做成轮播图" class="banner__img1" />
  </div>
  <!-- 导航  导航里每个类别都应该是a标签，链接可跳转的那种-->
  <div class="nav">
    <ul>
      <li v-for="(item, index) in navInfos" :key="index">
        <a href="#"
          ><div class="containor"><img :src="item.imgUrl" alt="" /></div>
          <div class="desc">{{ item.title }}</div></a
        >
      </li>
    </ul>
  </div>
  <!-- 额。。。虽然感觉不应该这样布局，，但是先这样做吧 这里是中间的灰色gap-->
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'Top',
  setup() {
    const navInfos = [
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/超市.png', title: '超市便利' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/菜市场.png', title: '菜市场' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/水果店.png', title: '水果店' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/鲜花.png', title: '鲜花绿植' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/医药健康.png', title: '医药健康' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/家居.png', title: '家居时尚' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/蛋糕.png', title: '烘焙蛋糕' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/签到.png', title: '签到' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/大牌免运.png', title: '大牌免运' },
      { imgUrl: 'https://www.dell-lee.com/imgs/vue3/红包.png', title: '红包' }
    ]
    return { navInfos }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virable.scss';
@import '../../style/mixins.scss';
.header {
  &__top {
    position: relative;
    margin-top: 0.16rem;
    height: 0.22rem;
    // 引入另外一个文件中的文件变量---非常方便该各种颜色
    color: $content-font-color;
    // background-color: pink;
    .header__position {
      float: left;
      font-size: 0.2rem;
    }
    .header__notice {
      float: right;
      font-size: 0.2rem;
    }
    .header__item {
      display: inline-block;
      position: absolute;
      bottom: 0;
      margin-left: 0.085rem;
      font-size: 0.17rem;
      color: $content-font-color;
      // height: 100%;
      line-height: 0.22rem;
      //解决行内、行内块标签的对齐的问题
      // vertical-align: bottom;
      // 文字过长溢出显示省略号
      width: 2.5rem;
      // 引入封装的省略号
      @include ellipsis;
    }
  }
  &__search {
    margin-top: 0.16rem;
    width: 100%;
    height: 0.32rem;
    background-color: $search-bgColor;
    border-radius: 0.16rem;
    .iconfont {
      margin-left: 0.16rem;
      display: inline-block;
      color: $search-fontColor;
      font-size: 0.16rem;
      // line-height控制垂直居中--设置为父元素的高度，就设置了垂直居中
      line-height: 0.32rem;
    }
    input {
      margin-left: 0.1rem;
      // text-align: center;
      // line-height: 0.32rem;
      font-size: 0.14rem;
      background-color: $search-bgColor;
      color: #1fa4fc;
    }
    // 只改变placehoder的样式，而不是改变输入框的文字样式
    input::placeholder {
      // height: 100%;
      font-size: 0.14rem;
      color: $search-fontColor;
    }
  }
}
.banner {
  margin: 0.12rem 0 0.16rem 0;
  // 图片加载防抖
  height: 0; //高度依然是0，但是padding生效了、但是为什么给他赋值，不生效？/去掉padding之后就生效了呢？
  overflow: hidden;
  padding-bottom: 25.4%; //25.4%;设置为这个值的话，乘以父元素的宽度，刚好就是图片的高度，于是它padding刚好就是父元素的宽度
  &__img1 {
    width: 100%; //就算不设置子元素的宽度，它也会占位啊
  }
}
.nav {
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 20%;
    text-align: center;
    .containor {
      height: 0;
      overflow: hidden;
      padding-bottom: 66.7%;
      img {
        // width: 100%;
        width: 0.4rem;
      }
    }
    .desc {
      font-size: 0.12rem;
      color: $content-font-color;
      padding: 0.06rem 0 0.16rem 0;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: #f1f1f1;
}
</style>
