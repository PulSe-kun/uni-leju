<template>
	<view class="password">
		<view class="info">若你忘记了密码，可在此重置新密码。</view>
		<view class="write">
			<input type="text" v-model="username" placeholder="用户名/电话" />
			<input v-model="password" :password="isPassword" placeholder="密码" />
			<uni-icons class="eye" :type="isPassword ? 'eye-slash' : 'eye'" size="40rpx" @tap="taggleIcon"></uni-icons>
			<input type="text" v-model="username" placeholder="验证码" />
		</view>
		<button @click="submit" class="re-btn">重置密码</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isPassword: true,
			username: '', //用户名
			password: '' //密码
		};
	},
	methods: {
		taggleIcon() {
			this.isPassword = !this.isPassword;
		},
	}
};
</script>

<style lang="scss" scoped>
.password {
	.info {
		width: 500rpx;
		color: #999;
		font-size: 28rpx;
		margin: 0 auto;
		padding: 60rpx;
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
			top: 210rpx;
			right: 120rpx;
			width: 36rpx;
			height: 36rpx;
			z-index: 888;
			/* #ifdef MP-WEIXIN */
			top: 215rpx;
			/* #endif */
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
	}
}
</style>
