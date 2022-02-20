<template>
	<view class="pay">
		<view class="header">
			<view class="num">
				<text>订单编号:</text>
				{{ orderInfo.orderSn }}
			</view>
			<view class="num">
				<text>订单金额:</text>
				￥{{ orderInfo.totalAmount }}
			</view>
		</view>
		<view class="center">
			<view class="title">请选择你的支付方式</view>
			<view class="list">
				<view class="item" @tap="paytype = 'alipay'">
					<view class="left">
						<image src="../../../static/image/icons/alipay.png" mode=""></image>
						<view class="text">支付宝支付</view>
					</view>
					<view class=""><radio :checked="paytype == 'alipay'" color="#354E44" /></view>
				</view>
				<view class="item" @tap="paytype = 'wxpay'">
					<view class="left">
						<image src="../../../static/image/icons/wxpay.png" mode=""></image>
						<view class="text">微信支付</view>
					</view>
					<view class=""><radio :checked="paytype == 'wxpay'" color="#354E44" /></view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn" @tap="payIt">立即支付</view>
			<view class="prompt">
				点击立即支付，即代表您同意
				<view class="protocol">《条款协议》</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getPreOrderById, payConfirm } from '@/api/order/order.js';
import mix from '@/mixins/index.js';
export default {
	data() {
		return {
			// price: 0,
			// list: {},
			paytype: 'alipay', //支付类型
			id: '',
			orderInfo: {}
		};
	},
	mixins: [mix],
	onLoad(options) {
		this.id = options.orderId;
		this.init();
	},
	methods: {
		async init() {
			this.orderInfo = (await getPreOrderById(this.id)).data.orderBase;
		},
		async payment() {
			var result = await payConfirm({
				orderId: this.id,
				payType: this.paytype == 'alipay' ? 1 : 2
			});
			if (result.success == true) {
				uni.hideLoading();
				uni.showToast({
					title: '支付成功'
				});
				setTimeout(() => {
					uni.navigateTo({
						url: './payResult/payResult?price=' + this.orderInfo.totalAmount
					});
				}, 1000);
			} else {
				uni.showToast({
				    title: '支付失败',
				    duration: 2000
				});
			}
		},
		//立即支付
		payIt() {
			uni.showLoading({
				title: '支付中...',
			});
			this.payment()
		}
	}
};
</script>

<style lang="scss" scoped>
.pay {
	height: 100%;
	padding: 0 40rpx;
	.header {
		font-size: 32rpx;
		color: #333;
		padding-top: 40rpx;
		.num {
			padding: 20rpx 0;
			text {
				color: #7d7d7d;
				margin-right: 10rpx;
			}
		}
	}
	.center {
		padding-top: 60rpx;
		.title {
			font-size: 40rpx;
		}
		.list {
			width: 100%;
			padding-top: 40rpx;
			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				padding: 20rpx 0;
				.left {
					display: flex;
					align-items: center;
					width: 80%;
					.text {
						margin-left: 30rpx;
					}
					image {
						width: 80rpx;
						height: 80rpx;
					}
				}
			}
		}
	}
	.footer {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn {
			width: 70%;
			height: 80rpx;
			border-radius: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #354e44;
			box-shadow: 0rpx 5rpx 10rpx rgba(0, 0, 0, 0.2);
		}
		.prompt {
			margin-top: 10rpx;
			width: 100%;
			font-size: 24rpx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.protocol {
				color: #5a9ef7;
			}
		}
	}
}
</style>
