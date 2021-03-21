<template>
	<image class="img" :mode="mode" :src="src ? src : 'http://img5.adesk.com/6054155ee7bce72de51466ea'" @longpress="longpress(src)" @click="handleClick(src)"></image>
</template>

<script>
	import {
		showModal,
		downloadFile,
		saveImageToPhotosAlbum,
		showToast
	} from '../../util/index.js'
	export default {
		props: ['src', 'mode'],
		methods: {
			/*
				长按
			*/
			async longpress(src) {
				const res = await showModal('是否保存图片');
				if (res.confirm) {
					// 点击了确定
					const res = await downloadFile(src);
					console.log(res)
					if (res.statusCode === 200) {
						// 成功获得路径
						const isTure = await saveImageToPhotosAlbum(res.tempFilePath);
						console.log(isTure)
						if (isTure) {
							// 保存成功
							showToast('保存成功')
						}
					}
				} else {
					uni.showToast({
						title: "取消保存",
						icon: 'none'
					})
				}
			},

			/*
				点击预览
			*/
			handleClick(src) {
				uni.previewImage({
					urls: [src],
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.img {
		width: 100%;
	}
</style>
