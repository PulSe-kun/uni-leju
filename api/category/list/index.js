import request from "@/api/request.js"
//注意在uni中 不管发送的请求是get还是post 把参数都存放在data中
//查询所有分类
function findProductList(start,limit,data) {
	return request({
		url: `/lejuClient/product/findProductList/${start}/${limit}`,
		method:"post",
		data
	})
}
export {findProductList}