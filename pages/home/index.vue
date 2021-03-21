<template>
	<view class="wrapper">
		<view class="home-tab-header">
			<view class="home-tab">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
					activeColor="#aa55ff"></uni-segmented-control>
			</view>
			<view class="iconfont icon-tubiaozhizuomoban icon"></view>
		</view>
		<view class="home-tab-content">
			<view v-show="current === 0">
				<Recommend />
			</view>
			<view v-show="current === 1">
				<Classify />
			</view>
			<view v-show="current === 2">
				<Album />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui'
	import Recommend from './compoents/Recommend/index.vue';
	import Album from './compoents/Album/index.vue';
	import Classify from './compoents/Classify/index.vue';
	export default {
		components: { 
			uniSegmentedControl,
			Recommend,
			Album,
			Classify,
		},
		data() {
			return {
				current: 0,
				items: ['推荐', '分类', '专辑']
			}
		},
		methods: {
			onClickItem(e) {
				this.current = e.currentIndex;
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		.home-tab-header {
			position: relative;
			height: 79rpx;

			.home-tab {
				width: 70%;
				margin: 0 auto;
				font-size: 24rpx;
			}

			.icon {
				position: absolute;
				top: 50%;
				transform: translateY(-60%);
				right: 3%;
				color: #aa55ff;
			}
		}
	}
</style>
