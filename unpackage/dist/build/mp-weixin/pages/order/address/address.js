(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/address/address"],{"5ac2":function(n,e,t){},"7dd5":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var d=t("c545"),o=s(t("2b0c"));function s(n){return n&&n.__esModule?n:{default:n}}var a={data:function(){return{addressList:[],isChoose:!1}},mixins:[o.default],onLoad:function(n){"sendMes"==n.type&&(this.isChoose=!0)},onShow:function(){var n=this;this.checkLogin()&&(0,d.findAllAddress)().then((function(e){console.log(e),n.addressList=e.data.items}))},methods:{sendMes:function(e){this.isChoose&&(n.setStorageSync("addressInfo",e),n.navigateBack({delta:1}))},goAddList:function(){n.navigateTo({url:"/pages/order/addAddress/addAddress"})},edit:function(e){n.navigateTo({url:"/pages/order/addAddress/addAddress?addressId=".concat(e)})}}};e.default=a}).call(this,t("543d")["default"])},"8d48":function(n,e,t){"use strict";var d=t("5ac2"),o=t.n(d);o.a},be8f:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return s})),t.d(e,"a",(function(){return d}));var d={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"359b"))}},o=function(){var n=this,e=n.$createElement;n._self._c},s=[]},dd4d:function(n,e,t){"use strict";(function(n){t("57a8");d(t("66fd"));var e=d(t("f7be"));function d(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t("543d")["createPage"])},f6a8:function(n,e,t){"use strict";t.r(e);var d=t("7dd5"),o=t.n(d);for(var s in d)"default"!==s&&function(n){t.d(e,n,(function(){return d[n]}))}(s);e["default"]=o.a},f7be:function(n,e,t){"use strict";t.r(e);var d=t("be8f"),o=t("f6a8");for(var s in o)"default"!==s&&function(n){t.d(e,n,(function(){return o[n]}))}(s);t("8d48");var a,r=t("f0c5"),u=Object(r["a"])(o["default"],d["b"],d["c"],!1,null,"07ffc08e",null,!1,d["a"],a);e["default"]=u.exports}},[["dd4d","common/runtime","common/vendor"]]]);