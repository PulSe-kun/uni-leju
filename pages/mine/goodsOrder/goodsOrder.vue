<template>
	<view class="goodsOrder">
		<view class="header">
			<view class="nav" v-for="(item, index) in tabList" :key="item.name" @tap="toggle(index)" :class="{ orange: index == currentIndex }">{{ item.name }}</view>
		</view>
		<view class="main" v-if="currentIndex != 4">
			<view class="orderItems" v-for="item in list" :key="item.id" v-if="orderList.length > 0">
				<view class="title">
					<text>订单编号:{{ item.order.orderSn }}</text>
					<text class="wait">{{ item.order.status | statusText }}</text>
				</view>
				<view class="center" v-for="goods in item.items" :key="goods.id">
					<image :src="goods.productPic" mode=""></image>
					<view class="info">
						<view class="p1">
							<view class="name">{{ goods.productName }}</view>
							<view class="price">{{ goods.productPrice }}</view>
						</view>
						<view class="p2">
							<view class="code">编号: {{ goods.productSkuCode }}</view>
							<view class="num">x{{ goods.productQuantity }}</view>
						</view>
						<view class="p3">规格: {{ goods.productAttr | filterGoods }}</view>
						<view class="p4">
							<navigator v-if="currentIndex == 2" :url="`./returnOrder/returnOrder?id=${goods.orderId}`">退货</navigator>
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="info">
						<view class="time">时间: {{ item.order.createTime }}</view>
						<view class="totalPrice">合计: {{ item.order.totalAmount }}</view>
					</view>
					<view class="btnBox" v-if="currentIndex == 0">
						<view class="btn" type="default" @tap="noPay(item.order.id)">取消订单</view>
						<view class="btn" type="default" @tap="goPay(item)">确认付款</view>
					</view>
					<view class="btnBox" v-if="currentIndex == 2"><view class="btn" @tap="confirm(item)">确认收货</view></view>
					<view class="btnBox" v-if="currentIndex == 3"><view class="btn" @tap="del(item)">删除订单</view></view>
				</view>
			</view>
			<view v-if="orderList.length <= 0">暂无订单数据</view>
		</view>
		<view class="main" v-else>
			<view class="orderItems" v-for="item in orderList" :key="item.id" v-if="orderList.length > 0">
				<view class="title">
					<text>订单编号:{{ item.order.orderSn }}</text>
					<text class="wait" :style="{ color: item.status == 2 || item.status == 3 ? 'red' : '' }">{{ item.order.status | orderProcessText }}</text>
				</view>
				<view class="center" v-for="goods in item.items" :key="goods.id">
					<image :src="goods.productPic" mode=""></image>
					<view class="info">
						<view class="p1">
							<view class="name">{{ goods.productName }}</view>
							<view class="price">{{ goods.productPrice }}</view>
						</view>
						<view class="p2">
							<view class="code">编号: {{ goods.productSkuCode }}</view>
							<view class="num">x{{ goods.productQuantity }}</view>
						</view>
						<view class="p3">规格: {{ goods.productAttr | filterGoods }}</view>
					</view>
				</view>
				<view class="footer">
					<view class="info">
						<view class="time">时间: {{ item.order.createTime }}</view>
						<view class="totalPrice">合计: {{ item.order.totalAmount }}</view>
					</view>
				</view>
			</view>
			<view v-if="orderList.length <= 0">暂无订单数据</view>
		</view>
	</view>
</template>

<script>
import { findAllOrders, cancelOrder, receiveDone, _clearOrderFocus, orderReturnApplys } from '@/api/mine/goodsOrder/goodsOrder.js';
export default {
	data() {
		return {
			orderList: [],
			returnList: [],
			currentIndex: 0, //默认显示下标0
			tabList: [
				{
					name: '待付款'
				},
				{
					name: '已付款'
				},
				{
					name: '已发货'
				},
				{
					name: '已收货'
				},
				{
					name: '售后'
				}
			]
		};
	},
	onLoad() {
		this.init();
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
		},
		orderProcessText(process) {
			var text = '等待处理';
			switch (JSON.stringify(process)) {
				case '0':
					text = '等待处理';
					break;
				case '1':
					text = '确认退货,待用户寄回';
					break;
				case '2':
					text = '已退款';
					break;
				case '3':
					text = '已拒绝';
					break;
				case '9':
					text = '拒绝退货';
					break;

				default:
					break;
			}
			return text;
		},
		statusText(val) {
			if (val == 0) {
				return '未付款';
			} else if (val == 1) {
				return '已付款,等待发货';
			} else if (val == 2) {
				return '已发货';
			} else if (val == 3) {
				return '已收货';
			} else if (val == 4) {
				return '已退单';
			} else {
				return '无效订单';
			}
		}
	},
	computed: {
		list() {
			return this.orderList.filter((ele, index) => {
				if (this.currentIndex == 3) {
					return ele.order.status == 3 || ele.order.status == 4;
				}
				return ele.order.status == this.currentIndex;
			});
		}
	},
	methods: {
		init() {
			findAllOrders().then(res => {
				console.log(res);
				this.orderList = res.data.orderList;
			});
			orderReturnApplys().then(res => {
				console.log(res);
				this.returnList = res.data.items;
			});
		},
		toggle(index) {
			this.currentIndex = index;
		},
		//确认付款
		goPay(val) {
			console.log(val);
			uni.navigateTo({
				url: `/pages/order/pay/pay?orderId=${val.order.id}`
			});
		},
		//取消订单 注意这里只是订单变成无效订单 没有删除订单
		noPay(orderId) {
			cancelOrder(orderId).then(res => {
				if (res.success) {
					uni.showToast({
						title: '取消订单成功!',
						duration: 1000
					});
					this.init();
				}
			});
		},
		//确认收货
		confirm(item) {
			receiveDone({
				orderId: item.order.id
			}).then(res => {
				if (res.success) {
					uni.showToast({
						title: '确认收货成功!',
						duration: 1000
					});
					this.init();
				}
			});
		},
		//删除订单
		del(item) {
			_clearOrderFocus(item.order.id).then(res => {
				if (res.success) {
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(function() {
						uni.hideLoading();
					}, 800);
					this.init();
				}
			});
		}
	}
};
</script>

<style lang="scss">
.goodsOrder {
	.header {
		position: fixed;
		left: 0;
		//自定义导航栏高度
		top: var(--window-top);
		width: 100%;
		height: 62rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #354e44;
		color: #fff;
		font-size: 30rpx;
		line-height: 62rpx;
		z-index: 999;
	}
	.orange {
		color: orange;
	}
	.main {
		padding-top: 100rpx;
		.orderItems {
			width: 672rpx;
			box-sizing: border-box;
			padding: 30rpx;
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
				font-size: 20rpx;
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
					margin-left: 28rpx;
					align-items: center;
					color: #8d8d8d;
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
					.p4{
						width: 100%;
						font-weight: bolder;
						color: #333;
						font-size: 28rpx;
						overflow: hidden;
						uni-navigator{
							float: right;
							text-decoration: underline;
						}
					}
				}
			}
			.footer {
				.btnBox {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.btn {
						width: 124rpx;
						height: 50rpx;
						border: 2rpx solid #2d4f43;
						font-size: 26rpx;
						border-radius: 10rpx;
						color: #2d4f43;
						text-align: center;
						line-height: 50rpx;
						margin-left: 40rpx;
					}
				}
				.info {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.totalPrice {
						font-size: 26rpx;
						line-height: 36rpx;
						text-align: right;
						margin-top: 14rpx;
						margin-bottom: 20rpx;
					}
				}
			}
		}
	}
}
</style>
