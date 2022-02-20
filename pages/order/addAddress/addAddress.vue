<template>
	<view class="addAddress">
		<view class="list">
			<view class="left">收件人</view>
			<view class="right"><input type="text" v-model="addlistInfo.name" placeholder="请输入收件人姓名" /></view>
		</view>
		<view class="list">
			<view class="left">电话号码</view>
			<view class="right"><input type="number" v-model="addlistInfo.phone" placeholder="请输入收件人手机号" /></view>
		</view>
		<view class="list">
			<view class="left">所在地区</view>
			<view class="right">
				<view @tap="select" class="area" v-if="flag">请点击选择所在地区</view>
				<view v-else >{{labelArr}}</view>
			</view>
		</view>
		<view class="list">
			<view class="left">详细地址</view>
			<view class="right"><input type="text" placeholder="请输入收件人详细地址" v-model="addlistInfo.detail"/></view>
		</view>
		<view class="list">
			<view class="left">设置默认地址</view>
			<view class="right switch"><switch name="switch" color="orange" @change="switchChange" :checked="isChecked" /></view>
		</view>
		<button @tap="deleteAddress" class="del-btn" v-if="editType">删除地址</button>
		<button @tap="saveAddress" class="re-btn">保存地址</button>
		<simple-address ref="simpleAddress" @onConfirm="confirm" :pickerValueDefault="cityPickerValueDefault" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
import { findAllAddress, addAddressInfo, switchDefault, updateAddressInfo, delAddressInfo } from '@/api/order/address/address.js';
import simpleAddress from '@/components/simple-address/simple-address.vue';
export default {
	data() {
		return {
			addlistInfo: {
				name: '',
				phone: '',
				detail: ''
			},
			cityPickerValueDefault: [0, 0, 1], //地区组件地址初始值,
			labelArr: [],
			editType: false, //区分编辑还是新增
			flag: true, //控制地区显示隐藏
			isChecked: false, //控制默认地址
			addressid: '',
			cityCode:'',//地址编码
			info:{}
		};
	},
	components: {
		simpleAddress
	},
	onLoad(e) {
		// 初始化 如果有addressId说明是编辑
		if (e.addressId) {
			this.editType = true; //有 显示删除按钮
			this.addressid = e.addressId;
			this.getAddressById(e.addressId);
		} else {
			this.editType = false;//无 无删除按钮
		}
	},
	methods: {
		// 根据id获取地址明细
		getAddressById(id) {
			findAllAddress().then(res => {
				console.log(res)
				var info = res.data.items.find(ele => ele.id == id);
				// index 获得的 省-市-区 索引
				//var index = this.$refs.simpleAddress.queryIndex(info.cityCode.split('-'), 'value');
				//this.cityPickerValueDefault = index.index;
				//console.log(index);
				this.info = info;
				this.addlistInfo.name = info.name;
				this.addlistInfo.phone = info.phoneNumber;
				this.cityCode=info.cityCode
				this.labelArr=info.province+'-'+info.city+'-'+info.region
				this.addlistInfo.detail = info.detailAddress;
				this.isChecked = info.defaultStatus ? true : false;
				this.flag=false;
			});
		},
		//选择地区
		select() {
			this.$refs.simpleAddress.open();
		},
		//设置默认按钮
		switchChange(e) {
			console.log('switch发生change事件，携带值为', e.target.value);
			this.isChecked = e.detail.value;
			if (this.editType) {
				switchDefault(this.addressid, e.detail.value == true ? 1 : 0).then(res => {
					if (res.success == true) {
						uni.showToast({
							title: '切换默认成功',
							icon: 'none'
						});
					}
				});
			}
		},
		//确认按钮
		confirm(val) {
			console.log(val);
			this.flag = !this.flag;
			this.labelArr = val.labelArr.join('-'); // '-' 连接
			//console.log(this.labelArr)
			this.cityCode = `${val.provinceCode},${val.cityCode},${val.areaCode}`;
		},
		//保存地址
		saveAddress() {
			var arr =this.labelArr.split('-')
			console.log(arr)
			var obj = {
				city: arr[1],
				cityCode: this.cityCode,
				createTime: '',
				defaultStatus: this.isChecked ? 1 : 0, //设置默认; 0 -> 否 ; 1-> 是 ,
				detailAddress: this.addlistInfo.detail,
				id: '',
				memberId: '',
				modifyTime: '',
				name: this.addlistInfo.name,
				phoneNumber: this.addlistInfo.phone,
				postCode: '', //邮政编码
				province: arr[0], //省份/直辖市
				region: arr[2], //区
				tag: '' //标识: 公司,家
			};
			if (this.editType) {
				//编辑地址
				obj.memberId = this.info.memberId;
				obj.id = this.info.id;
				updateAddressInfo(obj).then(res => {
					if (res.success == true) {
						uni.showToast({
							title: '更新成功'
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					}
				});
			} else {
				//新增地址
				addAddressInfo(obj).then(res => {
					if (res.success == true) {
						uni.showToast({
							title: '添加成功'
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					}
				});
			}
		},
		//删除地址
		deleteAddress() {
			uni.showModal({
				title: '删除提示',
				content: '确定删除这个收货地址?',
				success: res => {
					if (res.confirm) {
						// 发送请求删除地址
						delAddressInfo(this.info.id).then(res => {
							if (res.success == true) {
								uni.showToast({
									title: '删除成功'
								});
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 1000);
							}
						});
					} else if (res.cancel) {
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.addAddress {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	.list {
		width: 90%;
		border-bottom: 2rpx solid #ccc;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		align-items: center;
		padding: 10rpx 0;
		.left {
			width: 30%;
			font-weight: 200;
			font-size: 30rpx;
		}
		.right {
			width: 70%;
			.area {
				font-size: 30rpx;
			}
		}
		.switch {
			display: flex;
			justify-content: flex-end;
		}
	}
	.re-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70%;
		height: 82rpx;
		border-radius: 2.5rem;
		background: rgb(53, 78, 68);
		color: rgb(255, 255, 255);
		margin-top: 30rpx;
		font-size: 32rpx;
		margin-top: 40rpx;
	}
	.del-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70%;
		height: 82rpx;
		border-radius: 2.5rem;
		background: #e64340;
		color: #fff;
		margin-top: 30rpx;
		font-size: 32rpx;
		margin-top: 150rpx;
	}
}
</style>
