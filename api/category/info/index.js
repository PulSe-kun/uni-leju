import request from "@/api/request.js"
//注意在uni中 不管发送的请求是get还是post 把参数都存放在data中
//查询所有分类
function productDetail(id) {
	return request({
		url: `/lejuClient/product/productDetail/${id}`,
	})
}
function addCart(data) {//添加购物车
	return request({
		url: `/lejuClient/cart/addCart`,
		method:'post',
		data
	})
}
function addPreOrder(data) {//生成确认订单
	return request({
		url: `/lejuClient/order/addPreOrder`,
		method:'post',
		data
	})
}
export {productDetail,addCart,addPreOrder}