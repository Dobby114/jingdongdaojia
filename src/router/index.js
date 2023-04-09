import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue')
  },
  {
    // 要求跳转时网址后面要带一个数组id！！--实现点击不同的商品，进入不同的商品详情页面
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "about" */ '../views/shop/Shop.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/Login.vue'),
    // 正常情况下，已经登录之后，login页面应该是不能被跳转显示了
    // beforeEnter 访问login页面之前会执行的函数
    beforeEnter(to, from, next) {
      // 表示是否登录的变量
      const isLogin = localStorage.isLogin
      // console.log(isLogin)
      // 如果已经登录了，那就跳转到Home页面，如果没有登录，那就正常展示login页面
      isLogin === 'true' ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/register/Register.vue'),
    beforeEnter(to, from, next) {
      const isLogin = localStorage.isLogin
      isLogin === 'true' ? next({ name: 'Home' }) : next()
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
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  // console.log(isLogin)
  // 但这样写，如果你没登录的话，就会一直跳转到login而不会把login页面显示出来
  // 所以加一个条件，就是如果你访问的是login页面的话，也可以给你展示
  const { name } = to
  const isLoginOrRegister = name === 'Login' || name === 'Register'
  isLogin === 'true' || isLoginOrRegister ? next() : next({ name: 'Login' })

  // 表示如果登录了就让你访问相关的信息
  // next()
  // 如果没登录，就让你跳转到登录页面
  // next({ name: 'Login' })

  // console.log(to, from)
  // next()
})

export default router
