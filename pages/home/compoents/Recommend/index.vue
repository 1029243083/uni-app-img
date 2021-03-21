<template>

	<scroll-view class="scroll" scroll-y @scrolltolower="scrolltolower">
		<view class="wrapper">
			<view class="hot-wrrapper" v-if="hot_r_List.length > 0">
				<view class="hot-img-box" v-for="(items,index) in hot_r_List" :key="items._id">
					<image class="img" :src="items.thumb" mode="widthFix">
					</image>
				</view>
			</view>
			<view class="month-wrapper" v-if="date_List.items">
				<view class="info-wrapper">
					<view class="title">
						<text class="month">{{ month }} </text>
						<text class="day"> /{{ day }}</text>
						<text class="title-text">你负责美丽就好</text>
					</view>

				</view>

				<view class="month-img-box-w" v-if="date_List.items">
					<view class="month-img-box" v-for="items in date_List.items" :key="items.id">
						<myImage :src="items.thumb" mode="aspectFill" />
					</view>
				</view>
			</view>
			<view class="hot" v-if="hot_list.length > 0">
				<view class="hot-title">
					<text>热门</text>
				</view>
				<view class="dis" v-if="hot_list.length > 0">
					<view class="hot-img-box" v-for="items in hot_list" :key="items.id">
						<myImage :src="items.thumb ? items.thumb : ''" mode="aspectFill" />
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from 'moment';
	import myImage from '../../../../compoents/Image/index.vue'
	export default {
		components: {
			myImage
		},
		data() {
			return {
				limit: 30, // 返回多少条数据
				order: 'hot', // 类型
				skip: 40, // 跳过多少条数据
				hot_r_List: [], // 首页最前面的数据
				date_List: {}, // 带日期的那个数据
				month: 0,
				day: 0,
				hot_list: [] // 热门的图片
			}
		},
		async created() {
			const res = await this.getList();
			this.date_List = res.res.homepage[2];
			this.date_List.items = this.date_List.items.map(i => {
				if (i) {
					return {
						...i,
						thumb: (i.thumb + i.rule).replace('$<Height>', 360)
					}
				}

			}).slice(0, 6)
			this.month = moment(res.res.homepage[2].stime).format('MM');
			this.day = moment(res.res.homepage[2].stime).format('DD');
			this.hot_r_List = res.res.homepage[1].items;
			this.hot_list = [...this.hot_list, ...res.res.vertical];
		},
		methods: {
			/*
				获取数据
			*/
			async getList() {
				// this.skip = this.skip + this.limit;
				if (!this.date_List.items) {
					this.skip = 0;
				} else {
					this.skip = this.skip + this.limit;
				}
				const res = await this.request({
					url: 'http://service.picasso.adesk.com/v3/homepage/vertical',
					data: {
						limit: this.limit,
						order: this.order,
						skip: this.skip
					}
				})
				return res;
			},

			/**
			 *滚动条到底 
			 */
			async scrolltolower() {
				const res = await this.getList()
				this.hot_list = [...this.hot_list, ...res.res.vertical];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		height: calc(100vh - 79rpx);

		.hot-wrrapper {
			display: flex;
			flex-wrap: wrap;
			font-size: 0rpx;

			.hot-img-box {
				width: 50%;
				box-sizing: border-box;
				border: 1rpx solid #fff;

				.img {
					width: 100%;
				}
			}
		}

		.month-wrapper {
			margin-top: 10rpx;

			.info-wrapper {
				display: flex;
				justify-content: space-between;
				line-height: 40rpx;
				font-weight: bold;

				.gengduo {
					font-size: 24rpx;
					color: #ff557f;
					padding-right: 10rpx;
				}

				.title {
					color: #ff557f;

					.month {
						font-size: 40rpx;
						margin-right: 10rpx;
					}

					.day {
						font-size: 25rpx;
					}

					.title-text {
						display: inline-block;
						margin-left: 20rpx;
						color: #5a5a5a;
					}
				}
			}

			.month-img-box-w {
				display: flex;
				flex-wrap: wrap;
				font-size: 0;

				.month-img-box {
					box-sizing: border-box;
					padding: 1rpx;
					width: 33.33%;

					.img {
						width: 100%;
					}
				}
			}

		}

		.hot {
			padding: 1rpx;
			margin-top: 10rpx;
			margin-bottom: 10rpx;

			.hot-title {
				font-weight: bolder;
				border-left: 9rpx solid #ff557f;
				padding-left: 20rpx;
			}

			.dis {
				display: flex;
				flex-wrap: wrap;
				font-size: 0rpx;

				.hot-img-box {
					box-sizing: border-box;
					padding: 1rpx;
					width: 33.33%;

					.img {
						width: 100%;
					}
				}
			}

		}
	}
</style>
