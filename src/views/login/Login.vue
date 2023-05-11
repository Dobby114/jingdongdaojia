<template>
  <div class="container wrapper">
    <div class="palceholder"><img src="https://www.dell-lee.com/imgs/vue3/user.png" alt="" /></div>
    <div class="container__input container__input--account"><input type="text" placeholder="请输入用户名" v-model="username" /></div>
    <div class="container__input container__input--password"><input type="password" placeholder="请输入密码" v-model="password" /></div>
    <button class="login" @click="handleLoginClick">登录</button>
    <!-- 这是一个a标签，不应该这样 -->
    <!-- <a href="#" class="register" @click="handleRegister">立即注册</a> -->
    <div class="other--func"><router-link to="./register" class="register">立即注册</router-link>|<a href="#" class="forget">忘记密码</a></div>
    <Toast v-if="show" :toastMessa="toastMessa" />
  </div>
</template>
r
<script>
// ???这个import方式也是{}是用export方式导出的，而不加{}的是用export default方式导出的
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post2 } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 封装toast，拆分代码--让setup里只关注主流程的东西，并且因为它会在多个页面中使用，所以把它放到toast组件文件汇总，这里直接引入使用就好了
const useLoginEffect = showToast => {
  // 获得路由实例，对路由跳转做一些改变
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const handleLoginClick = async () => {
    // try———catch保证就算是地址错了，还能往下，最后得到catch的错误
    // 点击登录发起post请求,传入后端需要的参数---接口返回数据，根据数据判断是否请求成功
    try {
      // 如果用户没有输入账号或者密码的话，做一个校验提示---如果没填的话，就不会进行下面的发出请求操作
      // console.log(data.username, data.password)
      if (!data.username) {
        showToast('请输入用户名')
        return
      }
      if (!data.password) {
        showToast('请输入密码')
        return
      }
      // 根据后端接口返回的数据来判断
      const result = await post2('/api/user/login', { username: data.username, password: data.password })
      console.log(result)
      if (result?.errno === 0 && result?.data.verifySuccess) {
        localStorage.isLoginToken = result?.data.token
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
      // alert('登录失败')
      // 通过push方法来实现跳转
      // localStorage.isLogin === 'true' ? router.push({ name: 'Home' }) : alert('请先登录')
    } catch (err) {
      showToast('请求失败')
      // alert('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLoginClick }
}

export default {
  name: 'Login',
  components: { Toast },
  // setup只展示代码执行的逻辑
  setup() {
    const { show, toastMessa, showToast } = useToastEffect()
    const { handleLoginClick, username, password } = useLoginEffect(showToast)

    return {
      username,
      password,
      show,
      toastMessa,
      handleLoginClick,
      showToast
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/virable.scss';
.wrapper {
  margin: 0 auto;
  width: 2.95rem;
}
.container {
  // 给父元素设置，让它里面的img、文字、a、span、input标签水平居中
  text-align: center;
  margin-top: 1.2rem;
  .palceholder {
    // 其实做懒加载的方式应该会好很多？
    // 或者别的防抖的方式？
    // 总之我感觉这样不是特别好
    height: 0;
    overflow: hidden;
    padding-bottom: 22.5%;
    img {
      //   width: 0.66rem;
      width: 22.38%;
    }
  }
  &__input {
    // position: relative;
    text-align: left;
    margin-top: 0.38rem;
    // width: 100%;
    height: 0.48rem;
    background-color: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    font-size: 0.16rem;
  }
  &__input--account {
    input {
      padding: 0.12rem 0 0.12rem 0.16rem;
      background-color: #f9f9f9;
    }
  }
  &__input--password {
    margin-top: 0.16rem;
    input {
      padding: 0.12rem 0 0.12rem 0.16rem;
      background-color: #f9f9f9;
    }
  }
  .login {
    margin-top: 0.32rem;
    width: 100%;
    height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border: none;
    font-size: 0.16rem;
    color: $base-color;
  }
  .other--func {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 0.16rem;
    a {
      font-size: 0.14rem;
      color: rgba(0, 0, 0, 0.5);
      padding: 0 0.12rem;
      vertical-align: middle;
    }
  }
}
</style>
