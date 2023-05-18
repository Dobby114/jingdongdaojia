<template>
  <div class="container">
    <div class="background">
      <div class="background__top"></div>
    </div>
    <div class="wrepper">
      <div class="personInfo">
        <div class="username"><p>下雨天头痛YiHuik女士</p></div>
        <div class="info">
          <li v-for="(item, index) in info" :key="index">
            <div class="title">{{ index }}</div>
            <div class="value">{{ item }}</div>
          </li>
        </div>
      </div>
      <div class="photo">
        <!-- input 的accept属性可以用来解决格式筛选问题 -->
        <input type="file" name="image" accept="image/*" @change="uploadUserPhoto" />
        <img :src="imgUrl ? imgUrl : 'https://www.dell-lee.com/imgs/vue3/超市.png'" alt="头像" />
      </div>
      <div class="edit iconfont">&#xe683;</div>
      <div class="manage">
        <div class="money">
          <div class="iconfont front">&#xe62e;</div>
          <p>我的钱包</p>
          <div class="iconfont arrow">&#xe643;</div>
        </div>
        <div class="addres">
          <div class="iconfont front">&#xe65d;</div>
          <p>我的地址</p>
          <div class="iconfont arrow">&#xe643;</div>
        </div>
        <div class="help">
          <div class="iconfont front">&#xe600;</div>
          <p>客服与帮助</p>
          <div class="iconfont arrow">&#xe643;</div>
        </div>
      </div>
    </div>
  </div>
  <Foot />
</template>
<script>
import Foot from '../../components/Foot.vue'
import { reactive, ref } from 'vue'
export default {
  name: 'Personal',
  components: { Foot },
  setup() {
    const info = { 红包: 218, 优惠券: '12张', 鲜豆: 88, 白条: 1000 }
    const imgUrl = ref()
    imgUrl.value = localStorage.userPhoto
    // 上传头像----存储在本地（是把整个图片资源存储在本地，而不是地址）----显示
    const uploadUserPhoto = e => {
      const messages = reactive({ errorinfo: '', imgURL: '' })
      const img = e.target.files[0]
      console.log(img.size)
      const imgSize = img.size
      if (imgSize <= 2 * 1024 * 1024) {
        messages.errorinfo = ''
        console.log('上传成功')
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0])
        // console.log(window.URL.createObjectURL(e.target.files[0])) // 获取当前文件的信息
        // base64方法是啥？
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onloadend = () => {
          localStorage.userPhoto = reader.result
          imgUrl.value = reader.result
          console.log(reader.result)
        }
      } else {
        messages.errorinfo = '上传失败，图片大小超出范围'
        console.log(messages.errorinfo)
      }
    }
    // 更换头像
    return { info, uploadUserPhoto, imgUrl }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixins.scss';
.background {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: -1;
  &__top {
    width: 100%;
    height: 2.5rem;
    // background-color: pink;
    background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
    border-radius: 0 0 0.8rem 0.8rem;
  }
}
.wrepper {
  position: relative;
  margin: 0.8rem 0.18rem 0.5rem 0.18rem;
  width: 3.4rem;
  height: 5.4rem;
  overflow: hidden;
  .personInfo {
    margin-top: 0.48rem;
    width: 100%;
    height: 1.7rem;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    .username {
      padding: 0.6rem 0 0.14rem 0;
      font-size: 0.2rem;
      color: #262628;
      border-bottom: solid 0.01rem #f1f1f1;
      p {
        text-align: center;
        margin: 0 auto;
        width: 2rem;
        @include ellipsis;
      }
    }
    .info {
      width: 100%;
      display: flex;
      justify-content: space-around;
      li {
        margin-top: 0.14rem;
        text-align: center;
        .title {
          font-size: 0.12rem;
          color: #c1c0c9;
          margin-bottom: 0.05rem;
        }
        .value {
          font-size: 0.18rem;
          color: #262628;
        }
      }
    }
  }
  .photo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0.94rem;
    height: 0.94rem;
    background-color: pink;
    border-radius: 0.94rem;
    overflow: hidden;
    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      /* 通过定位把input放在img标签上面，通过不透明度隐藏原来的样式 */
    }
    img {
      width: 0.94rem;
      height: 0.94rem;
    }
  }
  .edit {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size: 0.18rem;
  }
  .manage {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 0.16rem;
    width: 100%;
    height: 1.46rem;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    .money,
    .addres,
    .help {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.16rem;
      p {
        position: absolute;
        left: 0.3rem;
        margin-left: 0.16rem;
      }
      .arrow {
        color: #c2c4ca;
      }
      .front {
        padding: 0.02rem;
        color: #fff;
        // font-weight: 700;
        background: #ed4a47;
        border-radius: 0.06rem;
      }
    }
    .addres .front {
      background: #32c5ff;
    }
    .help .front {
      background: rgba(144, 19, 254, 0.92);
    }
  }
}
</style>
