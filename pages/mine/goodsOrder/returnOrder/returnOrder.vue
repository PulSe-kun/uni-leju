<template>
	<view class="returnOrder">
		<view class="orderItems">
			<view class="title">
				<text v-if="returnList.orderBase">订单编号:{{ returnList.orderBase.orderSn }}</text>
			</view>
			<view class="center" v-for="item in returnList.orderItems" :key="item.id">
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
				<view class="totalPrice" v-for="item in returnList.orderItems" :key="item.id">合计: ￥{{ item.totalPrice }}</view>
			</view>
		</view>
		<view class="info-card">
			<view class="text">
				<view class="title">请选择退单数量:</view>
				<view class=""><uni-number-box v-model="returnNum"></uni-number-box></view>
			</view>
			<view class="text">
				<view class="title">请输入退货原因:</view>
				<view class=""><input type="text" value="" v-model="returnReason" :min="1" :max="9" /></view>
			</view>
			<view class="text">
				<view class="title">请输入退货地址:</view>
				<view class="">
					<picker mode="selector" :range="companyList" range-key="addressName" @change="selectCompany">
						<view>{{ companyList.length > 0 && companyList[current].addressName }}</view>
					</picker>
				</view>
			</view>
			<view class="text write">
				<view class="title">请输入问题描述:</view>
				<textarea value="" placeholder="请输入问题" v-model="descProblem" />
			</view>
			<view class="upload">
				<view class="li">温馨提示:</view>
				<view class="li">上传图片总大小不能超过3m，单个文件大小不能超过1m，图片总个数不能超过3张</view>
				<view class="img">
					<view class="icon">
						<uni-icons type="plusempty" size="50rpx" @tap="upImg"></uni-icons>
						<view class="info">上传图片</view>
					</view>
					<view class="box" v-for="(item, indx) in imgList">
						<image :src="item.path" mode=""></image>
						<image class="x-btn" src="/static/image/icons/fail.png" mode="" @tap="delImg(item)"></image>
					</view>
				</view>
			</view>
		</view>
		<button type="default" @tap="submit" class="btn">提交</button>
	</view>
</template>

<script>
import { getPreOrderById, getCompanyAddrss, uploadImg, addOrderReturnApply } from '@/api/mine/goodsOrder/returnOrder/returnOrder.js';
import baseUrl from '@/api/baseUrl.js';
export default {
	data() {
		return {
			returnList: [],
			current: 0,
			companyList: [],
			imgList: [],
			descProblem: '', //请输入问题描述
			returnReason: '', //退货原因
			returnNum: 1
		};
	},
	onLoad(option) {
		getPreOrderById(option.id).then(res => {
			console.log(res);
			this.returnList = res.data;
		});
		getCompanyAddrss().then(res => {
			console.log(res);
			this.companyList = res.data.items;
		});
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
		//获取地址详情
		selectCompany(res) {
			console.log(res);
			this.current = res.detail.value;
		},
		//上传图片
		upImg() {
			var _this = this;
			uni.chooseImage({
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					console.log(res);
					if (res.tempFilePaths.length > 3) {
						uni.showToast({
							title: '一次最多允许上传3张哦'
						});
						return;
					}
					var item = res.tempFilePaths.find(ele => ele.size > 1024 * 1024);
					if (item) {
						uni.showToast({
							title: '选择的图片大小超出1m，请重新上传',
							icon: 'none'
						});
						return;
					}
					//这里注意 多次点击上传 但前后相加不能超过三
					if (_this.imgList.length + res.tempFiles.length > 3) {
						uni.showToast({
							title: '选择的图片总数量超出三张，请重新上传',
							icon: 'none'
						});
						return;
					}
					_this.imgList.push(...res.tempFiles);
				}
			});
		},
		//提交
		submit() {
			if (this.returnNum == 0) {
				uni.showToast({
					title: '退单数量不能为0!',
					icon: 'none'
				});
				return;
			}
			var arr = [];
			this.imgList.forEach(ele => {
				//注意 异步 需要用到promise
				var pro = new Promise((resolve, rejeted) => {
					uni.uploadFile({
						url: baseUrl + '/lejuClient/orderReturn/uploadImg',
						filePath: ele.path,
						name: 'file',
						header: {
							token: uni.getStorageSync('leju-token')
						},
						success(res) {
							console.log(res);
							resolve(JSON.parse(res.data).data.fileUrl);
						}
					});
				});
				arr.push(pro);
			});
			console.log(arr);
			const p = Promise.all(arr); //多个实例包装成新的实例
			p.then(res => {
				console.log(res);
				var obj = {
					companyAddressId: this.companyList[this.current].id,
					count: this.returnNum,
					description: this.descProblem,
					orderId: this.returnList.orderBase.id,
					orderItemId: this.returnList.orderItems[0].id,
					proofPics: res.join(','),
					reason: this.returnReason
				};
				addOrderReturnApply(obj).then(res => {
					if (res.success == true) {
						uni.showToast({
							title: '申请退货成功!'
						});
						uni.navigateTo({
							url: '/pages/mine/goodsOrder/goodsOrder'
						});
					}
				});
			});
		},
		//删除图片
		delImg(val) {
			var index = this.imgList.findIndex(ele => ele == val);
			this.imgList.splice(index, 1);
		}
	}
};
</script>

<style lang="scss" scoped>
.returnOrder {
	padding: 20rpx 32rpx 100rpx;
	.orderItems {
		width: 672rpx;
		box-sizing: border-box;
		padding: 36rpx 20rpx;
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
				align-items: center;
				color: #8d8d8d;
				margin-left: 20rpx;

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
			.totalPrice {
				font-size: 26rpx;
				line-height: 36rpx;
				text-align: right;
				margin-top: 14rpx;
			}
		}
	}
	.info-card {
		border-radius: 24rpx;
		background: #fff;
		.text {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			font-size: 24rpx;
			padding: 30rpx;
			border-bottom: 2rpx solid #f1ece7;
			.title {
				font-size: 24rpx;
			}
		}
		.write {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			font-size: 24rpx;
			padding: 30rpx;
			background: #fff;
			border-bottom: 2rpx solid #f1ece7;
			uni-textarea {
				width: 50%;
				font-size: 24rpx;
			}
		}
		.upload {
			background-color: #fff;
			padding: 30rpx;
			.li {
				font-size: 24rpx;
				padding: 10rpx 0;
			}
			.img {
				display: flex;
				align-items: center;
				.icon {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;
					flex-direction: column;
					font-size: 20rpx;
					color: #666;
					width: 120rpx;
					height: 120rpx;
					.info {
						font-size: 24rpx;
						line-height: 48rpx;
					}
				}
				.box {
					width: 120rpx;
					height: 120rpx;
					background: rgba(0, 0, 0, 0.1);
					border-radius: 8rpx;
					margin-left: 20rpx;
					position: relative;
					image {
						width: 100%;
						height: 100%;
					}
					.x-btn {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
						width: 34rpx;
						height: 34rpx;
					}
				}
			}
		}
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60%;
		height: 80rpx;
		border-radius: 2.5rem;
		background: rgb(53, 78, 68);
		color: rgb(255, 255, 255);
		margin-top: 50rpx;
		font-size: 32rpx;
	}
}
</style>
