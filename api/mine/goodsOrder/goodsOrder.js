import request from "@/api/request"

// 在Uni、中  不管发送的请求是get还是post 把参数都存放在data中
function findAllOrders(){ //查询订单
	return request({
		url:`/lejuClient/order/findAllOrders`,
	})
}


function cancelOrder(id){// 取消订单 
	return request({
		url: `/lejuClient/order/cancelOrder/${id}`,
		method: 'post'
	})
}


function receiveDone(data){ //确认收货
	return request({
		url:`/lejuClient/order/receiveDone`,
		method:'post',
		data
	})
}

function orderReturnApplys(data){ //退单列表
	return request({
		url:`/lejuClient/orderReturn/orderReturnApplys`
	})
}

function _clearOrderFocus(id){ //删除订单
	return request({
		url:`/lejuClient/order/_clearOrderFocus?orderId=${id}`,
		method:'post',
	})
}
export {
	findAllOrders,
	cancelOrder,
	receiveDone,
	_clearOrderFocus,
	orderReturnApplys
}


