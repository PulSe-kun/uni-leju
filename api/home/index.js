import request from "@/api/request.js"
//注意在uni中 不管发送的请求是get还是post 把参数都存放在data中
//轮播
function bannerAds() {
	return request({
		url: "/lejuClient/home/bannerAds",
	})
}

function findCategory(id){
	return request({
		url:`/lejuClient/productCategory/findCategory/${id}`
	})
}

function recommendList(){
	return request({
		url:`/lejuClient/home/recommendList`
	})
}

function hotList(){
	return request({
		url:`/lejuClient/home/hotList`
	})
}

function lejuLatestProducts(){
	return request({
		url:`/lejuClient/home/lejuLatestProducts`
	})
}

export{bannerAds,findCategory,recommendList,hotList,lejuLatestProducts}
