<template>
  <div class="content">
    <div class="content__nav">
      <ul>
        <li
          v-for="item in categotyInfo"
          :key="item.name"
          @click="
            () => {
              handleCategotyClick(item.tab)
            }
          "
          :class="{ 'content__nav--active': item.tab === curTab }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="content__goods">
      <ul>
        <li v-for="item in content" :key="item._id">
          <img :src="item.imgUrl" alt="" />
          <div class="info">
            <h3>{{ item.name }}</h3>
            <p>月售{{ item.sales }}件</p>
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
            {{ cartList?.[shopId]?.[item._id]?.count || 0 }}
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
  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect } from 'vue'
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/commonCartEffect'
const categotyInfo = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]
// tab变化相关的逻辑---初始tab--点击改变tab
const uesTabEffect = () => {
  const curTab = ref(categotyInfo[0].tab)
  // 点击某个类别，获得该类别的tab---直接在事件绑定那儿写一个箭头函数，调用这个函数，并且传入参数！！
  const handleCategotyClick = tab => {
    // 获得当前点击的类别后，发起请求
    // getCategotyInfos(tab)
    console.log(tab)
    curTab.value = tab
  }
  return { curTab, handleCategotyClick }
}
// contentlist变化相关的逻辑
const contentListEffect = (curTab, shopId) => {
  // console.log(shopId)
  const contentList = reactive({ content: [] })
  const getCategotyInfos = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: curTab.value })
    if (result?.errno === 0 && result?.data) {
      contentList.content = result.data
    }
  }
  // 当curTba变化时，就会自动执行这个函数---通过watcheffect监听数据变化，自动调用函数！！
  watchEffect(() => {
    getCategotyInfos()
  })
  const { content } = toRefs(contentList)
  const { cartList, changeCount } = useCommonCartEffect()
  return { cartList, changeCount, content }
}
// 购物车相关的逻辑

export default {
  name: 'Content',
  setup() {
    // 商品类别导航条数据----每个导航都有一个对应的tab，点击这个导航条获得相应的tab，传入get，获得相应类别的数据
    // 传入后端需要的参数，获得后端传来的信息--url和tab
    // 把后端传来的数据，存进响应式数据里，用这个数据去循环html渲染每个商品 // 初始定义，每次打开，显示的都是all
    // const route = useRoute()
    // const shopId = route.params._id
    // const productInfo = reactive({ contentList: [], curTab: categotyInfo[0].tab })
    // // 依赖参数当前tab来发起
    // const getCategotyInfos = async () => {
    //   const result = await get(`/api/shop/${shopId}/products`, { tab: productInfo.curTab })
    //   if (result?.errno === 0 && result?.data) {
    //     productInfo.contentList = result.data
    //   }
    // }
    // getCategotyInfos()
    // const { contentList } = toRefs(productInfo)
    // // 点击某个类别，获得该类别的tab---直接在事件绑定那儿写一个箭头函数，调用这个函数，并且传入参数！！
    // const handleCategotyClick = tab => {
    //   // 获得当前点击的类别后，发起请求
    //   getCategotyInfos(tab)
    //   //   console.log(tab)
    //   productInfo.curTab = tab
    const route = useRoute()
    const shopId = route.params.id
    const { curTab, handleCategotyClick } = uesTabEffect()
    const { content, cartList, changeCount } = contentListEffect(curTab, shopId)
    // 页面上要用到的是cartList里面对应商户，对应商品的count值---需要传进来的东西

    return {
      shopId,
      categotyInfo,
      content,
      handleCategotyClick,
      curTab,
      cartList,
      changeCount
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/virable.scss';
@import '../../style/mixins.scss';
.content {
  padding-top: 0.1rem;
  //   background-color: lightblue;
  display: flex;
  //   直接用绝对定位可以很好地解决位置和浮动问题，给上面的组件直接留出空间！！
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0rem;
  overflow-y: scroll;
  &__nav {
    height: 100%;
    width: 0.76rem;
    background-color: $search-bgColor;
    &--active {
      background: $base-color;
    }
    li {
      width: 100%;
      height: 0.4rem;
      font-size: 0.14rem;
      color: #333333;
      line-height: 0.4rem;
      text-align: center;
    }
  }
  &__goods {
    // 在子元素上写flex=1，就表示占父元素剩下的空间的几份
    flex: 1;
    overflow-y: scroll;
    li {
      position: relative;
      display: flex;
      margin: 0 0.18rem 0.12rem 0.16rem;
      border-bottom: solid 0.01rem #f1f1f1;
      img {
        width: 0.68rem;
        margin: 0 0.16rem 0 0;
        margin-bottom: 0.12rem;
      }
      .info {
        margin-bottom: 0.12rem;
        h3 {
          display: inline-block;
          width: 1.2rem;
          //   单行文字超出用省略号
          //   scss语法：引入某一个样式
          @include ellipsis;
        }
        p {
          font-size: 0.12rem;
          color: #333;
          padding: 0.08rem 0;
        }
        .price {
          display: flex;
          height: 0.2rem;
          &__now {
            font-size: 0.14rem;
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
}
</style>
