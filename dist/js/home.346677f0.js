"use strict";(self["webpackChunkjingdong"]=self["webpackChunkjingdong"]||[]).push([[177],{1053:function(e,t,n){n.d(t,{Z:function(){return u}});var s=n(6252),i=n(3577);const l={class:"footer"},o=["innerHTML"],a={class:"footer__title"};function r(e,t,n,r,c,d){const m=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",l,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.items,((e,t)=>((0,s.wg)(),(0,s.j4)(m,{to:e.to,key:t,class:(0,i.C_)({footer__item:!0,"footer__item--active":e.to["name"]===r.route.name})},{default:(0,s.w5)((()=>[(0,s._)("div",{innerHTML:e.iconfont,class:"iconfont"},null,8,o),(0,s._)("div",a,(0,i.zw)(e.title),1)])),_:2},1032,["to","class"])))),128))])}var c=n(2201),d={name:"Foot",setup(){const e=[{iconfont:"&#xe6b8;",title:"首页",to:{name:"Home"}},{iconfont:"&#xe789;",title:"购物车",to:{name:"CartList"}},{iconfont:"&#xe64b;",title:"订单",to:{name:"OrderList"}},{iconfont:"&#xe7bd;",title:"我的",to:{name:"Personal"}}],t=(0,c.yj)();return{items:e,route:t}}},m=n(3744);const p=(0,m.Z)(d,[["render",r],["__scopeId","data-v-e02dee1a"]]);var u=p},4325:function(e,t,n){n.d(t,{Z:function(){return g}});var s=n(6252),i=n(3577);const l={class:"shop"},o={class:"container"},a=["src"],r={class:"title"},c={class:"tag"},d={class:"highlight"};function m(e,t,n,m,p,u){const _=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("li",l,[(0,s.Wm)(_,{to:`/shop/${n.item.name?n.item.name:n.item._id}`},{default:(0,s.w5)((()=>[(0,s._)("div",o,[(0,s._)("img",{src:n.item.imgUrl,alt:""},null,8,a)]),(0,s._)("div",{class:(0,i.C_)({shop__info:!0,"shop__info--border":!n.hiddeBorder})},[(0,s._)("h4",r,(0,i.zw)(n.item.name?n.item.name:n.item._id),1),(0,s._)("div",c,[(0,s._)("span",null,"月售:"+(0,i.zw)(n.item.sales),1),(0,s._)("span",null,"起送:"+(0,i.zw)(n.item.expressLimit),1),(0,s._)("span",null,"基础运费:"+(0,i.zw)(n.item.expressPrice),1),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.item.tag,((e,t)=>((0,s.wg)(),(0,s.iD)("span",{key:t},(0,i.zw)(e),1)))),128))]),(0,s._)("div",d,(0,i.zw)(n.item.slogan),1)],2)])),_:1},8,["to"])])}var p={name:"ShopInfo",props:["item","hiddeBorder"]},u=n(3744);const _=(0,u.Z)(p,[["render",m],["__scopeId","data-v-7d836894"]]);var g=_},3167:function(e,t,n){n.r(t),n.d(t,{default:function(){return B}});var s=n(6252);const i={class:"container"},l={class:"wrapper"};function o(e,t,n,o,a,r){const c=(0,s.up)("Top"),d=(0,s.up)("Nearby"),m=(0,s.up)("Foot");return(0,s.wg)(),(0,s.iD)("div",i,[(0,s._)("div",l,[(0,s.Wm)(c),(0,s.Wm)(d)]),(0,s.Wm)(m)])}var a=n(3577);const r=e=>((0,s.dD)("data-v-2d032464"),e=e(),(0,s.Cn)(),e),c={class:"header"},d=r((()=>(0,s._)("div",{class:"header__top"},[(0,s._)("span",{class:"iconfont header__position"},""),(0,s._)("span",{class:"header__item"},"上海大学延长校区行健楼10层技园2号楼10层"),(0,s._)("span",{class:"iconfont header__notice"},"")],-1))),m={class:"header__search"},p=r((()=>(0,s._)("a",{href:"#",class:"iconfont"},"",-1))),u=r((()=>(0,s._)("div",{class:"banner"},[(0,s._)("img",{src:"https://www.dell-lee.com/imgs/vue3/banner.jpg",alt:"后面做成轮播图",class:"banner__img1"})],-1))),_={class:"nav"},g={href:"#"},w={class:"containor"},v=["src"],h={class:"desc"},f=r((()=>(0,s._)("div",{class:"gap"},null,-1)));function I(e,t,n,i,l,o){return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",c,[d,(0,s._)("div",m,[p,(0,s.Uk)(),(0,s._)("input",{type:"text",style:{width:"1.4rem"},placeholder:"山姆会员商店优惠商品",onClick:t[0]||(t[0]=()=>i.handleInputClick(i.router))})])]),u,(0,s._)("div",_,[(0,s._)("ul",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.navInfos,((e,t)=>((0,s.wg)(),(0,s.iD)("li",{key:t},[(0,s._)("a",g,[(0,s._)("div",w,[(0,s._)("img",{src:e.imgUrl,alt:""},null,8,v)]),(0,s._)("div",h,(0,a.zw)(e.title),1)])])))),128))])]),f],64)}n(7658);var b=n(2201),k={name:"Top",setup(){const e=[{imgUrl:"https://www.dell-lee.com/imgs/vue3/超市.png",title:"超市便利"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/菜市场.png",title:"菜市场"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/水果店.png",title:"水果店"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/鲜花.png",title:"鲜花绿植"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/医药健康.png",title:"医药健康"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/家居.png",title:"家居时尚"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/蛋糕.png",title:"烘焙蛋糕"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/签到.png",title:"签到"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/大牌免运.png",title:"大牌免运"},{imgUrl:"https://www.dell-lee.com/imgs/vue3/红包.png",title:"红包"}],t=(0,b.tv)(),n=e=>{e.push({name:"Search"})};return{navInfos:e,router:t,handleInputClick:n}}},y=n(3744);const D=(0,y.Z)(k,[["render",I],["__scopeId","data-v-2d032464"]]);var U=D;const C=e=>((0,s.dD)("data-v-7af9dd3c"),e=e(),(0,s.Cn)(),e),H={class:"nearby"},Z=C((()=>(0,s._)("h3",null,"附近店铺",-1)));function z(e,t,n,i,l,o){const a=(0,s.up)("ShopInfo");return(0,s.wg)(),(0,s.iD)("div",H,[Z,(0,s._)("ul",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.shopInfors,(e=>((0,s.wg)(),(0,s.j4)(a,{key:e._id,item:e},null,8,["item"])))),128))])])}var x=n(2262),j=n(1117),L=n(4325);const T=()=>{const e=(0,x.iH)([]),t=async()=>{const t=await(0,j.t5)("/api/shop/nearby-list");0===t?.errno&&t?.data?.length&&(e.value=t.data)};return t(),{shopInfors:e}};var Y={name:"Nearby",components:{ShopInfo:L.Z},setup(){const{shopInfors:e}=T();return{shopInfors:e}}};const K=(0,y.Z)(Y,[["render",z],["__scopeId","data-v-7af9dd3c"]]);var S=K,W=n(1053),F={name:"Home",components:{Top:U,Nearby:S,Foot:W.Z}};const N=(0,y.Z)(F,[["render",o],["__scopeId","data-v-ee4e2400"]]);var B=N}}]);
//# sourceMappingURL=home.346677f0.js.map