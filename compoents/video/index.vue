<template>
	<video class="video" loop :src="src" object-fit="contain" controls @longpress="longpress"></video>
</template>

<script>
	import {
		showModal,
		downloadFile
	} from '../../util/index.js'
	export default {
		props: ['src'],
		methods: {
			async longpress() {
				const res = await showModal('是否下载视频');
				if (res.confirm) {
					// 确认下载
					uni.showLoading({
						title: "正在下载",
						mask: true
					})
					const result = await downloadFile(this.src);
					const res = await uni.saveVideoToPhotosAlbum({
						filePath: result.tempFilePath
					})
					console.log(res)
					if (res[1].errMsg === 'saveVideoToPhotosAlbum:ok') {
						uni.showToast({
							title: '下载成功',
							icon: 'success',
							mask: true,
							duration: 800
						})
						uni.hideLoading();
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 100% !important;
		height: 100% !important;
	}
</style>
