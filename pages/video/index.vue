<template>
	<view class="wrapper" scroll-y @scrolltolower="scrolltolower">
		<view class="header-b">
			<view class="b-box">
				<text v-for="(item,i) in list" :key="item.id" :class="{active:i === current}"
					@click="changeCurrent(i)">{{ item.value}}</text>
			</view>
		</view>
		<view class="video-wrapper">
			<view class="video-box" v-for="(item,i) in videoList" :key="item.id">
				<view class="v-title">
					{{ item.name }}
				</view>
				<!-- <video :src="item.video" controls></video> -->
				<view class="v-box">
					<MyVideo :src="item.video" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import apis from './api.js';
	import MyVideo from '../../compoents/video/index.vue';
	export default {
		components: {
			MyVideo
		},
		data() {
			return {
				limit: 5,
				skip: 0,
				order: 'hot',
				type: 'recommend', // 请求哪个接口
				current: 0,
				list: [{
						id: 0,
						value: '推荐'
					},
					{
						id: 1,
						value: '娱乐'
					},
					{
						id: 2,
						value: '最新'
					},
					{
						id: 3,
						value: '热门'
					}
				],
				videoList: []
			}
		},
		created() {
			this.getData()
		},
		methods: {
			changeCurrent(i) {
				if (i === 0) {
					this.type = 'recommend';
					this.videoList = [];
					this.getData();
				} else if (i === 1) {
					this.type = 'entertainment';
					this.order = 'new';
					this.videoList = [];
					this.getData();
				} else if (i === 2) {
					this.type = 'newest'
					this.order = 'new'
					this.videoList = [];
					this.getData();
				} else if (i === 3) {
					this.type = 'hot';
					this.videoList = [];
					this.getData();
				}
				this.current = i;
			},
			async getData() {
				const {
					limit,
					skip,
					order
				} = this;
				const res = await this.request({
					url: apis[this.type],
					data: {
						limit,
						skip,
						order
					}
				})
				console.log(res)
				this.videoList = [...this.videoList, ...res.res.videowp]
			},
			scrolltolower() {
				console.log('sss')
				this.skip = this.skip + this.limit;
				this.getData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: calc(100vh - 3rpx);

		.header-b {
			width: 100%;
			display: flex;
			justify-content: center;

			.b-box {
				padding: 20rpx 0;

				text {
					font-size: 30rpx;
					padding: 0 30rpx;
				}

				text.active {
					font-size: 38rpx;
					color: #ff007f;
				}
			}
		}

		.video-wrapper {
			display: flex;
			flex-direction: column;

			.video-box {
				width: 100%;
				margin-bottom: 100rpx;
				height: 1010rpx;

				.v-title {
					font-size: 35rpx;
					border-top: 45rpx solid #eee;
					color: #666;
					padding-left: 15rpx;
					padding-bottom: 10rpx;
				}

				.v-box {
					width: 100%;
					height: 900rpx;
				}
			}
		}
	}
</style>
