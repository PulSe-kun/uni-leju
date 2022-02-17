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
				<view @tap="select" class="area">请点击选择所在地区</view>
				<simple-address ref="simpleAddress" @onConfirm="confirm" :pickerValueDefault="cityPickerValueDefault" themeColor="#007AFF"></simple-address>
			</view>
		</view>
		<view class="list">
			<view class="left">详细地址</view>
			<view class="right"><input type="text" placeholder="请输入收件人详细地址" /></view>
		</view>

		<view class="list">
			<view class="left">设置默认地址</view>
			<view class="right"></view>
		</view>
		<button @tap="saveAddress" class="re-btn">保存地址</button>
	</view>
</template>

<script>
import { addAddressInfo } from '@/api/order/address/address.js';
import simpleAddress from '@/components/simple-address/simple-address.vue';
export default {
	data() {
		return {
			addlistInfo: {
				name: '',
				phone: '',
				detail: ''
			},
			cityPickerValueDefault: [0, 0, 1] //地区组件地址初始值
		};
	},
	components: {
		simpleAddress
	},
	methods: {
		//选择地区
		select() {
			this.$refs.simpleAddress.open();
		},
		//确认按钮
		confirm(val) {
			console.log(val);
		},
		//保存地址
		saveAddress() {
			var obj = {
				city: 'string',
				cityCode: 'string',
				createTime: '',
				defaultStatus: 0,
				detailAddress: this.addlistInfo.detail,
				id: '',
				memberId: 'string',
				modifyTime: '',
				name: this.addlistInfo.name,
				phoneNumber: this.addlistInfo.phone,
				postCode: '',//邮政编码 
				province: '',//省份/直辖市 
				region: '',//区
				tag: ''//标识: 公司,家
			};
			addAddressInfo(obj).then(res => {
				console.log(res);
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
	}
	.re-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80%;
		height: 100rpx;
		border-radius: 2.5rem;
		background: rgb(53, 78, 68);
		color: rgb(255, 255, 255);
		margin-top: 30rpx;
		font-size: 36rpx;
		margin-top: 180rpx;
	}
}
</style>
