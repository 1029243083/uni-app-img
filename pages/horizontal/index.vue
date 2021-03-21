<template>
	<scroll-view class="wrapper" :refresher-triggered='isScroll' scroll-y refresher-enabled
		@refresherrefresh="refresherrefresh">
		<view class="taobao" v-if="t_image.length > 0">
			<view class="title">
				<text class="text">淘宝买家秀</text>
			</view>
			<view class="t-img-box">
				<view class="box" v-for="(item,index) in t_image" :key="index">
					<myImage :src="item" mode="aspectFill"></myImage>
				</view>
			</view>
		</view>
		<view class="quotations">
			<view class="title">
				社会小伙精神语录
			</view>
			<view class="text-box">
				<view v-for="text in text_data" :key="text" class="bb">
					<text class="text" selectable>{{ text }}</text>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {
		getData
	} from './getData.js'
	import myImage from '../../compoents/Image/index.vue'
	export default {
		components: {
			myImage
		},
		data() {
			return {
				t_image: [],
				text_data: [],
				isScroll: false
			}
		},

		async created() {
			const res = await this.getTaobaoList(27);
			this.getTextList(10)
		},
		methods: {
			async getTaobaoList(num) {
				const res = getData(num, 't_url');
				let t_img_res = await Promise.all(res);
				t_img_res = t_img_res.map(i => {
					return i.pic_url
				})
				this.t_image = [...t_img_res];
				return t_img_res;
			},

			async getTextList(num) {
				const res = getData(num,
					'text_url');
				let t_text_res = await Promise.all(res);
				t_text_res = t_text_res.map(i => i.social);
				this.text_data = [...t_text_res];
			},
			async refresherrefresh() {
				this.isScroll = true;
				const res = await this.getTaobaoList(27);
				await this.getTextList(10);
				this.isScroll = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: calc(100vh - 70rpx);

		.taobao {
			.title {
				font-weight: bolder;
				font-size: 30rpx;
				color: #aa55ff;
				border-left: 10rpx solid #aa55ff;
				padding: 30rpx;

				.text {}
			}

			.t-img-box {
				display: flex;
				flex-wrap: wrap;

				.box {
					width: 33.33%;
					font-size: 0;
					box-sizing: border-box;
					border: 1rpx solid #fff;
				}
			}
		}

		.quotations {
			.title {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				font-weight: bolder;
				font-size: 30rpx;
				color: #55aaff;
				border-left: 10rpx solid #55ffff;
				padding-left: 20rpx;
			}

			.text-box {
				width: 100%;
				box-sizing: border-box;
				padding: 0 8rpx;

				.bb {
					padding: 30rpx 10rpx;
					border-bottom: 1rpx solid #eee;

					.text {
						font-size: 24rpx;
						color: #666;
					}
				}

			}
		}
	}
</style>
