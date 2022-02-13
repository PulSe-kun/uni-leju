//混入 可复用功能
var obj = {
	data(){
		return {
			
		}
	},
	methods:{
		checkLogin(){
			var token = uni.getStorageSync("leju-token");
			if(token){
				return true
			}else{
				uni.showModal({
					title:"登录提示",
					content:"暂未登录,是否跳转到登录界面",
					success(res){
						if (res.confirm) {
							uni.navigateTo({
								url:"/pages/mine/login/login"
							})
						}
					}
				})
				return false
			}
		}
	},
	
}


export default obj

