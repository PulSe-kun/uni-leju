import request from "@/api/request"



// 在Uni、中  不管发送的请求是get还是post 把参数都存放在data中
function getPreOrderById(id){
	return request({
		url:`/lejuClient/order/getPreOrderById/${id}`
	})
}

function getCompanyAddrss(id){
	return request({
		url:`/lejuClient/orderReturn/getCompanyAddrss`
	})
}



export {
	getPreOrderById,
	getCompanyAddrss
}


