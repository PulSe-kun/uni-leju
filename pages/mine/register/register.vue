<template>
	<view class="register">
		<view class="avatar" @tap="uploadImg"><image :src="avatar" mode=""></image></view>
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item>
				<uni-easyinput
					:inputBorder="false"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					type="text"
					maxlength="11"
					trim="true"
					v-model="formData.phone"
					placeholder="手机号"
				/>
			</uni-forms-item>
			<uni-forms-item>
				<uni-easyinput
					:inputBorder="false"
					type="text"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					trim="true"
					v-model="formData.name"
					placeholder="请输入用户名 该用户名将用于账户登录"
				></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item>
				<uni-easyinput
					:inputBorder="false"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					type="password"
					v-model="formData.password"
					placeholder="请输入登陆密码"
				></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item>
				<uni-easyinput
					:inputBorder="false"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					type="text"
					trim="true"
					v-model="formData.nickname"
					placeholder="请输入昵称"
				></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item>
				<uni-easyinput
					:inputBorder="false"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					type="text"
					v-model="formData.verification"
					placeholder="请输入验证码"
				></uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<button @click="submit" class="re-btn">注册</button>
		<view class="footer">
			<checkbox value="cb" color="orange" style="transform:scale(0.7)" />
			同意《协议》
		</view>
	</view>
</template>

<script>
import baseUrl from '../../../api/baseUrl.js';
import register from '../../../api/mine/register/register.js'
export default {
	data() {
		return {
			//头像
			avatar: '../../../static/image/icons/leju-logo.png',
			// 表单数据
			formData: {
				phone: '',
				name: '',
				nickname: '', //昵称
				password: '',
				verification: '' //验证码
			},
			rules: {
				// 对name字段进行必填验证
				name: {
					rules: [
						{
							required: true,
							errorMessage: '请输入姓名'
						},
						{
							minLength: 3,
							maxLength: 5,
							errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
						}
					]
				},
				// 对email字段进行必填验证
				email: {
					rules: [
						{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址'
						}
					]
				}
			}
		};
	},
	methods: {
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
						url: baseUrl+'/lejuClient/login/uploadAvatar',
						filePath: result,
						name: 'file',
						header: {
							token:uni.getStorageSync("leju-token")
						},
						timeout:5000,
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
.register {
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
			margin-top: 80rpx;
			margin-bottom: 72rpx;
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
	.footer {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}
	::v-deep .uni-easyinput {
		border-radius: 2.5rem;
		box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
	}
	::v-deep .uni-forms-item {
		padding-left: 70rpx;
		padding-right: 70rpx;
	}
	::v-deep .uni-easyinput__content {
		height: 90rpx;
	}
	::v-deep .uni-checkbox-input {
		border-radius: 50%;
	}
}
</style>
