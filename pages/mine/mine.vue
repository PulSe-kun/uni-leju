<template>
	<view class="mine">
		<!-- 头部 -->
		<view class="header">
			<view class="area">
				<image class="avatar" :src="userInfo.icon" mode="" @tap="editUser"></image>
				<view class="info">
					<view class="nickname">{{ userInfo.nickname }}</view>
					<view class="username" v-if="userInfo.username">用户名:{{ userInfo.username }}</view>
					<view class="" v-if="flag">Hi , 您还没有登陆呢!</view>
					<view class="btn" v-if="flag">
						<button type="default" @tap="register">注册</button>
						<button type="default" @tap="login">登陆</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="my-orders">
			<view class="title">我的订单</view>
			<view class="navs">
				<!-- 订单状态  1 已付款 ;  2 已发货; 3: 已收货;   9 申请退款 -->
				<navigator class="nav-item" url="/pages/mine/goodsOrder/goodsOrder?type=0">
					<image class="icon" src="../../static/image/icons/icon-pay.png"></image>
					<view class="text">待付款</view>
				</navigator>
				<navigator class="nav-item" url="/pages/mine/goodsOrder/goodsOrder?type=1">
					<image class="icon" src="../../static/image/icons/pay-done.png"></image>
					<view class="text">已付款</view>
				</navigator>
				<navigator class="nav-item" url="/pages/mine/goodsOrder/goodsOrder?type=2">
					<image class="icon" src="../../static/image/icons/icon-car.png"></image>
					<view class="text">已发货</view>
				</navigator>
				<navigator class="nav-item" url="/pages/mine/goodsOrder/goodsOrder?type=3">
					<image class="icon" src="../../static/image/icons/icon-done.png"></image>
					<view class="text">已收货</view>
				</navigator>
				<navigator class="nav-item" url="/pages/mine/goodsOrder/goodsOrder?type=4">
					<image class="icon" src="../../static/image/icons/icon-back.png"></image>
					<view class="text">售后</view>
				</navigator>
			</view>
		</view>
		<!-- 功能页面 -->
		<view class="list">
			<view class="items">
				<navigator url="/pages/mine/collect/collect">
					<image class="img" src="../../static/image/icons/save.png" mode=""></image>
					<text class="text">商品收藏</text>
				</navigator>
			</view>
			<view class="items" @tap="brand">
				<image class="img" src="../../static/image/icons/brand.png" mode=""></image>
				<text class="text">品牌</text>
			</view>
			<view class="items">
				<navigator url="/pages/mine/article/article">
					<image class="img" src="../../static/image/icons/article.png" mode=""></image>
					<text class="text">文章收藏</text>
				</navigator>
			</view>
			<view class="items">
				<navigator url="/pages/order/address/address">
					<image class="img" src="../../static/image/icons/address.png" mode=""></image>
					<text class="text">地址</text>
				</navigator>
			</view>
			<view class="items" @tap='wallet'>
				<!-- <view class="img">
					<uni-icons type="wallet" size="30"></uni-icons>
				</view> -->
				<image class="img" src="../../static/image/icons/card.png" mode=""></image>
				<text class="text">卡包</text>
			</view>
			<view class="items">
				<navigator url="/pages/mine/cart/cart">
				<image class="img" src="../../static/image/icons/cart2.png" mode=""></image>
				<text class="text">购物车</text>
				</navigator>
			</view>
			<view class="items" @tap="help">
				<image class="img" src="../../static/image/icons/contact.png" mode=""></image>
				<text class="text">联系客服</text>
			</view>
		</view>
		<!-- <navigator url="./login/login">登录</navigator> -->
	</view>
</template>

<script>
import mix from '@/mixins/index.js';
export default {
	data() {
		return {
			userInfo: {},
			flag: true
		};
	},
	mixins: [mix], //混入 复用
	// 第一次进入该页面会执行的钩子函数 返回也不会执行
	onLoad() {},
	//每次进到该页面 都执行的函数
	onShow() {
		if (this.checkLogin()) {
			var userInfo = uni.getStorageSync('userInfo');
			this.userInfo = userInfo;
			this.flag = false;
		}
		//根据本地token进行判断有没有登录
		// var token = uni.getStorageSync('leju-token');
		// if (token) {
		// 	var userInfo = uni.getStorageSync('userInfo');
		// 	this.userInfo = userInfo;
		// } else {
		// 	uni.showModal({
		// 		title: '登录提示',
		// 		content: '暂未登录,是否跳转到登录界面',
		// 		success(res) {
		// 			if (res.confirm) {//点击确定才跳转
		// 				uni.navigateTo({
		// 					url: '/pages/mine/login/login'
		// 				});
		// 			}
		// 		}
		// 	});
		// }
	},
	methods: {
		//跳入更新用户信息页面
		editUser() {
			uni.navigateTo({
				//保留当前页面，跳转到应用内的某个页面
				url: './editUser/editUser'
			});
		},
		//跳回注册页面
		register() {
			uni.reLaunch({
				//关闭所有页面，打开到应用内的某个页面。
				url: './register/register'
			});
		},
		//跳回登陆页面
		login() {
			uni.reLaunch({
				url: './login/login'
			});
		},
		//我的订单
		// goGoodsOrder(){
		// 	uni.navigateTo({
		// 		url:'/pages/mine/goodsOrder/goodsOrder'
		// 	})
		// },
		//品牌
		brand() {
			uni.showToast({
				title: '品牌暂未开通',
				icon:"error",
				duration: 1000
			});
		},
		//卡包
		wallet(){
			uni.showToast({
				title: '卡包暂未开通',
				icon:"error",
				duration: 1000
			});
		},
		//客服帮助
		help(){
			uni.showToast({
				title: '客服占线',
				icon:"error",
				duration: 1000
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.mine {
	// width: 90%;
	// margin: 0 auto;
	padding: 0 40rpx;
	.header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 150rpx;
		padding-top: 60rpx;
		.area {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100%;
			.avatar {
				display: block;
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				background-color: #c8c7cc;
			}
			.info {
				display: flex;
				margin-left: 32rpx;
				height: 150rpx;
				color: #3d4c46;
				font-size: 28rpx;
				flex-direction: column;
				justify-content: space-around;
				box-sizing: border-box;
				padding: 14rpx 0;
				.btn {
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 360rpx;
					padding-top: 30rpx;
				}
				button {
					font-size: 20rpx;
					width: 150rpx;
					height: 100%;
					background-color: #354e44;
					color: #fff;
					margin-left: 0;
					&:first-child {
						background-color: #fff;
						color: #333;
						border: 1px solid #354e44;
						box-sizing: border-box;
					}
				}
			}
			.nickname {
				font-size: 40rpx;
				font-weight: 600;
			}
			.username {
				font-size: 26rpx;
				color: #999;
			}
		}
	}
	.my-orders {
		width: 670rpx;
		height: 208rpx;
		border-radius: 16rpx;
		background-color: #fff;
		margin-top: 60rpx;

		.title {
			height: 76rpx;
			font-size: 26rpx;
			line-height: 76rpx;
			border-bottom: 1px solid #ddd;
			box-sizing: border-box;
			margin: 0 54rpx;
		}

		.navs {
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: center;
			.nav-item {
				width: 30%;
				.icon {
					width: 50rpx;
					height: 50rpx;
					margin-top: 20rpx;
				}
				.text {
					font-size: 26rpx;
					line-height: 40rpx;
					text-align: center;
				}
			}
		}
	}
	.list {
		width: 100%;
		margin-top: 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		text-align: center;
		padding: 30rpx 0 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 30rpx;
		.img {
			display: block;
			width: 50rpx;
			height: 50rpx;
			margin: 30rpx auto;
		}
		.items {
			width: 30%;
			padding: 20rpx 0;
			/* #ifdef MP-WEIXIN */
			padding: 5rpx 0;
			/* #endif */
		}
	}
}
</style>
