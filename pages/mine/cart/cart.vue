<template>
	<view class="cart">
		<view class="orderItems">
			<view class="center" v-for="item in cartList" :key="item.id">
				<evan-checkbox v-model="item.isChecked" @tap="getResult" primary-color="orange"></evan-checkbox>
				<image :src="item.productPic" mode=""></image>
				<view class="info">
					<view class="p1">
						<view class="name">{{ item.productName }}</view>
						<view class="price">{{ item.price }}</view>
					</view>
					<view class="p2">
						<view class="code">编号: {{ item.id }}</view>
						<view class="num">x{{ item.quantity }}</view>
					</view>
					<view class="p3">
						<!-- <uni-number-box v-model="item.quantity" :min="0" :max="12" @tap="getNum(item)"></uni-number-box> -->
						<text class="reduce" @tap="btnReduce(item)">-</text>
						<text class="text">{{ item.quantity }}</text>
						<text class="add" @tap="btnAdd(item)">+</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<evan-checkbox v-model="isAllChecked" primary-color="orange">全选</evan-checkbox>
			<view class="price">
				<view class="num">
					合计:￥
					<text>{{ total }}</text>
				</view>
				<button type="default" @tap="buy">结算</button>
			</view>
		</view>
	</view>
</template>

<script>
import { addCart, findAllCartItem, delCartItems } from '@/api/mine/cart/cart.js';
import { addPreOrder } from '@/api/category/info/index.js';
import mix from '@/mixins/index.js';
export default {
	data() {
		return {
			cartList: [],
			//vModelValue: 0,
			isChecked: true
		};
	},
	mixins: [mix],
	onLoad() {
		this.checkLogin(this.init());
	},
	computed: {
		//全选和反选按钮
		isAllChecked: {
			get() {
				//进入页面 没有列表 全选取消
				if (this.cartList.length == 0) {
					return false;
				}
				//当购物车列表每一个都被选择 则全选按钮选择
				return this.cartList.every(ele => ele.isChecked);
			},
			set(val) {
				// if(val==true){
				// 	this.cartList.forEach(ele=>{
				// 		ele.isChecked=true
				// 	})
				// }else{
				// 	this.cartList.forEach(ele=>{
				// 		ele.isChecked=false
				// 	})
				// }

				//简写
				this.cartList.forEach(ele => {
					ele.isChecked = val;
				});
			}
		},
		//计算总价
		total() {
			return this.cartList.reduce((pre, current) => {
				//上一次的价格加上当前的价格 累加
				if (current.isChecked) {
					return pre + current.price * current.quantity;
				} else {
					return pre;
				}
			}, 0);
		}
	},
	methods: {
		init() {
			findAllCartItem().then(res => {
				console.log(res);
				//添加属性 未选择
				res.data.items.forEach(ele => {
					ele.isChecked = false;
				});
				this.cartList = res.data.items;
				//this.vModelValue=res.data.items.quantity
				// 注意赋值之后 添加的新属性  这个属性不是相应式的数据
				// this.cartList.forEach(ele =>{
				// 	ele.isChecked = false
				// })
			});
		},
		//数量增添
		btnAdd(item) {
			item.quantity++;
		},
		//数量删减
		btnReduce(val) {
			var _this = this;
			console.log(val);
			if (val.quantity > 1) {
				val.quantity--;
			} else {
				uni.showModal({
					title: '是否删除该商品?',
					confirmText: '确认',
					cancelText: '取消',
					success(res) {
						if (res.confirm) {
							//点击确认 调取删除接口
							delCartItems([val.id]).then(res => {
								if (res.success) {
									uni.showToast({
										icon: 'success',
										title: '删除成功'
									});
									_this.init();
								}
							});
						} else if (res.cancel) {
							//点击取消
							_this.init();
						}
					}
				});
			}
		},
		//结算
		//注意 购物车购买 可能点击购买多个商品 这里添加order 不能直接写死
		buy() {
			var obj = {
				orderItemList: [
					//{
					// 	cartId: '',
					// 	productId: '',
					// 	productQuantity: 0,
					// 	productSkuId: ''
					//}
				]
			};
			//筛选出选择的数据
			this.cartList
				.filter(ele => ele.isChecked)
				.forEach(ele => {
					var data = { cartId: ele.id, productId: ele.productId, productQuantity: ele.quantity, productSkuId: ele.productSkuId };
					obj.orderItemList.push(data);
				});
			addPreOrder(obj).then(res => {
				console.log(res);
				if (res.success) {
					uni.showToast({
						title: '前往订单页面',
						icon: 'loading'
					});
				}
				setTimeout(function() {
					uni.navigateTo({
						url: `/pages/order/order?id=${res.data.orderId}`
					});
				}, 1000);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.cart {
	padding: 0 30rpx;
	.orderItems {
		width: 672rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		margin: 40rpx auto 0;
		color: #3e3e3e;
		.center {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 10rpx;
			background-color: #fff;
			border-radius: 24rpx;
			margin: 20rpx 0;
			image {
				padding: 0 20rpx;
				width: 150rpx;
				height: 150rpx;
				flex-shrink: 0;
			}
			.info {
				display: flex;
				flex-wrap: wrap;
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
					display: flex;
					justify-content: flex-end;
					color: #333;
					.reduce {
						width: 60rpx;
						height: 60rpx;
						background: #f1ece7;
						border-radius: 50%;
						text-align: center;
						line-height: 60rpx;
						font-size: 30rpx;
						margin: 0 6rpx;
					}
					.add {
						width: 60rpx;
						height: 60rpx;
						background: #f1ece7;
						border-radius: 50%;
						text-align: center;
						line-height: 60rpx;
						font-size: 30rpx;
						margin: 0 6rpx;
					}
					.text {
						height: 60rpx;
						background: #f1ece7;
						text-align: center;
						line-height: 60rpx;
						font-size: 30rpx;
						margin: 0 6rpx;
						width: 90rpx;
						border-radius: 30rpx;
					}
				}
			}
		}
	}
	.footer {
		position: fixed;
		display: flex;
		justify-content: space-around;
		align-items: center;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 75px;
		background-color: #fff;
		.price {
			display: flex;
			align-items: center;
			.num {
				margin-right: 20rpx;
				text {
					color: orange;
				}
			}
			button {
				font-size: 30rpx;
				width: 200rpx;
				border-radius: 24rpx;
				background-color: #354e44;
				color: #ffffff;
			}
		}
	}
}
</style>
