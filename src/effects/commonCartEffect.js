import { toRefs } from 'vue'
import { useStore } from 'vuex'
// 购物车相关的逻辑
export const useCommonCartEffect = () => {
  // 在这里用store数据  相当于this.$store了 原来的获取方式是this.$store.state.数据名
  // console.log(shopId)
  const store = useStore()
  // 定义改变数据的事件！！！在这里获取store里的数据，并且更新数据
  // 根据定义的数据结构，将需要的数据作为参数传进去
  const changeCount = (shopId, productId, productInfo, num) => {
    // console.log(shopId, productId, productInfo)
    store.commit('changeCount', { shopId, productId, productInfo, num })
  }
  const { cartList } = toRefs(store.state)

  return { cartList, changeCount }
}
