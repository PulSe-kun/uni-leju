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
		<view class="info">
			<view class="text">
				<view class="title">请选择退单数量:</view>
				<view class="" v-for="item in returnList.orderItems" :key="item.id">{{ item.productQuantity }}</view>
			</view>
			<view class="text">
				<view class="title">请输入退货原因:</view>
				<view class=""><input type="text" value="" /></view>
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
				<textarea value="" placeholder="请输入问题" />
			</view>
			<view class="upload">
				<view class="li1">温馨提示:</view>
				<view class="li2">上传图片总大小不能超过3m，单个文件大小不能超过1m，图片总个数不能超过3张</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getPreOrderById, getCompanyAddrss } from '@/api/mine/goodsOrder/returnOrder/returnOrder.js';

export default {
	data() {
		return {
			returnList: [],
			current: 0,
			companyList: []
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
		selectCompany(res) {
			console.log(res);
			this.current = res.detail.value;
		}
	}
};
</script>

<style lang="scss">
.returnOrder {
	padding: 0 32rpx;
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
	.info {
		.text {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			font-size: 24rpx;
			padding: 30rpx;
			background: #fff;
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
			.li {
				font-size: 24rpx;
				padding: 30rpx 0;
			}
		}
	}
}
</style>
