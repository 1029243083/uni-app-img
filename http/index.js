export default (options) => {
	uni.showLoading({
		title: "加载中",
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
}
