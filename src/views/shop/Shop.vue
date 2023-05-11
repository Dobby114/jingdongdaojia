<template>
  <div>
    <div class="wrapper">
      <div class="top">
        <router-link to="../" class="back iconfont">&#xe6db;</router-link>
        <div class="search">
          <a href="#" class="iconfont search__icon">&#xe6ac;</a>
          <input type="text" placeholder="请输入商品名称搜索" />
        </div>
      </div>
      <!-- 加入的v-show，只有当item.imgURL被加载出来了，该组件才会出现，改善视觉效果 -->
      <ShopInfo :item="item" :hiddeBorder="true" v-show="item.imgUrl" />
      <Content />
    </div>
  </div>
  <ShopCart />
</template>
<script>
import { reactive, toRefs } from 'vue'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import ShopCart from './ShopCart.vue'
import { get2 } from '../../utils/request'
import { useRoute } from 'vue-router'
// useRouter表示的整个项目的路由，useRoute表示当前访问的路由的信息--可以拿到id
const getShopInfo = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  console.log(route.params.id)
  const getItemData = async () => {
    const result = await get2(`/api/shop/${route.params.id}`)
    // console.log(result)
    if (result?.errno === 0 && result?.data) {
      // 原接口是直接拿的data
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  getItemData()
  return { item }
}
export default {
  name: 'Shop',
  components: { ShopInfo, Content, ShopCart },
  setup() {
    const { item } = getShopInfo()
    return { item }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/virable.scss';
// .content {
//   position: relative;
//   padding: 0 0.18rem 0.2rem 0.18rem;
// }
.top {
  display: flex;
  margin: 0.16rem 0 0.16rem 0;
  width: 100%;
  height: 0.32rem;
  .back {
    color: #b6b6b6;
    font-size: 0.3rem;
    line-height: 0.32rem;
  }
  .search {
    display: flex;
    flex: 1;
    width: 100%;
    background-color: $search-bgColor;
    border-radius: 0.18rem;
    &__icon {
      padding: 0 0.12rem 0 0.16rem;
      font-size: 0.16rem;
      line-height: 0.32rem;
    }
    input {
      // 清除input框的原有样式
      border: none;
      outline: none;
      background: none;
      width: 100%;
      font-size: 0.16rem;
      &::placeholder {
        font-size: 0.14rem;
        color: #333333;
      }
    }
  }
}
</style>
