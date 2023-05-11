<template>
  <div class="nearby">
    <h3>附近店铺</h3>
    <ul>
      <ShopInfo v-for="item in shopInfors" :key="item._id" :item="item" />
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue'
import { get2 } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyListEffect = () => {
  const shopInfors = ref([])
  // const getShopInfos = async () => {
  //   const result = await get('/api/shop/hot-list')
  //   if (result?.errno === 0 && result?.data?.length) {
  //     shopInfors.value = result.data
  //   }
  // }
  const getShopInfos = async () => {
    const result = await get2('/api/shop/nearby-list')
    if (result?.errno === 0 && result?.data?.length) {
      shopInfors.value = result.data
    }
  }
  getShopInfos()
  return { shopInfors }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup() {
    // 通过get请求从后端获得数据--响应式的---为啥要是响应式---因为要用async await！！异步操作
    const { shopInfors } = useNearbyListEffect()
    return { shopInfors }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/virable.scss';
@import '../../style/mixins.scss';
.nearby {
  padding-top: 0.16rem;
  h3 {
    font-weight: 400;
    font-size: 0.18rem;
    padding-bottom: 0.06rem;
  }
}
</style>
