import { createStore } from 'vuex'

// 将购物车信息放到localstorage里面，实现购物车信息持久化存储
const setCartStorage = state => {
  const { cartList } = state
  const cartListInfo = JSON.stringify(cartList)
  // localstorage里存的必须是Json格式的
  localStorage.cartList = cartListInfo
}
const getCartStorage = () => {
  // 这里初始化
  return localStorage.cartList ? JSON.parse(localStorage.cartList) : {}
}
// 存储可能会在很多地方用到的全局数据
// 先定义想要的数据结构---但一开始这个数据应该是空的，我们在程序运行过程中获得之后存储到这里
export default createStore({
  state: {
    cartList: getCartStorage()
    // {
    //   // 第一层数据结构==页面的id
    //   // 第二层数据结构==这个页面里面所有的商品的信息
    //   // shopInfo: {
    //   // 再加一个商店名字---为什么不直接，把商店名字代替原来得shopInfo？
    //   //   productId: { _id: '1', name: '番茄 250g / 份', imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png', sales: 10, price: 33.6, oldPrice: 39.6 }
    //   // }
    // }
  },
  getters: {},
  mutations: {
    // 感应组件发起的addCount事件，并执行
    // 它只有两个参数，因为之前传进来的参数是以对象的形式传进来的
    changeCount(state, payload) {
      // 这里存的数据是用户增删商品的数据
      // 获取state中cartList中的数据，换成新的数据，并且再更新数据
      const { shopId, productId, productInfo, num } = payload
      // 先获取数据中的数据，如果刚开始，这个数据不存在，那就先给他一个初始值===不可以直接赋值？？
      // 在这里已经给state.cartList加了一个key为shopId的对象

      // 为什么不能直接用这种方法给空对象中添加一个对象？
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) {
        // shopInfo = {}
        state.cartList[shopId] = {}
        shopInfo = state.cartList[shopId]
      }
      // console.log(state.cartList[shopId])
      // 但是这里可以直接这么做？
      let product = shopInfo[productId]
      if (!product) {
        // 更新product
        // shopInfo[productId] = {}
        product = productInfo
        product.count = 0
      }
      product.check = true
      product.count += num
      // 这里我觉得count=0的话，就可以不用存了，就可以直接删了，为什么不直接把这个数据删了
      if (product.count > 0) {
        shopInfo[productId] = product
        // product.count = 0
        // 改进--直接把存储的数据中，count<0的数据删除了
      } else if (shopInfo[productId]) {
        delete shopInfo[productId]
      }
      // 再把product存进去
      // 每次改变数据的时候就调用一次，存一次
      setCartStorage(state)
    },
    changeProductCheck(state, payload) {
      // 把相应商品的check属性改为false
      const { shopId, productId } = payload
      const cartList = state.cartList
      cartList[shopId][productId].check = !cartList[shopId][productId].check
      // 当勾选状态变化时，金额也要变化才行
      setCartStorage(state)
    },
    changeSelectAllState(state, payload) {
      // 一开始应该是全选状态，用户改变商品选中状态，全选状态跟着改变，用户点击全选，那下面的商品都要全选，总金额也要发生变化（调整了商品的选中状态，自然就会变化）
      const { shopId } = payload
      const products = state.cartList[shopId]
      // 循环商品，如果商品里面有chekc为false的，那就把selectAll也变成false
      // 点击循环，把商品里为false的商品，check状态变为true-
      for (const key in products) {
        const product = products[key]
        if (products[key]) {
          product.check = true
        }
      }
      setCartStorage(state)
    },
    clearAll(state, payload) {
      const { shopId } = payload
      const products = state.cartList
      // 直接把这个页面里存储的数据清零就好了
      products[shopId] = {}
      setCartStorage(state)
    }
  },
  actions: {},
  modules: {}
})
