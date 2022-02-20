import request from "@/api/request"

// 在Uni、中  不管发送的请求是get还是post 把参数都存放在data中
function getPreOrderById(id){ //根据订单id获取订单明细
	return request({
		url:`/lejuClient/order/getPreOrderById/${id}`
	})
}

function addConfirmOrder(data){//提交确认订单
	return request({
		url:`/lejuClient/order/addConfirmOrder`,
		method:"post",
		data
	})
}


function payConfirm(data){//确认付款
	return request({
		url: `/lejuClient/order/payConfirm`,
		method: 'post',
		data
	})
}
export {
	getPreOrderById,
	addConfirmOrder,
	payConfirm
}


