<template>
	<view class="address">
		<view class="main">
			<view class="item" v-for="item in addressList" :key="item.id" @tap="sendMes(item)">
				<view class="row">
					<view class="left">
						<text class="name">{{ item.name }}</text>
						<text class="tel">{{ item.phoneNumber }}</text>
						<view class="city">{{ item.province }} {{ item.city }} {{ item.region }}</view>
					</view>
					<view class="right"><uni-icons type="compose" size="60rpx"></uni-icons></view>
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
			addressList: []
		};
	},
	mixins: [mix],
	onLoad() {
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
			uni.setStorageSync('addressInfo', item);
			uni.navigateBack({
				//关闭当前页面，返回上一页面或多级页面
				delta: 1 //返回的页面数
			});
		},
		goAddList() {
			uni.navigateTo({
			    url: '/pages/order/addAddress/addAddress'
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
				padding: 10px 0;
				border-bottom: 1px solid #ccc;
				margin: 0 auto;
				.left {
					width: 100%;
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
				}
			}
		}
	}
	.re-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60%;
		height: 80rpx;
		border-radius: 2.5rem;
		background: rgb(53, 78, 68);
		color: rgb(255, 255, 255);
		margin-top: 30rpx;
		font-size: 30rpx;
	}
}
</style>
