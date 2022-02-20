import request from "@/api/request"

// 在Uni、中  不管发送的请求是get还是post 把参数都存放在data中
function addCart(data){//添加购物车
	return request({
		url:`/lejuClient/cart/addCart`,
		method:"post",
		data
	})
}

function findAllCartItem(){//购物车列表
	return request({
		url:`/lejuClient/cart/findAllCartItem`
	})
}

function delCartItems(data){//删除订单
	return request({
		url:`/lejuClient/cart/delCartItems`,
		method:"post",
		data
	})
}

export {
	addCart,
	findAllCartItem,
	delCartItems
}


