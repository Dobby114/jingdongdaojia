// 初始化地图，获得Amap
// 再通过Amap获得定位地址之类的。。定位也只要定一次就好了！
import AMapLoader from '@amap/amap-jsapi-loader'
import { shallowRef } from '@vue/reactivity'
import Axios from 'axios'
import { ref } from 'vue'
// import { reactive } from 'vue'

// import VueAMap from '@amap/amap-jsapi-loader'
const initMap = map => {
  return new Promise((resolve, reject) => {
    AMapLoader.load({
      key: 'ef209f13220abc1e8e1e100d07e5e251', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Geolocation', 'AMap.Geocoder'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then(
      AMap => {
        resolve(AMap)
      },
      err => {
        reject(err)
      }
    )
  })
}

function onComplete(AMap, data) {
  // 在这里用逆向地理编码得到具体的位置
  // 用web服务api来实现定位！
  // data是具体的定位信息
  const result = ref()
  const KEY = 'd8a56b331449cdb2d8eb0021339c853e'
  // const location = `${data.position.lng},${data.position.lat}`
  const location = '126.7,37.45' // 写的自定义的位置，定位结果有问题
  Axios.get(`https://restapi.amap.com/v3/geocode/regeo?key=${KEY}&location=${location}&radius=1000&extensions=all&batch=false`).then(res => {
    console.log('res: ', res.data)
    result.value = res.data
  })
  console.log(result)
  return data
}

function onError(data) {
  // 定位出错
  console.log(data)
  return data
}

const getPosition = AMap => {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认：true
        timeout: 10000, // 设置定位超时时间，默认：无穷大
        offset: [10, 20], // 定位按钮的停靠位置的偏移量
        zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        position: 'RB', //  定位按钮的排放位置,  RB表示右下
        extensions: 'base',
        convert: false
      })

      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          console.log('result', result)
          const pos = onComplete(AMap, result)
          resolve(pos)
        } else {
          onError(result)
          reject(result)
        }
      })
    })
  })
}

export const MapLoader = async () => {
  const positionInfo = async () => {
    const map = shallowRef(null)
    const AMap = await initMap(map)
    const pos = await getPosition(AMap)
    // console.log(pos)
    // positionInfo.data ? console.log(positionInfo) : console.log(positionInfo)
    return pos
  }
  const positon = await positionInfo()
  // console.log(positon)
  return positon
}
