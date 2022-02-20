<template>
	<view class="payResult">
		<view class="icon"><uni-icons type="checkmarkempty" size="100"></uni-icons></view>
		<view class="title">订单支付成功</view>
		<view class="price">支付金额: {{ price }}</view>
		<view class="btn" @tap="goInfo">返回个人中心</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			price: 0
		};
	},
	onLoad(options) {
		this.price = options.price;
	},
	methods: {
		//返回个人中心
		goInfo(){
			uni.switchTab({
				url:'/pages/mine/mine'
			})
		}
		
	}
};
</script>

<style lang="scss" scoped>
.payResult {
	text-align: center;
	.icon {
		padding-top: 100rpx;
	}
	.title {
		padding-top: 40rpx;
		font-size: 50rpx;
	}
	.price {
		padding-top: 20rpx;
		font-size: 30rpx;
	}
	.btn {
		width: 200rpx;
		height: 60rpx;
		border: solid 1px #354e44;
		color: #354e44;
		border-radius: 10rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		margin: 0 auto;
		margin-top: 80rpx;
	}
}
</style>
