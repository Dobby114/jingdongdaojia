<template>
  <div class="container wrapper">
    <div class="palceholder"><img src="https://www.dell-lee.com/imgs/vue3/user.png" alt="" /></div>
    <div class="container__input container__input--account"><input type="text" placeholder="请输入用户名" v-model="username" /></div>
    <div class="container__input container__input--password"><input type="password" placeholder="请输入密码" v-model="password" /></div>
    <div class="container__input container__confirm--password"><input type="password" placeholder="确认密码" v-model="ensurement" /></div>
    <button class="login" @click="handleRegisterClick">注册</button>
    <div class="other--func"><router-link to="./login" class="register">已有账号去登录</router-link></div>
    <Toast v-if="show" :toastMessa="toastMessa" />
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 注册按钮逻辑
const useRegisterEffect = showToast => {
  // 获得路由实例，对路由跳转做一些改变
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })
  const handleRegisterClick = async () => {
    // try———catch保证就算是地址错了，还能往下，最后得到catch的错误
    // 点击登录发起post请求,传入后端需要的参数---接口返回数据，根据数据判断是否请求成功
    try {
      // 根据后端接口返回的数据来判断
      if (!data.username) {
        showToast('请输入用户名')
        return
      }
      if (!data.password) {
        showToast('请输入密码')
        return
      }
      if (data.password !== data.ensurement) {
        showToast('两次输入密码不一致')
        return
      }
      // 登录和注册这里想自己写一下mock接口，设置一下账号密码
      const result = await post('/api/user/register', { username: 'username', password: 'password' })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
      // alert('登录失败')
      // 通过push方法来实现跳转
      // localStorage.isLogin === 'true' ? router.push({ name: 'Home' }) : alert('请先登录')
    } catch (err) {
      showToast('请求失败')
      // alert('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegisterClick }
}
export default {
  name: 'Register',
  components: { Toast },
  setup() {
    const { show, toastMessa, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegisterClick } = useRegisterEffect(showToast)
    return { show, toastMessa, username, password, ensurement, handleRegisterClick }
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
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    font-size: 0.16rem;
  }
  &__input--account {
    input {
      padding: 0.12rem 0 0.12rem 0.16rem;
      background-color: #f9f9f9;
    }
  }
  &__input--password,
  &__confirm--password {
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
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
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
