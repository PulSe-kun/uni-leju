<template>
	<view class="home">
		<!-- 顶部 -->
		<view class="header">
			<view class="left"><image class="icon" src="/static/image/icons/chat.png" mode=""></image></view>
			<view class="info"></view>
			<view class="right">
				<image class="icon" src="/static/image/icons/search.png" mode=""></image>
				<image class="icon" src="/static/image/icons/cart.png" mode=""></image>
			</view>
		</view>
		<!-- 轮播 -->
		<view class="banner">
			<swiper :indicator-dots="true" :circular="true" :autoplay="true" :duration="500" indicator-color="#b0b0b0" indicator-active-color="#fff">
				<swiper-item v-for="item in bannerList" :key="item.id"><image class="img" :src="item.pic" mode=""></image></swiper-item>
			</swiper>
		</view>
		<!-- 种类列表 -->
		<view class="kind">
			<view class="items" v-for="item in kindsList" :key="item.id" @tap="goList(item.id)">
				<image class="img" :src="item.icon" mode="aspectFill"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 限时活动 -->
		<view class="notify">
			<view class="box">
				<uni-icons type="sound" size="30" color="orange"></uni-icons>
				<text class="activity">限时活动:</text>
				<swiper class="rem-swiper" :circular="true" :autoplay="true" :vertical="true" :duration="500">
					<swiper-item v-for="item in recommendList" :key="item.id">
						<view class="items">
						 <view class="">
						 	{{ item.brandName }}
						 </view>	
							<view class="show">
								<text class="price">原价:{{ item.price }}</text>
								<text class="newprice" style="color: red;">现价￥{{ item.promotionPrice }}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 热门推荐 -->
		<view class="hot">
			<view class="title">热门推荐</view>
			<view class="list">
				<swiper class="scroll-series" :display-multiple-items="2" :circular="true" :autoplay="true" :interval="3000" easing-function="linear" :duration="3000">
					<swiper-item class="series-block" v-for="item in hotList" :key="item.id">
						<image class="img" :src="item.pic" mode=""></image>
						<view class="name">{{ item.brandName }}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 新品推荐 -->
		<view class="new">
			<view class="title">新品推荐</view>
			<view class="content">
				<view class="card" v-for="item in newList" :key="item.id">
					<image class="img" :src="item.pic" mode=""></image>
					<view class="text">
						<view class="name">{{ item.name }}</view>
						<view class="price">{{ item.price }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="like">
			<view class="title">猜你喜欢</view>
			<view class="main">
				<view class="list" v-for="item in newList" :key="item.id">
					<image :src="item.pic" mode=""></image>
					<view class="name">{{ item.name }}</view>
					<view class="text">
						<text>￥{{ item.price }}</text>
						<text class="kinds">{{ item.productCategoryName }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { bannerAds, findCategory, recommendList, hotList, lejuLatestProducts } from '@/api/home/index.js';
export default {
	data() {
		return {
			bannerList: [],
			kindsList: {},
			recommendList: [],
			hotList: [],
			newList: []
		};
	},
	// 推荐使用  获取页面初始数据  可以通过options 获取上个页面传递的参数  /home?id=1
	onLoad(options) {
		bannerAds().then(res => {
			console.log(res);
			this.bannerList = res.data.items;
		});
		findCategory('1308336521604599809').then(res => {
			console.log(res);
			this.kindsList = res.data.category.children;
			//console.log(this.kindsList);
		});
		recommendList().then(res => {
			console.log(res);
			this.recommendList = res.data.items;
		});
		hotList().then(res => {
			console.log(res);
			this.hotList = res.data.items;
		});
		lejuLatestProducts().then(res => {
			console.log(res);
			this.newList = res.data.productList;
		});
	},
	methods:{
		goList(id){
			uni.navigateTo({
				//注意 uni中没有动态路由
			    url: `../category/list/list?id=${id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	width: 750rpx;
	.header {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 9999;
		padding: 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		box-sizing: border-box;
		.left {
			width: 30%;
		}
		.icon {
			display: block;
			width: 42rpx;
			height: 42rpx;
		}
		.info {
			width: 30%;
			display: flex;
			justify-content: space-between;
			font-size: 32rpx;
			color: #fff;
			text-align: center;
		}
		.right {
			width: 30%;
			display: flex;
			justify-content: flex-end;
			image:first-child {
				margin-right: 20px;
			}
		}
	}

	.banner {
		width: 100%;
		height: 362rpx;
		swiper {
			width: 100%;
			height: 362rpx;
			swiper-item {
				border-radius: 0 0 30rpx 30rpx;
				height: 100%;
				.img {
					display: block;
					width: 100%;
				}
			}
		}
	}
	.kind {
		width: 100%;
		margin: 60rpx auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.items {
			width: 120rpx;
			text-align: center;

			.img {
				display: block;
				width: 80rpx;
				height: 80rpx;
				border-radius: 8rpx;
				margin: 0 auto;
				margin-bottom: 10rpx;
			}
			text {
				font-size: 30rpx;
				color: #3e3e3e;
			}
		}
	}
	.notify .box {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 670rpx;
		height: 96rpx;
		margin: 40rpx auto;
		background-color: #fff;
		font-size: 28rpx;
		color: #3e3e3e;
		line-height: 96rpx;
		// text-indent: 1em;
		font-weight: bold;
		::v-deep .uni-icons {
			margin-left: 30rpx !important;
			vertical-align: bottom;
		}
		.activity {
			margin-left: 15rpx;
			color: orange;
		}
		.rem-swiper {
			flex: 1;
			height: 48px;
			.items {
				display: flex;
				justify-content: space-around;
				.show{
					.price{
						display: block;
						color: #b0b0b0;
						font-size: 18rpx;
						text-decoration: line-through;
						line-height: 60rpx;
					}
					.newprice{
						display: block;
						color: red;
						font-size: 18rpx;
						line-height: 20rpx;
					}
				}
				
			}
		}
	}
	.hot {
		padding: 0 30rpx;
		.title {
			padding: 30rpx 0;
			font-size: 32rpx;
			color: #3e3e3e;
			letter-spacing: 2rpx;
			font-weight: 600;
		}
		.list {
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			.scroll-series {
				width: 100%;
				white-space: nowrap;
				display: flex;
				align-items: center;
				.series-block {
					display: inline-block;
					margin: 0 20rpx;
					width: 208rpx;
					.img {
						width: 90%;
						height: 80%;
					}
					.name {
						font-size: 26rpx;
						line-height: 38rpx;
						color: #3e3e3e;
						text-align: center;
						margin-top: 20rpx;
						font-weight: 600;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
	.new {
		padding: 0 30rpx;

		.title {
			padding: 30rpx 0;
			font-size: 32rpx;
			color: #3e3e3e;
			letter-spacing: 2rpx;
			font-weight: 600;
		}
		.content {
			width: 100%;
			height: 100%;
			white-space: nowrap;
			overflow: auto;
			.card {
				width: 600rpx;
				display: inline-block;
				margin-right: 20px;
				position: relative;
				.img {
					position: absolute;
					left: 44rpx;
					top: 0;
					bottom: 0;
					width: 194rpx;
					height: 168rpx;
					border-radius: 8rpx;
					margin: auto;
				}
				.text {
					padding-left: 270rpx;
					padding-top: 50rpx;
					padding-bottom: 50rpx;
					height: 160rpx;
					background: #fff;
					border-radius: 20rpx;
					.name {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.price {
						margin-top: 60rpx;
					}
				}
			}
		}
	}
	.like {
		padding: 0 30rpx;
		.title {
			padding: 30rpx 0;
			font-size: 32rpx;
			color: #3e3e3e;
			letter-spacing: 2rpx;
			font-weight: 600;
		}
		.main {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.list {
				width: 48%;
				background-color: #fff;
				height: 418rpx;
				margin: 20rpx 0;
				border-radius: 8rpx;
				image {
					width: 100%;
					display: block;
					height: 238rpx;
					border-radius: 8rpx;
				}
				.name {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 24rpx;
					font-weight: bold;
					padding: 30rpx 0;
					margin-left: 30rpx;
					margin-bottom: 20rpx;
				}
				.text {
					margin-left: 30rpx;
					font-size: 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.kinds {
					margin-right: 30rpx;
				}
			}
		}
	}
}
</style>
