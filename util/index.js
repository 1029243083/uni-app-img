/*
	弹出模态框
*/
export function showModal(title) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
};

/*
	下载图片
*/
export function downloadFile(url) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
};

/*
	保存到系统相册
*/
export function saveImageToPhotosAlbum(path) {
	return new Promise((resolve, reject) => {
		uni.saveImageToPhotosAlbum({
			filePath: path,
			success: function() {
				resolve(true)
			},
			fail(err) {
				reject(err)
			}
		});
	})
};

/**
 * 显示弹窗
 */
export function showToast(title) {
	uni.showToast({
		title,
		image: '/static/success.png'
	})
}
