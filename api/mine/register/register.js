import request from "@/api/request"

// 在Uni、中  不管发送的请求是get还是post 把参数都存放在data中
function register(data){//注册账号
	return request({
		url:`/lejuClient/member/register`,
		method:'post',
		data
	})
}

export {
	register
}