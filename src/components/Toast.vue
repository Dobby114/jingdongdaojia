<template>
  <div class="toast">{{ toastMessa }}</div>
</template>

<script>
// 不需要路由跳转的子组件不需要写名字，直接import的就是整个vue文件中的东西
import { reactive, toRefs } from 'vue'
const useToastEffect = () => {
  const toastData = reactive({ show: false, toastMessa: '' })
  const showToast = meesa => {
    toastData.show = true
    toastData.toastMessa = meesa
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessa = ''
    }, 2000)
  }
  // 对象解构是要用名字来结构的，所以名字要对应
  const { show, toastMessa } = toRefs(toastData)
  return { show, toastMessa, showToast }
}
export default {
  name: 'Toast',
  props: ['toastMessa']
}
export { useToastEffect }
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.2rem;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: azure;
}
</style>
