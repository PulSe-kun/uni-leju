// 封装之后的uni.request 的使用与乐购项目中的请求保持一致
import baseUrl from "@/api/baseUrl.js"
var fun = function(config) {
	// 注意:config 调用函数的时候传递的参数
	return new Promise((resolve, rejected) => {
		uni.request({
			url: baseUrl + config.url,
			method: config.method,
			header: {
				token: uni.getStorageSync("leju-token")
			},
			data: config.data,
			timeout: 5000,
			success(res) {
				if (res.data.success) {
					resolve(res.data);
				} else {
					//登陆过期处理
					if (res.data.code == 20002) {
						uni.clearStorage()
						uni.showModal({
							title: "登录提示",
							content: "登录已失效,是否重新登录",
							success(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: "/pages/mine/login/login"
									})
								}
							}
						})
					} else { ////全局请求错误
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}

				}
			},
			fail(res) {
				rejected(res)
			}
		})
	})
}

export default fun
