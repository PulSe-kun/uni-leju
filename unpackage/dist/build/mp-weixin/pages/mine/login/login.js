(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/login/login"],{"012c":function(n,e,t){"use strict";(function(n){t("57a8");o(t("66fd"));var e=o(t("6a1b"));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t("543d")["createPage"])},"235e":function(n,e,t){"use strict";t.d(e,"b",(function(){return r})),t.d(e,"c",(function(){return s})),t.d(e,"a",(function(){return o}));var o={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"359b"))}},r=function(){var n=this,e=n.$createElement;n._self._c},s=[]},"2a88":function(n,e,t){"use strict";t.r(e);var o=t("fad0"),r=t.n(o);for(var s in o)"default"!==s&&function(n){t.d(e,n,(function(){return o[n]}))}(s);e["default"]=r.a},4809:function(n,e,t){"use strict";var o=t("dc4e"),r=t.n(o);r.a},"6a1b":function(n,e,t){"use strict";t.r(e);var o=t("235e"),r=t("2a88");for(var s in r)"default"!==s&&function(n){t.d(e,n,(function(){return r[n]}))}(s);t("4809");var a,i=t("f0c5"),u=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,"f7ae1d8e",null,!1,o["a"],a);e["default"]=u.exports},dc4e:function(n,e,t){},fad0:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=s(t("a34a")),r=t("d34f");function s(n){return n&&n.__esModule?n:{default:n}}function a(n,e,t,o,r,s,a){try{var i=n[s](a),u=i.value}catch(c){return void t(c)}i.done?e(u):Promise.resolve(u).then(o,r)}function i(n){return function(){var e=this,t=arguments;return new Promise((function(o,r){var s=n.apply(e,t);function i(n){a(s,o,r,i,u,"next",n)}function u(n){a(s,o,r,i,u,"throw",n)}i(void 0)}))}}var u={data:function(){return{isPassword:!0,isAddClass:!1,loading:!1,username:"17596496508",password:"123456"}},methods:{retrievePassword:function(){n.navigateTo({url:"../password/password"})},register:function(){n.navigateTo({url:"../register/register"})},taggleIcon:function(){this.isPassword=!this.isPassword},login:function(){var e=this;return i(o.default.mark((function t(){var s,a,i;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isAddClass=!0,e.loading=!0,t.next=4,(0,r.doLogin)({password:e.password,username:e.username});case 4:if(s=t.sent,""!=e.username.length){t.next=10;break}return n.showToast({icon:"none",position:"bottom",title:"用户名不能为空"}),e.isAddClass=!1,e.loading=!1,t.abrupt("return");case 10:if(""!=e.password.length){t.next=15;break}return n.showToast({icon:"none",position:"bottom",title:"密码不能为空"}),e.isAddClass=!1,e.loading=!1,t.abrupt("return");case 15:if(console.log(s),s.success){t.next=24;break}return a=e,a.isAddClass=!0,a.loading=!0,setTimeout((function(){a.isAddClass=!1,a.loading=!1}),2e3),n.showToast({icon:"error",title:"登录失败,请检查用户名和密码!"}),n.showToast({title:"登录失败,请检查用户名和密码",icon:"none",duration:800}),t.abrupt("return");case 24:return n.setStorageSync("leju-token",s.data.token),console.log("leju-token"),t.next=28,(0,r.getMemberInfo)();case 28:i=t.sent,console.log(s),n.setStorageSync("userInfo",i.data.userInfo),n.showToast({title:"正在前往个人中心",icon:"success",duration:800}),n.showToast({title:"前往个人中心",icon:"success",duration:800}),setTimeout((function(){n.switchTab({url:"../mine"})}),800);case 34:case"end":return t.stop()}}),t)})))()}}};e.default=u}).call(this,t("543d")["default"])}},[["012c","common/runtime","common/vendor"]]]);