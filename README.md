# 京东到家仿写（移动端）
## 项目介绍
  京东到家仿写项目是一个基于vue3及其相关技术开发的单页面应用，包括登录、注册、首页、首页搜索、商户详情、订单结算、购物车、订单管理、用户主页、地址管理等页面。页面中的数据，除定位地址信息外，其他信息都是mock数据，通过fastmock平台实现
### 主要功能
* 注册、登录（token验证、请求拦截和响应拦截）
* 单个商家详情展示
* 商品分类展示
* 购物车功能
* 订单提交
* 购物车、订单列表详情展示
* 首页商品搜索和搜索历史
### TODO
地址定位、地址管理、我的页面（用户头像设置--文件上传）、收藏商家、ElimentUI样式管理、更加灵活的多端适配
### 项目难点
* 购物、订单业务逻辑的实现----不同店铺对应的购物车和订单中商品数据的计算和管理----解决方法：vueX数据管理
* 代码拆分
* 数据结构设计
## 主要技术
列表，详细说一下用来什么功能实现了什么东西
* 通过rem方案实现移动端适配布局，以及多类型设备适配
  * 获得当前设备的宽度;计算该设备宽度和375的比率;通过比率与当前的fontsize的值相乘得到新的fontsize的值,然后通过getElementsByTagName设置html总的font-size属性为新的值
* 通过路由映射实现页面跳转，通过路由守卫验证token校验登录状态
* 路由懒加载
* 使用axios进行网络异步请求，对其进行二次封装，并添加请求拦截和响应拦截
* vueX和localstorage实现商户、购物车、订单数据的管理和DOM的动态渲染
## 页面展示
## 项目开发流程图
## 项目运行（Node版本为18.14.1）
```
git clone https://github.com/Dobby114/jingdongdaojia.git
cd jingdongdaojia
npm install
npm run serve
```
