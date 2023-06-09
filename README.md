# 京东到家仿写（移动端）

## 项目介绍
  京东到家仿写项目是一个基于vue3及其相关技术开发的单页面应用，包括登录、注册、首页、首页搜索、商户详情、订单结算、购物车、订单管理、用户主页、地址管理等页面。页面中的数据，除定位地址信息外，其他信息都是mock数据，通过fastmock平台实现
### 主要功能
- 注册、登录（token 验证、请求拦截和响应拦截）
- 单个商家详情展示
- 商品分类展示
- 购物车功能
- 订单提交
- 购物车、订单列表详情展示
- 首页商品搜索和搜索历史
- 地址定位、地址管理
- 我的页面（用户头像设置--头像上传）
### TODO
ElimentUI 样式管理、移动端用户交互体验改进、更加灵活的多端适配
### 项目难点
- 购物、订单业务逻辑的实现----不同店铺对应的购物车和订单中商品数据的计算和管理----解决方法：vueX 数据管理
- 代码拆分
- 数据结构设计
## 主要技术
* 通过rem方案实现移动端适配布局，以及多类型设备适配
  * 获得当前设备的宽度;计算该设备宽度和375的比率;通过比率与当前的fontsize的值相乘得到新的fontsize的值,然后通过getElementsByTagName设置html总的font-size属性为新的值
* 通过路由映射实现页面跳转，通过路由守卫验证token校验登录状态
* 路由懒加载
* 使用axios进行网络异步请求，对其进行二次封装，并添加请求拦截和响应拦截
* vueX 和 localstorage 实现商户、购物车、订单数据的管理和 DOM 的动态渲染
* 通过 axios 请求和路由实现地址管理的各种逻辑（新建、输入、保存，不同地址的编辑、保存）
  * get 请求数据获得用户的地址信息、展示
  * 新建页面校验每个输入框都有内容才能保存，点击保存发起 post 请求，将数据传到后端，同时转到地址管理显示页面
  * 点击某个地址，跳转进对应的地址编辑页面（通过 query 传参来跳到对应的编辑页面，传的参数是对应地址的 adressId---点击对应的地址，传递数据中对应的 id，这个数据是后端请求得到的）
* 通过高德地图提供的 SDK(软件开发工具包)( JS API )采用浏览器定位的方式实现精确定位（vue）
  * 主要用到其中的 AMap.Geolocation 插件，调用其中的 getCurrentPosition 方法得到经纬度
* 通过高德地图提供的地理逆编码 web 服务 API 将得到的经纬度变成地址信息（使用原 JS API 中的逆编码得到不合法的 key 的错误，遂，放弃）
  * 主要通过发起 axios.get 请求,访问拼接的地址
* 通过base64方法读取用户上传的文件的url（vue-cli的加密方式时base64）
  * 通过e.target.files[0]获得相关文件信息
  * 通过new FileReader()、reader.readAsDataURL(img)、reader.onloadend获得文件的url
  * 也可以通过window.URL.createObjectURL(e.target.files[0])获得
  * 网上更多人用elmentUI实现
## 页面展示（扫描二维码）用户名：admin  密码：123456
https://dobby114.github.io/jingdongdaojia/#/login

## 项目开发流程图

## 项目运行（Node 版本为 18.14.1）

```
git clone https://github.com/Dobby114/jingdongdaojia.git
cd jingdongdaojia
npm install
npm run serve
```
