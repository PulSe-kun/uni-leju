<template>
	<view class="product">
		<view class="banner">
			<swiper class="b-swiper" :indicator-dots="true" :circular="true" :autoplay="true" :duration="500" indicator-color="#b0b0b0" indicator-active-color="#fff">
				<swiper-item v-for="item in info.skuList" :key="item.id"><image class="img" :src="item.pic" mode=""></image></swiper-item>
			</swiper>
			<view class="icon" @tap="collected"><uni-icons type="star" :color="isCollected ? '#f2270c' : '#fff'" size="30"></uni-icons></view>
		</view>
		<view class="main">
			<view class="header">
				<view class="boxs">
					<view class="price " v-if="info.promotionPrice">
						¥
						<view class="money">{{ info.promotionPrice }}</view>
						.00
					</view>
					<view class="price" :class="{ disabled: info.promotionPrice }">
						¥
						<view class="money">{{ info.price }}</view>
						.00
					</view>
					<view class="promotion-type">{{ activityText }}</view>
				</view>
				<view class="detail_title">{{ info.name }}</view>
				<view class="detail_desc">{{ info.description }}</view>
			</view>
			<mp-html :content="info.detailMobileHtml" :tag-style="htmlStyle" />
		</view>
		<view class="footer">
			<view class="service"><image src="../../../static/image/icons/kf.png" mode=""></image></view>
			<view class="btn">
				<button type="default">添加到购物车</button>
				<button type="default">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
import { productDetail } from '@/api/category/info/index.js';
export default {
	data() {
		return {
			info: {},
			//富文本插件 修改样式
			htmlStyle: {
				img: 'width:90%;display:block;margin:0 auto;height:auto'
			},
			activityText: '没有促销使用原价',
			isCollected: false
		};
	},
	onLoad(option) {
		productDetail(option.id).then(res => {
			console.log(res);
			this.info = res.data.product;
			//动态设置导航标题
			uni.setNavigationBarTitle({
				title: res.data.product.name
			});
			var collectedList = uni.getStorageSync('collected');
			if (!collectedList) {
				this.isCollected = false;
			} else {
				//先判断本都是由含有当前商品的id
				var item = collectedList.find(ele => ele == this.info.id);
				if (item) {
					//2.1
					this.isCollected = true;
				} else {
					//2.2
					this.isCollected = false;
				}
			}
		});
	},
	methods: {
		//收藏
		collected() {
			// 数据保存在本地 商品id
			//console.log('收藏');
			//注意收藏的是数组类型
			//uni 没有直接对本地数据修改的api
			//需要通过一个新的数据 再用新的数据覆盖本地的数据完成修改功能
			var collectedList = uni.getStorageSync('collected');
			// collectedList
			// 1. 本地没数据 点击之后 把数据保存在本地
			// 2. 本地有数据 可以考虑向本地塞入对应的数据
			// 2.1 如果需要收藏的已经保存在本地 点击执行取消收藏
			// 2.2 如果本地的数据中没有当前商品id 点击执行收藏操作
			if (!collectedList) {
				uni.setStorageSync('collected', [this.info.id]);
				this.isCollected = true;
				uni.showToast({
				    title: '添加收藏',
				    duration: 2000
				});
			} else {
				//先判断本都是由含有当前商品的id
				var item = collectedList.find(ele => ele == this.info.id);
				if (item) {
					//2.1
					var index = collectedList.findIndex(ele => ele == this.info.id);
					collectedList.splice(index, 1);
					uni.setStorageSync('collected', collectedList);
					this.isCollected = false;
					uni.showToast({
					    title: '取消收藏',
					    duration: 2000
					});
				} else {
					//2.2
					collectedList.push(this.info.id);
					uni.setStorageSync('collected', collectedList);
					this.isCollected = true;
					uni.showToast({
					    title: '添加收藏',
					    duration: 2000
					});
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.product {
	.banner {
		width: 100%;
		position: relative;
		.b-swiper {
			width: 100%;
			height: 634rpx;
			swiper-item {
				width: 100%;
				height: 100%;
				.img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.icon {
			position: absolute;
			width: 100rpx;
			height: 100rpx;
			top: 634rpx;
			right: 100rpx;
			margin-top: -50rpx;
			background: #354e44;
			box-shadow: 0 16px 24px 0 rgba(70, 70, 70, 0.2);
			text-align: center;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.main {
		.header {
			box-sizing: border-box;
			padding: 70rpx 68rpx;

			.detail_title {
				color: #262626;
				overflow: hidden;
				font-size: 32rpx;
				font-weight: 700;
			}

			.detail_desc {
				font-size: 24rpx;
				padding: 18px 0 0;
				line-height: 1.3;
				color: #666;
			}
			.boxs {
				display: flex;
				align-items: baseline;
			}
			.price {
				font-family: JDZH-Regular;
				font-size: 32rpx;
				line-height: 60rpx;
				color: #f2270c;
				display: flex;
				font-family: fantasy;
				align-items: baseline;
				.money {
					font-size: 60rpx;
				}
			}
			.promotion-type {
				position: relative;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				line-height: normal;
				margin-right: 6px;
				padding: 0 6px;
				border: 1px solid #ff8373;
				border-radius: 2.5px;
				height: 15px;
				color: #f2270c;
				font-size: 10px;
				color: #fff;
				background-color: #f2270c;
				border-color: #f2270c;
				margin-left: 10rpx;
			}
			.promotion-type:before {
				box-sizing: border-box;
				content: '';
				position: absolute;
				left: -1px;
				top: 50%;
				transform: translate(0, -50%);
				width: 3px;
				height: 6px;
				background-color: #fff;
				border: 1px solid #ff8373;
				border-radius: 0 3px 3px 0;
				border-left: none;
			}
			.promotion-type:after {
				box-sizing: border-box;
				content: '';
				position: absolute;
				right: -1px;
				top: 50%;
				transform: translate(0, -50%);
				width: 3px;
				height: 6px;
				background-color: #fff;
				border: 1px solid #ff8373;
				border-radius: 3px 0 0 3px;
				border-right: none;
			}
			.disabled {
				margin: 0 0 0 4rpx;
				text-decoration: line-through;
				color: #b5b5b5;
				font-size: 24rpx;
				font-weight: normal;
				.money {
					font-size: 24rpx;
					font-weight: normal;
				}
			}
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 888;
		display: flex;
		box-sizing: border-box;
		padding: 0 60rpx;
		justify-content: space-between;
		background-color: #fff;
		align-items: center;
		height: 120rpx;
		.service {
			width: 50rpx;
			height: 40rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.btn {
			width: 500rpx;
			display: flex;
			justify-content: space-around;
			button {
				font-size: 30rpx;
				width: 240rpx;
				background-color: #e2e2e2;
				&:last-child {
					background-color: #354e44;
					color: #fff;
				}
			}
		}
	}
}
</style>
