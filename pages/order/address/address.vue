<template>
	<view class="address">
		<view class="main">
			<view class="item" v-for="item in addressList" :key="item.id">
				<view class="row">
					<view class="left" @tap="sendMes(item)">
						<text class="name">{{ item.name }}</text>
						<text class="tel">{{ item.phoneNumber }}</text>
						<view class="city">{{ item.province }} {{ item.city }} {{ item.region }}</view>
					</view>
					<!-- 遇到外层view嵌套内层view，又同时都含有点击事件，这样就会起冲突。为了防止事件的继续传播 会用到事件修饰符.stop -->
					<view class="right">
						<view class="m-btn" v-if="item.defaultStatus">默认地址</view>
						<uni-icons type="compose" size="30" @tap="edit(item.id)"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<button @tap="goAddList" class="re-btn">新增地址</button>
	</view>
</template>

<script>
import { findAllAddress, addAddressInfo } from '@/api/order/address/address.js';
import mix from '@/mixins/index.js';
export default {
	data() {
		return {
			addressList: [],
			isChoose: false,
		};
	},
	mixins: [mix],
	onLoad(options) {
		//如果地址栏有参数 此时选择地址 回退上一页功能开启
		if (options.type == "sendMes") {
			this.isChoose = true;
		}
	},
	onShow() {
		if (this.checkLogin()) {
			findAllAddress().then(res => {
				console.log(res);
				this.addressList = res.data.items;
			});
		}
	},
	methods: {
		//选择地址 回退上一页
		sendMes(item) {
			//判断 是否需要返回上一页 只有订单页面才需要返回上一页
			if (!this.isChoose) {
				return;
			}
			uni.setStorageSync('addressInfo', item);
			uni.navigateBack({
				//关闭当前页面，返回上一页面或多级页面
				delta: 1 //返回的页面数
			});
		},
		//添加地址
		goAddList() {
			uni.navigateTo({
				url: '/pages/order/addAddress/addAddress'
			});
		},
		//修改地址
		edit(id) {
			uni.navigateTo({
				url: `/pages/order/addAddress/addAddress?addressId=${id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.address {
	width: 100%;
	height: 100%;
	.main {
		padding: 40rpx 30rpx;
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			font-size: 28rpx;
			.row {
				display: flex;
				align-items: center;
				width: 90%;
				padding: 20rpx;
				border-bottom: 1px solid #ccc;
				justify-content: space-between;
				.left {
					width: 65%;
					.name {
						font-weight: bolder;
					}
					.tel {
						margin-left: 40rpx;
					}
					.city {
						padding-top: 20rpx;
					}
				}
				.right {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.m-btn {
						font-size: 16rpx;
						background-color: #354e44;
						color: #fff;
						border-radius: 8rpx;
						height: 30rpx;
						padding: 10rpx;
						line-height: 30rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
	.re-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70%;
		height: 82rpx;
		border-radius: 2.5rem;
		background: rgb(53, 78, 68);
		color: rgb(255, 255, 255);
		margin-top: 30rpx;
		font-size: 32rpx;
		margin-top: 40rpx;
	}
}
</style>
