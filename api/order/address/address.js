import request from "@/api/request"

function findAllAddress() { //查询地址列表
	return request({
		url: "/lejuClient/address/findAllAddress"
	})
}

function updateAddressInfo(data) { //更新地址
	return request({
		url: `/lejuClient/address/updateAddressInfo`,
		method: 'post',
		data
	})
}

function addAddressInfo(data) { //添加收获地址
	return request({
		url: "/lejuClient/address/addAddressInfo",
		method: 'post',
		data
	})
}

function switchDefault(addressId, defaultStatus) { //切换修改地址默认
	return request({
		url: `/lejuClient/address/switchDefault/${addressId}/${defaultStatus}`,
		method: 'post',
	})
}

function delAddressInfo(addressId) { //删除地址
	return request({
		url: `/lejuClient/address/delAddressInfo/${addressId}`,
		method: 'delete'
	})
}
export {
	findAllAddress,
	addAddressInfo,
	updateAddressInfo,
	switchDefault,
	delAddressInfo
}
