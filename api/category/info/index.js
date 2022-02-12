import request from "@/api/request.js"
//注意在uni中 不管发送的请求是get还是post 把参数都存放在data中
//查询所有分类
function productDetail(id) {
	return request({
		url: `/lejuClient/product/productDetail/${id}`,
	})
}
export {productDetail}