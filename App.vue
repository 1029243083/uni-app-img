<script>
	export default {
		onLaunch() {
			uni.showModal({
				title: '长按保存图片',
				showCancel: false,
				confirmText: '我知道了',
			})
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/style/index.css");
</style>
