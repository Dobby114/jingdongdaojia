"use strict";(self["webpackChunkjingdong"]=self["webpackChunkjingdong"]||[]).push([[591],{1053:function(o,a,t){t.d(a,{Z:function(){return f}});var n=t(6252),e=t(3577);const i={class:"footer"},s=["innerHTML"],c={class:"footer__title"};function l(o,a,t,l,r,d){const v=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",i,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.items,((o,a)=>((0,n.wg)(),(0,n.j4)(v,{to:o.to,key:a,class:(0,e.C_)({footer__item:!0,"footer__item--active":o.to["name"]===l.route.name})},{default:(0,n.w5)((()=>[(0,n._)("div",{innerHTML:o.iconfont,class:"iconfont"},null,8,s),(0,n._)("div",c,(0,e.zw)(o.title),1)])),_:2},1032,["to","class"])))),128))])}var r=t(2201),d={name:"Foot",setup(){const o=[{iconfont:"&#xe6b8;",title:"首页",to:{name:"Home"}},{iconfont:"&#xe789;",title:"购物车",to:{name:"CartList"}},{iconfont:"&#xe64b;",title:"订单",to:{name:"OrderList"}},{iconfont:"&#xe7bd;",title:"我的",to:{name:"Personal"}}],a=(0,r.yj)();return{items:o,route:a}}},v=t(3744);const u=(0,v.Z)(d,[["render",l],["__scopeId","data-v-e02dee1a"]]);var f=u},1968:function(o,a,t){t.r(a),t.d(a,{default:function(){return P}});var n=t(6252),e=t(3577);const i=o=>((0,n.dD)("data-v-64b24ca0"),o=o(),(0,n.Cn)(),o),s={class:"container"},c=i((()=>(0,n._)("div",{class:"background"},[(0,n._)("div",{class:"background__top"})],-1))),l={class:"wrepper"},r={class:"personInfo"},d=i((()=>(0,n._)("div",{class:"username"},[(0,n._)("p",null,"下雨天头痛YiHuik女士")],-1))),v={class:"info"},u={class:"title"},f={class:"value"},p={class:"photo"},m=["src"],g=(0,n.uE)('<div class="edit iconfont" data-v-64b24ca0></div><div class="manage" data-v-64b24ca0><div class="money" data-v-64b24ca0><div class="iconfont front" data-v-64b24ca0></div><p data-v-64b24ca0>我的钱包</p><div class="iconfont arrow" data-v-64b24ca0></div></div><div class="addres" data-v-64b24ca0><div class="iconfont front" data-v-64b24ca0></div><p data-v-64b24ca0>我的地址</p><div class="iconfont arrow" data-v-64b24ca0></div></div><div class="help" data-v-64b24ca0><div class="iconfont front" data-v-64b24ca0></div><p data-v-64b24ca0>客服与帮助</p><div class="iconfont arrow" data-v-64b24ca0></div></div></div>',2);function _(o,a,t,i,_,b){const w=(0,n.up)("Foot");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",s,[c,(0,n._)("div",l,[(0,n._)("div",r,[d,(0,n._)("div",v,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(i.info,((o,a)=>((0,n.wg)(),(0,n.iD)("li",{key:a},[(0,n._)("div",u,(0,e.zw)(a),1),(0,n._)("div",f,(0,e.zw)(o),1)])))),128))])]),(0,n._)("div",p,[(0,n._)("input",{type:"file",name:"image",accept:"image/*",onChange:a[0]||(a[0]=(...o)=>i.uploadUserPhoto&&i.uploadUserPhoto(...o))},null,32),(0,n._)("img",{src:i.imgUrl?i.imgUrl:"https://img2.baidu.com/it/u=281177743,3353357933&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",alt:"头像"},null,8,m)]),g])]),(0,n.Wm)(w)],64)}var b=t(1053),w=t(2262),h={name:"Personal",components:{Foot:b.Z},setup(){const o={"红包":218,"优惠券":"12张","鲜豆":88,"白条":1e3},a=(0,w.iH)();a.value=localStorage.userPhoto;const t=o=>{const t=(0,w.qj)({errorinfo:"",imgURL:""}),n=o.target.files[0];console.log(n.size);const e=n.size;if(e<=2097152){t.errorinfo="",console.log("上传成功");const o=new FileReader;o.readAsDataURL(n),o.onloadend=()=>{localStorage.userPhoto=o.result,a.value=o.result,console.log(o.result)}}else t.errorinfo="上传失败，图片大小超出范围",console.log(t.errorinfo)};return{info:o,uploadUserPhoto:t,imgUrl:a}}},k=t(3744);const H=(0,k.Z)(h,[["render",_],["__scopeId","data-v-64b24ca0"]]);var P=H}}]);
//# sourceMappingURL=personal.69415d4d.js.map