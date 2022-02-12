<template>
	<view class="kindlist">
		<view class="header">
			<view class="item" v-for="(item, index) in tabList" :key="item.name" @tap="toggle(index)">
				<view :class="index == currentIndex ? 'orange' : ''">{{ item.name }}</view>
				<view class="icon" v-if="index == 1 || index == 2">
					<uni-icons type="top" :color="item.current == 'up' ? 'orange' : ''" size="14"></uni-icons>
					<uni-icons type="bottom" :color="item.current == 'down' ? 'orange' : ''" size="14"></uni-icons>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="list" v-for="item in productList" :key="item.id" @tap="goInfo(item.id)">
				<image :src="item.pic" mode=""></image>
				<view class="name">{{ item.name }}</view>
				<view class="text">
					<text>￥{{ item.price }}</text>
					<text class="kinds">{{ item.productCategoryName }}</text>
				</view>
			</view>
		</view>
		<!-- loading加载提示处 -->
		<uni-load-more :status="status" :content-text="contentText"></uni-load-more>
	</view>
</template>

<script>
import { findProductList } from '@/api/category/list/index.js';
export default {
	data() {
		return {
			start: 1,
			limit: 4,
			productList: [],
			total: 0,
			id: '',
			currentIndex: 0, //默认下标为0 选中
			sortBy: '',
			isDesc: '',
			status: 'more', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
			contentText: {
				contentdown: '上拉加载更多~',
				contentrefresh: '正在加载更多~',
				contentnomore: '没有更多数据了~'
			},
			tabList: [
				{
					name: '新品',
					current: 'default' // default  up down 3种状态
				},
				{
					name: '销量',
					current: 'default' // default  up down
				},
				{
					name: '价格',
					current: 'default' // default  up down
				},
				{
					name: '筛选',
					current: 'default' // default  up down
				}
			]
		};
	},

	onLoad(options) {
		this.id = options.id;
		this.init();
	},
	//下拉刷新
	onPullDownRefresh() {
		console.log('refresh');
		//初始化页面数据 请求最新的数据
		this.productList = [];
		this.start = 1;
		this.init();
	},
	// 上拉加载 页面滚动到底部监听
	onReachBottom() {
		console.log('页面滚动到底部');
		//请求到最后一页数据之后 禁止上拉请求数据
		if (this.total > this.productList.length) {
			this.status = 'more';
			this.init();
			return;
		}
		this.status = 'nomore';
	},
	methods: {
		async init() {
			uni.showLoading({
				title: '加载中'
			});
			this.more = 'loading';
			var res = await findProductList(this.start, this.limit, {
				categoryId: this.id, //二级分类id ,
				isDesc: this.isDesc, //升序降序: 0默认降序; 1 升序 ,
				keywords: '', //关键词,用于搜索入口 ,
				sortBy: this.sortBy //排序的列,支持:price(价格),sale(销量),sort(排序)
			});
			//console.log(res);
			this.productList.push(...res.data.rows);
			this.start++;
			this.total = res.data.total;
			if (res.data.total <= this.productList.length) {
				this.status = 'noMore';
			} else {
				this.more = 'more';
			}
			uni.hideLoading();
			//数据获取完毕 停止当前页面的下拉刷新
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 切换点击
		toggle(index) {
			this.currentIndex = index;
			this.start = 1;
			this.productList = [];
			//重置
			this.tabList.forEach((ele, idx) => {
				//注意 重置的是非当前点击的tab栏 下标不相同就重置状态
				if (idx != index) {
					ele.current = 'default';
				}
			});
			if (this.tabList[index].current == 'default') {
				this.tabList[index].current = 'up';
				this.isDesc = 1;
			} else if (this.tabList[index].current == 'up') {
				this.tabList[index].current = 'down';
				this.isDesc = 0;
			} else {
				this.tabList[index].current = 'up';
				this.isDesc = 1;
			}
			if (index == 1) {
				this.sortBy = 'sale';
			} else if (index == 2) {
				this.sortBy = 'price';
			} else {
				this.sortBy = '';
			}
			this.init();
		},
		goInfo(id){
			uni.navigateTo({
				//注意 uni中没有动态路由
			    url: `/pages/category/info/info?id=${id}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.kindlist {
	.header {
		position: fixed;
		left: 0;
		top: 0;
		// 注意这里用到了条件编译
		/* #ifdef H5 */
		top: 84rpx;
		/* #endif */
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
		.orange {
			color: orange;
		}
		.item {
			display: flex;
			align-items: center;
			.icon {
				display: flex;
				align-items: center;
				flex-direction: column;
				line-height: 20rpx;
				margin-left: 10rpx;
			}
		}
	}

	.main {
		width: 100%;
		margin-top: 140rpx;
		overflow: hidden;
		padding: 0rpx 0rpx 50rpx;
		// width: 92%;
		// display: flex;
		// justify-content: space-between;
		// flex-wrap: wrap;
		.list {
			// width: 48%;
			// background-color: #fff;
			height: 430rpx;
			// margin: 20rpx 0;
			// border-radius: 8rpx;
			float: left;
			width: 316rpx;
			margin-left: 40rpx;
			margin-bottom: 40rpx;
			background-color: #fff;
			border-radius: 4px;
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
	.load {
	}
}
</style>
