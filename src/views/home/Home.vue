<template>
  <!-- 顶部 -->
  <!-- wrapper版心，确定一下版心，也就是整个网页的中心布局----基本上页面上每个模块都会遵循的-->
  <div class="container">
    <div class="wrapper">
      <Top />
      <!-- 附近店铺 -->
      <Nearby />
    </div>
    <!-- 底部导航 -->
    <Foot />
  </div>
</template>

<script>
import Top from './Top.vue'
import Nearby from './nearby.vue'
import Foot from '../../components/Foot.vue'
export default {
  name: 'Home',
  components: { Top, Nearby, Foot }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // position: relative;
}
</style>
