import request from "@/api/request"

// 在Uni、中  不管发送的请求是get还是post 把参数都存放在data中
function doLogin(data){
	return request({
		url:`/lejuClient/login/doLogin`,
		method:"post",
		data
	})
}

function getMemberInfo(){
	return request({
		url:`/lejuClient/login/getMemberInfo`
	})
}

export {
	doLogin,
	getMemberInfo
}


