<template>
	<view>
		<view class="banner">
			<swiper class="swiper" indicator-active-color="#ff557f" circular indicator-dots autoplay :interval="1500">
				<swiper-item v-for="(item,index) in bannerData" :key="index">
					<image class="img" :src="item" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="wrapper">
			<RandomImg :title="comic.title" :imgUrl="comic.url" />
			<RandomImg :title="menhear.title" :imgUrl="menhear.url" />
			<RandomImg :title="scenery.title" :imgUrl="scenery.url" />
		</view>
	</view>
</template>

<script>
	import RandomImg from '../RandomImg/index.vue'
	export default {
		data() {
			return {
				comic: {
					title: '随机二次元',
					url: 'https://api.ixiaowai.cn/api/api.php?return=json'
				},
				menhear: {
					title: 'menhear酱',
					url: 'https://api.ixiaowai.cn/mcapi/mcapi.php?return=json'
				},
				scenery: {
					title: '随机风景',
					url: 'https://api.ixiaowai.cn/gqapi/gqapi.php?return=json'
				},
				bannerData: []

			}
		},
		components: {
			RandomImg
		},
		async created() {
			let temp = [];
			const res = await this.request({
				url: 'http://service.picasso.adesk.com/v1/vertical/category'
			});
			temp = res.res.category.map(i => i.cover);
			this.bannerData = temp;
		}
	}
</script>

<style lang="scss" scoped>
	.banner{
		width: 100%;
		box-sizing: border-box;
		border: 2rpx solid #fff;
		margin-bottom: 20rpx;
		.swiper{
			height: 553rpx !important;
		}
	}
	.img{
		width: 100%;
	}
</style>
