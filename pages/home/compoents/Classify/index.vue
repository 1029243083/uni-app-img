<template>
	<scroll-view class="wrapper" scroll-y @scrolltolower="scrolltolower">
		<view class="select-box">
			<scroll-view scroll-x class="scroll" scroll-y>
				<view class="img-box">
					<view class="box" v-for="(item,index) in selectData" mode="widthFix" :key="item.id">
						<image :src="item.cover" @click="changeCurrent(item.id,index)" class="img"
							:class="{active : index === current}" mode="scaleToFill">
						</image>
						<text class="name">{{ item.name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="list-wrapper">
			<view class="img-box" v-for="item in listData" :key="item.id">
				<myImage :src="item.img" mode="widthFix" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import myImage from '../../../../compoents/Image/index.vue';
	export default {

		components: {
			myImage
		},
		data() {
			return {
				selectData: [],
				current: 0,
				limit: 30,
				skip: 0,
				order: 'hot',
				id: '4e4d610cdf714d2966000000',
				listData: []
			}
		},
		async created() {
			/**
			 * 获取分类图片 标题
			 */
			const res = await this.request({
				url: 'http://service.picasso.adesk.com/v1/vertical/category'
			});
			this.selectData = res.res.category
			this.id = res.res.category[0].id //初始化id
			const {
				limit,
				skip,
				order,
				id
			} = this;

			const listRes = await this.getListData();
			this.listData = [...this.listData, ...listRes.res.vertical];
		},
		methods: {
			async changeCurrent(id, i) {
				if (i === this.current) return;
				this.id = id;
				this.skip = 0;
				this.current = i;
				const res = await this.getListData();
				this.listData = [...res.res.vertical];
			},

			/**
			 * 获取图片列表
			 */
			async getListData() {
				const {
					limit,
					skip,
					order,
					id
				} = this;
				const res = await this.request({
					url: `http://service.picasso.adesk.com/v1/vertical/category/${id}/vertical`,
					data: {
						limit,
						skip,
						order
					}
				});
				return res;
			},

			async scrolltolower() {
				this.skip = this.skip + this.limit;
				const res = await this.getListData();
				this.listData = [...this.listData, ...res.res.vertical];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: calc(100vh - 79rpx);

		.list-wrapper {
			display: flex;
			flex-wrap: wrap;

			.img-box {
				width: 33.33%;
				box-sizing: border-box;
				font-size: 0;
				border: 1rpx solid #fff;
			}
		}

		.select-box {
			width: 100%;
			width: 100%;
			overflow: hidden;
			padding: 20rpx;
			background: #fff;
			white-space: nowrap;

			.scroll {
				.img-box {
					display: flex;

					.box {
						display: flex;
						text-align: center;
						margin-left: 30rpx;
						flex-direction: column;

						.img {
							display: inline-block;
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
							opacity: 0.5;
						}

						.name {
							font-size: 24rpx;
						}

						.img.active {
							opacity: 1;
						}
					}

				}


			}

		}
	}
</style>
