import request from "@/api/request"



// 在Uni、中  不管发送的请求是get还是post 把参数都存放在data中
function getPreOrderById(id){//根据订单id获取订单明细
	return request({
		url:`/lejuClient/order/getPreOrderById/${id}`
	})
}

function getCompanyAddrss(id){//公司地址
	return request({
		url:`/lejuClient/orderReturn/getCompanyAddrss`
	})
}

function uploadImg(data){//上传图片
	return request({
		url:`/lejuClient/orderReturn/uploadImg`,
		method:'post',
		data
	})
}

function addOrderReturnApply(data){//申请退单
	return request({
		url:`/lejuClient/orderReturn/addOrderReturnApply`,
		method:'post',
		data
	})
}
export {
	getPreOrderById,
	getCompanyAddrss,
	uploadImg,
	addOrderReturnApply
}


