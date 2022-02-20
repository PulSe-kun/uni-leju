(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/register/register"],{"1eb7":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t("d370")),r=t("fee1");function a(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{isRadio:!0,second:30,showText:!0,avatar:"../../../static/image/icons/leju-logo.png",formData:{phone:"",name:"",nickname:"",password:"",verification:""},rules:{name:{rules:[{required:!0,errorMessage:"请输入姓名"},{minLength:2,maxLength:10,errorMessage:"姓名长度在 {minLength} 到 {maxLength} 个字符"}]},phone:{rules:[{required:!0,errorMessage:"请输入手机号"},{pattern:"^[1]([3-9])[0-9]{9}$",errorMessage:"请输入正确的手机号"}]},nickname:{rules:[{required:!0,errorMessage:"请输入昵称"},{pattern:"^[\\u4E00-\\u9FA5A-Za-z0-9]{2,20}$",errorMessage:"注意昵称 中文、英文、数字但不包括下划线等符号"}]},password:{rules:[{required:!0,errorMessage:"请输入密码"},{pattern:"^[a-zA-Z]\\w{5,17}$",errorMessage:"以字母开头，长度在6~18之间"}]},verification:{rules:[{required:!0,errorMessage:"请输入验证码"},{format:"number\t",errorMessage:"验证码错误"}]}}}},onLoad:function(){},methods:{sendCode:function(){var e=this;this.showText=!1;var n=setInterval((function(){var n=--e.second;e.second=n<10?"0"+n:n}),1e3);setTimeout((function(){clearInterval(n),e.second=30,e.showText=!0}),3e4)},handleRadio:function(e){console.log(e),this.scode=e.detail.value.length,this.isRadio=!this.isRadio},uploadImg:function(){var n=this;e.chooseImage({sizeType:["original","compressed"],sourceType:["album"],success:function(t){if(console.log(t),t.tempFilePaths.length>1)e.showToast({title:"只能选择一张哦",icon:"none"});else{var r=t.tempFilePaths[0];n.avatar=r,e.uploadFile({url:o.default+"/lejuClient/login/uploadAvatar",filePath:r,name:"file",header:{token:e.getStorageSync("leju-token")},timeout:5e3,success:function(e){console.log(e),n.avatar=JSON.parse(e.data).data.fileUrl}})}}})},submit:function(){var n=this;if(0==this.scode)return e.showToast({icon:"none",title:"请先同意《协议》"}),!1;this.$refs.form.validate().then((function(t){console.log("表单数据信息：",t);var o={birthday:"",city:"",email:"",growth:0,historyIntegration:0,icon:n.avatar,id:"",integration:0,isDisabled:0,memberLevelId:"",nickname:n.formData.nickname,password:n.formData.password,personalizedSignature:"",phone:n.formData.phone,realname:"",sex:0,sourceType:0,status:1,username:n.formData.name,wxOpenId:""};(0,r.register)(o).then((function(n){console.log(n),1==n.success&&(e.showToast({title:"注册成功!"}),setTimeout((function(){e.redirectTo({url:"/pages/mine/login/login"})}),1e3))}))})).catch((function(e){console.log("表单错误信息：",e)}))}}};n.default=i}).call(this,t("543d")["default"])},3582:function(e,n,t){"use strict";var o=t("e0ee"),r=t.n(o);r.a},"377d":function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return o}));var o={uniForms:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(t.bind(null,"34da"))},uniFormsItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(t.bind(null,"e45e"))},uniEasyinput:function(){return t.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(t.bind(null,"873f"))}},r=function(){var e=this,n=e.$createElement;e._self._c},a=[]},4407:function(e,n,t){"use strict";(function(e){t("57a8");o(t("66fd"));var n=o(t("614a"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])},"614a":function(e,n,t){"use strict";t.r(n);var o=t("377d"),r=t("f609");for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);t("3582");var i,s=t("f0c5"),u=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"293139d8",null,!1,o["a"],i);n["default"]=u.exports},e0ee:function(e,n,t){},f609:function(e,n,t){"use strict";t.r(n);var o=t("1eb7"),r=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a}},[["4407","common/runtime","common/vendor"]]]);