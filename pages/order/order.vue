<template>
	<view class="order" v-if="list.orderBase">
		<view class="text"><text>等待支付</text></view>
		<view v-if="!addressInfo.id" @tap="selectAddress" class="save">选择收货地址</view>
		<view class="address" v-else>
			<view class="addressInfo">
				<view >姓名: {{ addressInfo.name }} &nbsp&nbsp手机号: {{ addressInfo.phoneNumber }}</view>
				<view >收获地址: {{ addressInfo.province }} {{ addressInfo.city }} {{ addressInfo.region }}</view>
			</view>
			<view class="btn" @tap="selectAddress">更换地址</view>
		</view>
		<view class="orderItems">
			<view class="title">
				<text v-if="list.orderBase">订单编号:{{ list.orderBase.orderSn }}</text>
				<text class="wait">等待支付</text>
			</view>
			<view class="center" v-for="item in list.orderItems" :key="item.id">
				<image :src="item.productPic" mode=""></image>
				<view class="info">
					<view class="p1">
						<view class="name">{{ item.productName }}</view>
						<view class="price">{{ item.productPrice }}</view>
					</view>
					<view class="p2">
						<view class="code">编号: {{ item.productSkuCode }}</view>
						<view class="num">x{{ item.productQuantity }}</view>
					</view>
					<view class="p3">规格: {{ item.productAttr | filterGoods }}</view>
				</view>
			</view>
			<view class="footer">
				<view class="totalPrice" v-for="item in list.orderItems" :key="item.id">合计: {{ item.totalPrice }}</view>
				<view class="btn" type="default" @tap="goPay">确认付款</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getPreOrderById, addConfirmOrder } from '@/api/order/order.js';
import { findAllAddress } from '@/api/order/address/address.js';
export default {
	data() {
		return {
			list: {},
			addressInfo: {}
		};
	},
	onLoad(options) {
		getPreOrderById(options.id).then(res => {
			console.log(res);
			this.list = res.data;
		});
	},

	onShow() {
		//将数据中点击更新的地址渲染到页面
		this.addressInfo = uni.getStorageSync('addressInfo');
	},
	filters: {
		filterGoods(val) {
			//检测 字符串类型
			//将JSON格式的字符串转换回对象
			if (typeof val == 'string') {
				var arr = JSON.parse(val);
				return arr.reduce((total, current) => {
					return total + current.key + ':' + current.value + '   ';
				}, '');
			} else {
				return val.reduce((total, current) => {
					return total + current.key + ':' + current.value + '   ';
				}, '');
			}
		}
	},
	methods: {
		//选择收货地址
		selectAddress() {
			uni.navigateTo({
				url: '/pages/order/address/address'
			});
		},
		//去付款
		goPay() {
			uni.navigateTo({
				url: '/pages/order/pay/pay'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.order {
	.text {
		font-size: 36rpx;
		color: #494949;
		height: 88rpx;
		border-bottom: 2rpx solid #ccc;
		line-height: 88rpx;
		margin: 0 60rpx;
		box-sizing: border-box;
	}
	.save{
		font-size: 28rpx;
		color: #494949;
		border-bottom: 2rpx solid #ccc;
		margin: 0 60rpx;
		box-sizing: border-box;
		padding: 20rpx 0;
		line-height: 40rpx;
		font-weight: bolder;
	}
	.address {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #494949;
		border-bottom: 2rpx solid #ccc;
		margin: 0 60rpx;
		box-sizing: border-box;
		padding: 20rpx 0;
		line-height: 40rpx;
		.btn {
			width: 124rpx;
			height: 50rpx;
			border: 2rpx solid #2d4f43;
			font-size: 26rpx;
			border-radius: 10rpx;
			color: #2d4f43;
			text-align: center;
			line-height: 50rpx;
		}
	}
	.orderItems {
		width: 672rpx;
		box-sizing: border-box;
		padding: 36rpx;
		border-radius: 24rpx;
		background-color: #fff;
		margin: 30rpx auto;
		font-size: 24rpx;
		color: #3e3e3e;
		.title {
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid #f1ece7;
			padding-bottom: 30rpx;
			.wait {
				color: #034c46;
			}
		}
		.center {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 2rpx solid #f1ece7;
			padding: 30rpx 0;
			image {
				width: 162rpx;
				height: 162rpx;
				flex-shrink: 0;
				background-color: #8f8f94;
			}
			.info {
				display: flex;
				flex-wrap: wrap;
				margin-left: 28rpx;
				align-items: center;
				color: #8d8d8d;
				.p1 {
					width: 100%;
					display: flex;
					justify-content: space-between;
					font-size: 26rpx;
					color: #3e3e3e;
				}
				.p2 {
					width: 100%;
					display: flex;
					justify-content: space-between;
					font-size: 22rpx;
					line-height: 30rpx;
					padding: 20rpx 0;
				}
				.p3 {
					width: 100%;
				}
			}
		}
		.footer {
			.btn {
				width: 124rpx;
				height: 50rpx;
				border: 2rpx solid #2d4f43;
				font-size: 26rpx;
				border-radius: 10rpx;
				color: #2d4f43;
				text-align: center;
				line-height: 50rpx;
				margin-left: 480rpx;
			}
			.totalPrice {
				font-size: 26rpx;
				line-height: 36rpx;
				text-align: right;
				margin-top: 14rpx;
				margin-bottom: 20rpx;
			}
		}
	}
}
</style>
