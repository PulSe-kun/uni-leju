// 封装之后的uni.request 的使用与乐购项目中的请求保持一致
import baseUrl from "@/api/baseUrl.js"
var fun = function(config){
	// 注意:config 调用函数的时候传递的参数
	return new Promise((resolve,rejected)=>{
		uni.request({
			url:baseUrl + config.url,
			method:config.method,
			data:config.data,
			timeout:5000,
			success(res){
				resolve(res.data)
			},
			fail(res){
				rejected(res)	
			}
		})
	})
}

export default fun