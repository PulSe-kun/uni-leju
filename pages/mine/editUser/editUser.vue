<template>
	<view class="editUser">
		<view class="btn"><button type="default" @tap="revise">修改个人信息</button></view>
		<view class="text">
			<view class="left">头像</view>
			<view class="right ">
				<image class="avatar" :src="userInfo.icon" mode="" v-if="flag"></image>
				<view class="" v-else>
					<button type="default" @tap="uploadImg" v-if="!avatar">更换头像</button>
					<image class="avatar" :src="avatar" mode="" v-else></image>
				</view>
			</view>
		</view>
		<view class="text">
			<view class="left">用户名</view>
			<view class="right" v-if="flag">{{ userInfo.username }}</view>
			<view v-else><input type="text" class="ipt username" disabled v-model="userInfo.username" placeholder="用户名不可修改哦" /></view>
		</view>
		<view class="text">
			<view class="left">昵称</view>
			<view class="right" v-if="flag">{{ userInfo.nickname }}</view>
			<view v-else><input type="text" class="ipt" v-model="userInfo.nickname" placeholder="请输入昵称" /></view>
		</view>
		<view class="text">
			<view class="left">手机号</view>
			<view class="right" v-if="flag">{{ userInfo.phone }}</view>
			<view v-else><input type="number" class="ipt" v-model="userInfo.phone" placeholder="请输入手机号" /></view>
		</view>
		<button @tap="replace" class="re-btn" v-if="!flag">更新</button>
		<button @tap="out" class="re-btn" v-else>退出登陆</button>
	</view>
</template>

<script>
import baseUrl from '@/api/baseUrl.js';
import mix from '@/mixins/index.js';
import { updateMemberInfo } from '@/api/mine/editUser/editUser.js';
export default {
	data() {
		return {
			flag: true,
			changeAvatar: false,
			avatar: '',
			userInfo: {},
		};
	},
	mixins: [mix],
	onShow() {
		if (this.checkLogin()) {
			var userInfo = uni.getStorageSync('userInfo');
			this.userInfo = userInfo;
			console.log(this.userInfo);
		}
	},
	methods: {
		//修改用户信息
		revise() {
			this.changeAvatar = !this.changeAvatar;
			this.flag = !this.flag; //头像 显示 隐藏
		},
		//退出登陆
		out() {
			uni.clearStorageSync(); //清理本地数据缓存
			uni.showToast({
				title: '退出成功',
			});
			setTimeout(() => {
				uni.navigateTo({
					url: '../login/login'
				});
			}, 1000);
		},
		//更新信息
		replace() {
			if (this.avatar) {
				this.userInfo.icon = this.avatar;
			}
			updateMemberInfo(this.userInfo).then(res => {
				if (res.success == true) {
					uni.showToast({
						title: '更新成功,需要重新登录',
						icon :'none',
					});
					// #ifdef MP-WEIXIN
					uni.showToast({
						title: '更新成功',
					});
					// #endif
					setTimeout(() => {
						this.out();
					}, 1000);
				} else {
					uni.showToast({
						title: '更新失败'
					});
				}
			});
		},
		//上传头像
		uploadImg() {
			var _this = this; //注意 uni 调用它的api this指向就不在指向vue实例 需要提前保存一下
			uni.chooseImage({
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					console.log(res); //需要判断图片的张数
					if (res.tempFilePaths.length > 1) {
						uni.showToast({
							title: '只能选择一张哦',
							icon: 'none'
						});
						return;
					}
					var result = res.tempFilePaths[0];
					_this.avatar = result;
					uni.uploadFile({
						//注意加上基础路径
						url: baseUrl + '/lejuClient/login/uploadAvatar',
						filePath: result,
						name: 'file',
						header: {
							token: uni.getStorageSync('leju-token')
						},
						timeout: 5000,
						success: uploadFileRes => {
							console.log(uploadFileRes);
							//字符串 →对象
							_this.avatar = JSON.parse(uploadFileRes.data).data.fileUrl;
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.editUser {
	width: 100%;
	.btn {
		width: 100%;
		overflow: hidden;
		button {
			float: right;
			margin: 10px;
			font-size: 24rpx;
			color: #353535;
			background-color: rgba(0, 0, 0, 0);
			border: 1px solid #354e44;
			box-sizing: border-box;
		}
	}
	.text {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		line-height: 94rpx;
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		border-bottom: 2rpx solid #e5e5e5;
		height: 150rpx;
		.left {
			color: #494949;
		}
		.username{
			color: #a1a1a1;
		}
		.right {
			text-align: center;
			color: #a1a1a1;
			.avatar {
				display: block;
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			button {
				float: right;
				margin: 10px;
				font-size: 24rpx;
				color: #353535;
				background-color: rgba(0, 0, 0, 0);
				border: 1px solid #354e44;
				box-sizing: border-box;
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
