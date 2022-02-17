<template>
	<view class="register">
		<view class="avatar"><image :src="avatar" mode="" @tap="uploadImg"></image></view>
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item name="phone">
				<uni-easyinput
					:inputBorder="false"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					type="number"
					x
					maxlength="11"
					trim="true"
					v-model="formData.phone"
					placeholder="手机号"
				/>
			</uni-forms-item>
			<uni-forms-item name="name">
				<uni-easyinput
					:inputBorder="false"
					type="text"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					trim="true"
					v-model="formData.name"
					placeholder="请输入用户名 该用户名将用于账户登录"
				></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput
					:inputBorder="false"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					type="password"
					v-model="formData.password"
					placeholder="请输入登陆密码"
				></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="nickname">
				<uni-easyinput
					:inputBorder="false"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					type="text"
					trim="true"
					v-model="formData.nickname"
					placeholder="请输入昵称"
				></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="verification" class="verification">
				<uni-easyinput
					:inputBorder="false"
					placeholderStyle="font-size:24rpx;color:#b0b0b0"
					type="number"
					v-model="formData.verification"
					placeholder="请输入验证码"
				></uni-easyinput>
				<view class="r-code" v-if="showText == true" @tap="sendCode">获取验证码</view>
				<view v-else class="r-code">{{ second }}s 重新发送</view>
			</uni-forms-item>
		</uni-forms>
		<button @tap="submit" class="re-btn">注册</button>
		<view class="footer">
			<checkbox-group  @change="handleRadio">
				<label>
					<checkbox value="r1" color="orange" style="transform:scale(0.7)" :checked="isRadio" />
					同意《协议》
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
import baseUrl from '../../../api/baseUrl.js';
import { register } from '../../../api/mine/register/register.js';
export default {
	data() {
		return {
			//单选
			isRadio: true,
			//倒计时
			second: 30,
			showText: true,
			//头像
			avatar: '../../../static/image/icons/leju-logo.png',
			// 表单数据
			formData: {
				phone: '', //手机号
				name: '', //用户名
				nickname: '', //昵称
				password: '', //密码
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
							minLength: 2,
							maxLength: 10,
							errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
						}
						// {
						// 	pattern: '^[a-zA-Z0-9_-]{2,10}$',
						// 	errorMessage: '注意用户名 2到10位（字母，数字，下划线，减号）'
						// }
					]
				},
				// 对phone字段进行必填验证
				phone: {
					rules: [
						{
							required: true,
							errorMessage: '请输入手机号'
						},
						{
							pattern: '^[1]([3-9])[0-9]{9}$',
							errorMessage: '请输入正确的手机号'
						}
					]
				},
				// 对nickname字段进行必填验证
				nickname: {
					rules: [
						{
							required: true,
							errorMessage: '请输入昵称'
						},
						{
							pattern: '^[\\u4E00-\\u9FA5A-Za-z0-9]{2,20}$',
							errorMessage: '注意昵称 中文、英文、数字但不包括下划线等符号'
						}
					]
				},
				// 对password字段进行必填验证
				password: {
					rules: [
						{
							required: true,
							errorMessage: '请输入密码'
						},
						{
							pattern: '^[a-zA-Z]\\w{5,17}$',
							errorMessage: '以字母开头，长度在6~18之间'
						}
					]
				},
				// 对verification字段进行必填验证
				verification: {
					rules: [
						{
							required: true,
							errorMessage: '请输入验证码'
						},
						{
							format: 'number	',
							errorMessage: '验证码错误'
						}
					]
				}
			}
		};
	},
	onLoad() {},
	methods: {
		//发送验证码 倒计时
		sendCode() {
			this.showText = false;
			var interval = setInterval(() => {
				let times = --this.second;
				this.second = times < 10 ? '0' + times : times; //小于10秒补 0
			}, 1000);
			setTimeout(() => {
				clearInterval(interval);
				this.second = 30;
				this.showText = true;
			}, 30000);
		},
		//协议单选处理
		handleRadio(e) {
			console.log(e)
			this.scode=e.detail.value.length
			this.isRadio = !this.isRadio;
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
		},
		//提交表单
		submit() {
			if (this.scode == 0) {
				uni.showToast({
					icon: 'none',
					//position: 'bottom',
					title: '请先同意《协议》'
				});
				return false;
			}
			this.$refs.form
				.validate()
				.then(res => {
					console.log('表单数据信息：', res);
					var newUser = {
						birthday: '',
						city: '',
						email: '',
						growth: 0,
						historyIntegration: 0,
						icon: this.avatar,
						id: '',
						integration: 0,
						isDisabled: 0,
						memberLevelId: '',
						nickname: this.formData.nickname,
						password: this.formData.password,
						personalizedSignature: '',
						phone: this.formData.phone,
						realname: '',
						sex: 0,
						sourceType: 0,
						status: 1, //帐号启用状态:0->禁用；1->启用 ,
						username: this.formData.name,
						wxOpenId: ''
					};
					register(newUser).then(res => {
						console.log(res);
						if (res.success == true) {
							uni.showToast({
								title: '注册成功!'
							});
							setTimeout(() => {
								uni.redirectTo({
									//当前页面出栈 跳转之后的页面入栈
									url: '/pages/mine/login/login'
								});
							}, 1000);
						}
					});
				})
				.catch(err => {
					console.log('表单错误信息：', err);
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
	.verification {
		position: relative;
		.r-code {
			position: absolute;
			top: 20%;
			right: 40rpx;
			font-size: 20rpx;
			z-index: 999;
		}
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
	/* #ifdef MP-WEIXIN */
	::v-deep .wx-checkbox-input {
		border-radius: 50%;
	}
	/* #endif */
}
</style>
