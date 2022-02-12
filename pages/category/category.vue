<template>
	<view class="category">
		<navigator v-if="kindList.length>0" class="block chuangyi" :url="'/pages/category/list/list?id='+kindList[0].id">
			<image class="img" :src="kindList[0].icon" mode="scaleToFill"></image>
			<view class="ctitle">{{kindList[0].name}}</view>
		</navigator>
		<navigator v-if="kindList.length>0" class="block shipin" :url="'/pages/category/list/list?id='+kindList[1].id">
			<image class="img" :src="kindList[1].icon" mode="scaleToFill"></image>
			<view class="ctitle">{{kindList[1].name}}</view>
		</navigator>
		<view class="f-d">
			<navigator v-if="kindList.length>0" class="block fengge" :url="'/pages/category/list/list?id='+kindList[2].id">
				<image class="img" :src="kindList[2].icon" mode="scaleToFill"></image>
				<view class="ctitle">{{kindList[2].name}}</view>
			</navigator>
			<navigator v-if="kindList.length>0" class="block dengju" :url="'/pages/category/list/list?id='+kindList[3].id">
				<image class="img" :src="kindList[3].icon" mode="scaleToFill"></image>
				<view class="ctitle">{{kindList[3].name}}</view>
			</navigator>
		</view>
	</view>
</template>

<script>
import { findAllCategory} from '@/api/category/index.js';
export default {
	data() {
		return {
			kindList:[],
		};
	},
	onLoad(options) {
		findAllCategory().then(res => {
			console.log(res);
			this.kindList = res.data.items[0].children;
		});
	}
};
</script>

<style lang="scss" scoped>
.category {
		.head-nav{
			box-sizing: border-box;
			.title{
				width: 100%;
				text-align: center;
				color: #fff;
			}
			.icon{
				width: 36rpx;
				height: 36rpx;
				&.icon-chat{
					margin-left: 20rpx;
				}
				&.icon-search{
					margin-right: 40rpx;
				}
			}
			
		}
		.f-d {
			width: 670rpx;
			display: flex;
			margin: 0 auto;
			margin-bottom: 48rpx;
			justify-content: space-between;
			.fengge,
			.dengju {
				width: 312rpx;
				height: 442rpx;
				background: #FAFAFA;
				box-shadow: 0 12px 20px 0 rgba(83, 66, 49, 0.03);
				border-radius: 40rpx;
			}
		}
		.block {
			position: relative;
			.img {
				position: absolute;
				right: 0;
				top: 0;
				width: 100%;
				height: 100%;
				border-radius: 40rpx;
			}
			.ctitle{
				position: absolute;
				left: 52rpx;
				top: 148rpx;
				font-size: 48rpx;
				// color: #3E3E3E;
			}
			&.chuangyi,
			&.shipin {
				width: 670rpx;
				height: 302rpx;
				background: #D5D5D5;
				box-shadow: 0 12px 20px 0 rgba(83, 66, 49, 0.05);
				border-radius: 40rpx;
				margin: 28px auto;
				.img{
					width: 40%;
					border-radius: 40rpx;
				}
			
			}
			&.shipin{
				background-color: #fff;
			}
		}

	}
</style>
