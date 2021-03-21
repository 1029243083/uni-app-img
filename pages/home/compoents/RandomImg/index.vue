<template>
	<view class="wrapper">
		<view class="random">
			<view class="r-header">
				<view class="r-title" v-bind:style="{color: 'rgb'+rgb() }">{{ title }}</view>
				<view class="change" @click="changeImg">换一批</view>
			</view>
			<view class="img-wrapper">
				<view class="img-box" v-for="(item,index) in randomArr" :key="index">
					<myImage :src="item" mode="widthFix"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// myImage组件可以长按下载
	import myImage from '../../../../compoents/Image/index.vue'
	
	export default {
		components: {
			myImage
		},
		props: ['title', 'imgUrl'],
		data() {
			return {
				randomArr: []
			}
		},
		async created() {
			this.getData(4)
		},

		methods: {
			/*
				获取pormis数组
			*/
			getList(num) {
				const arr = [];
				for (let i = 0; i < num; i++) {
					arr.push(this.request({
						url: this.imgUrl
					}))
				}
				return arr;
			},

			getData(num) {
				const res = this.getList(num);
				Promise.all(res).then(result => {
					const arr = result.map(i => {
						return i.imgurl
					})

					this.randomArr = [...arr]
				})
			},

			changeImg() {
				this.getData(4)
			},
			rgb() { //rgb颜色随机
				var r = Math.floor(Math.random() * 256);
				var g = Math.floor(Math.random() * 256);
				var b = Math.floor(Math.random() * 256);
				var rgb = '(' + r + ',' + g + ',' + b + ')';
				return rgb;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		margin-bottom: 30rpx;

		.random {
			.r-header {
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				align-items: center;
				padding-right: 10rpx;

				.r-title {
					font-size: 29rpx;
					padding-left: 10rpx;
					color: #ff557f;
					font-weight: bolder;
					border-left: 8rpx solid #ff557f;
					padding: 10rpx 0;
				}

				.change {
					font-size: 29rpx;
					color: #ff557f;
					font-weight: bolder;
				}

			}

			.img-wrapper {
				font-size: 0;
				display: flex;
				flex-wrap: wrap;

				.img-box {
					width: 50%;
					box-sizing: border-box;
					border: 1rpx solid #fff;
				}
			}
		}
	}
</style>
