import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
  },
  {
    // 要求跳转时网址后面要带一个数组id！！--实现点击不同的商品，进入不同的商品详情页面
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue')
  },
  {
    // 带参数id，和相应的页面地址匹配
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList.vue')
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderlist" */ '../views/orderlist/OrderList.vue')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import(/* webpackChunkName: "personal" */ '../views/personal/Personal.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    meta: { requireAuth: false },
    // 正常情况下，已经登录之后，login页面应该是不能被跳转显示了
    // beforeEnter 访问login页面之前会执行的函数
    // 路由独享的守卫,只在这个路由下起作用和beforeEach的作用一样
    beforeEnter(to, from, next) {
      // 表示是否登录的变量
      const isLoginToken = localStorage.isLoginToken
      // console.log(isLogin)
      // 如果已经登录了，那就跳转到Home页面，如果没有登录，那就正常展示login页面
      isLoginToken ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/register/Register.vue'),
    meta: { requireAuth: false },
    beforeEnter(to, from, next) {
      // 如果登录就不能再跳转到注册页面
      const isLoginToken = localStorage.isLoginToken
      isLoginToken ? next({ name: 'Home' }) : next()
    }
  }
  // 这种写法是当跳转到该页面时才加载页面，可以提高应用的运行速率
  // 异步路由，让代码执行更快
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// router.beforeEach每次做路由跳转之前都会执行这个方法
// to要跳过去的页面信息，from从哪里调过来的页面信息
// next（）表示继续执行
// 全局守卫
// 其实islogin就是token？--差每次向后端请求都要把token传进去，然后验证token是否正确，正确了才返回
router.beforeEach((to, from, next) => {
  const { isLoginToken } = localStorage
  // console.log(isLogin)
  // 但这样写，如果你没登录的话，就会一直跳转到login而不会把login页面显示出来
  // 所以加一个条件，就是如果你访问的是login页面的话，也可以给你展示
  const { name } = to
  const isLoginOrRegister = name === 'Login' || name === 'Register'
  // 如果你已经登录或者跳转的是登录或者注册页面，就让你访问相关页面，否则就去登录
  isLoginToken || isLoginOrRegister ? next() : next({ name: 'Login' })

  // 表示如果登录了就让你访问相关的信息
  // next()
  // 如果没登录，就让你跳转到登录页面
  // next({ name: 'Login' })

  // console.log(to, from)
  // next()
})

export default router
