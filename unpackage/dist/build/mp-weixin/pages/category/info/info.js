(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/info/info"],{"26cd":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("e11b"),o=r(e("2b0c"));function r(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{info:{},htmlStyle:{img:"width:90%;display:block;margin:0 auto;height:auto"},activityText:"没有促销使用原价",isCollected:!1,isMaskShow:!1,current:0,currentTap:"",vModelValue:1}},mixins:[o.default],onLoad:function(n){var e=this;(0,i.productDetail)(n.id).then((function(n){console.log(n),e.info=n.data.product,t.setNavigationBarTitle({title:n.data.product.name});var i=t.getStorageSync("collected");if(i){var o=i.find((function(t){return t==e.info.id}));e.isCollected=!!o}else e.isCollected=!1}))},filters:{filterGoods:function(t){if("string"==typeof t){var n=JSON.parse(t);return n.reduce((function(t,n){return t+n.key+":"+n.value+"   "}),"")}return t.reduce((function(t,n){return t+n.key+":"+n.value+"   "}),"")}},methods:{order:function(){this.checkLogin()&&(this.currentTap?(console.log("立即购买"),(0,i.addPreOrder)({orderItemList:[{productId:this.info.id,productQuantity:this.vModelValue,productSkuId:this.info.skuList[this.current].id}]}).then((function(n){t.navigateTo({url:"/pages/order/order?id=".concat(n.data.orderId)})}))):(console.log("添加购物车"),(0,i.addCart)({productId:this.info.id,productSkuId:this.info.skuList[this.current].id,quantity:this.vModelValue}).then((function(n){t.showToast({title:"加入购物车",duration:1e3})}))))},collected:function(){var n=this,e=t.getStorageSync("collected");if(e){var i=e.find((function(t){return t==n.info.id}));if(i){var o=e.findIndex((function(t){return t==n.info.id}));e.splice(o,1),t.setStorageSync("collected",e),this.isCollected=!1,t.showToast({title:"取消收藏",duration:2e3})}else e.push(this.info.id),t.setStorageSync("collected",e),this.isCollected=!0,t.showToast({title:"添加收藏",duration:2e3})}else t.setStorageSync("collected",[this.info.id]),this.isCollected=!0,t.showToast({title:"添加收藏",duration:2e3})},goCart:function(){this.isMaskShow=!this.isMaskShow,this.currentTap=0},buy:function(){this.isMaskShow=!this.isMaskShow,this.currentTap=1},close:function(){this.isMaskShow=!1}}};n.default=u}).call(this,e("543d")["default"])},"330c":function(t,n,e){"use strict";var i=e("638b"),o=e.n(i);o.a},"3f30":function(t,n,e){"use strict";e.r(n);var i=e("26cd"),o=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=o.a},"570f":function(t,n,e){"use strict";e.r(n);var i=e("9a9c"),o=e("3f30");for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);e("330c");var u,c=e("f0c5"),a=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"add322d4",null,!1,i["a"],u);n["default"]=a.exports},"638b":function(t,n,e){},"9a9c":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"359b"))},mpHtml:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/mp-html/components/mp-html/mp-html")]).then(e.bind(null,"c0b4"))},uniNumberBox:function(){return e.e("uni_modules/uni-number-box/components/uni-number-box/uni-number-box").then(e.bind(null,"2f7b"))}},o=function(){var t=this,n=t.$createElement,e=(t._self._c,t.isMaskShow?t.__map(t.info.skuList,(function(n,e){var i=t.__get_orig(n),o=t._f("filterGoods")(n.spData);return{$orig:i,f0:o}})):null);t._isMounted||(t.e0=function(n){t.isMaskShow=!t.isMaskShow},t.e1=function(n,e){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];e=o.index;t.current=e}),t.$mp.data=Object.assign({},{$root:{l0:e}})},r=[]},f5f0:function(t,n,e){"use strict";(function(t){e("57a8");i(e("66fd"));var n=i(e("570f"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])}},[["f5f0","common/runtime","common/vendor"]]]);