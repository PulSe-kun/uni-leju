<template>
	<view class="login">
		<view class="avatar"><image src="../../../static/image/icons/leju-logo.png" mode=""></image></view>
		<view class="write">
			<input type="text" v-model="username" placeholder="用户名/电话" />
			<input v-model="password" :password="isPassword" placeholder="密码" />
			<uni-icons class="eye" :type="isPassword ? 'eye-slash' : 'eye'" size="24" @tap="taggleIcon"></uni-icons>
		</view>
		<button :loading="loading" type="default" @tap="login" :class="{ loginBtn: isAddClass }"><view v-if="!isAddClass">登录</view></button>
		<view class="text">
			<text @tap="retrievePassword">找回密码</text>
			|
			<text @tap="register">注册账号</text>
		</view>
	</view>
</template>

<script>
import { doLogin, getMemberInfo } from '@/api/mine/login/index.js';
export default {
	data() {
		return {
			isPassword: true,
			isAddClass: false,
			loading: false,
			username: '17596496508', //用户名
			password: '123456' //密码
		};
	},
	methods: {
		//找回密码
		retrievePassword() {
			uni.navigateTo({
				url: `../password/password`
			});
		},
		//注册
		register() {
			uni.navigateTo({
				url: `../register/register`
			});
		},
		taggleIcon() {
			this.isPassword = !this.isPassword;
		},
		//登陆
		async login() {
			this.isAddClass = true;
			this.loading = true;
			var res = await doLogin({
				password: this.password,
				username: this.username
			});
			if (this.username.length == '') {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '用户名不能为空'
				});
				this.isAddClass = false;
				this.loading = false;
				return;
			}
			if (this.password.length == '') {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '密码不能为空'
				});
				this.isAddClass = false;
				this.loading = false;
				return;
			}
			console.log(res);
			if (!res.success) {
				var _this = this;
				_this.isAddClass = true;
				_this.loading = true;
				setTimeout(function() {
					_this.isAddClass = false;
					_this.loading = false;
				}, 2000);
				uni.showToast({
					icon: 'error',
					title: '登录失败,请检查用户名和密码!'
				});
				// #ifdef MP-WEIXIN
				uni.showToast({
					title: '登录失败,请检查用户名和密码',
					icon: 'none',
					duration: 800
				});
				// #endif
				return;
			}
			uni.setStorageSync('leju-token', res.data.token);
			console.log('leju-token');
			var res2 = await getMemberInfo(); //注意 请求在header中
			console.log(res);
			uni.setStorageSync('userInfo', res2.data.userInfo);
			uni.showToast({
				title: '正在前往个人中心',
				icon: 'success',
				duration: 800
			});
			// #ifdef MP-WEIXIN
			uni.showToast({
				title: '前往个人中心',
				icon: 'success',
				duration: 800
			});
			// #endif
			//定时器 0.8秒后跳转
			setTimeout(function() {
				uni.switchTab({
					url: '../mine'
				});
			}, 800);
		}
	}
};
</script>

<style lang="scss" scoped>
.login {
	width: 100%;
	.avatar {
		display: flex;
		justify-content: center;
		image {
			width: 160rpx;
			height: 160rpx;
			box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
			border-radius: 50%;
			background-color: #000;
			margin-top: 128rpx;
			margin-bottom: 72rpx;
		}
	}
	.write {
		position: relative;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 80rpx;
		input {
			width: 70%;
			height: 36rpx;
			color: #333;
			padding: 32rpx;
			margin-top: 24rpx;
			margin-bottom: 24rpx;
			border-radius: 2.5rem;
			box-shadow: 0 0 60rpx 0 rgba(43, 86, 112, 0.1);
			font-size: 28rpx;
			color: #333;
		}
		.eye {
			position: absolute;
			top: 205rpx;
			right: 120rpx;
			width: 36rpx;
			height: 36rpx;
			z-index: 888;
			/* #ifdef MP-WEIXIN */
			top: 210rpx;
			/* #endif */
		}
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80%;
		border-radius: 2.5rem;
		background: rgb(53, 78, 68);
		color: rgb(255, 255, 255);
		height: 100rpx;
	}
	.loginBtn {
		border-radius: 2.5rem;
		overflow: hidden;
		width: 100rpx;
		transition: all 0.4s cubic-bezier(0.57, 0.19, 0.51, 0.95);
	}
	.text {
		display: flex;
		text-align: center;
		letter-spacing: 8rpx;
		justify-content: center;
		align-items: center;
		padding: 60rpx;
		color: #b0b0b0;
		font-size: 30rpx;
	}
}
</style>
