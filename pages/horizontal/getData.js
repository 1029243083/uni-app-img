const obj = {
	t_url: 'https://api.66mz8.com/api/rand.tbimg.php?format=json',
	text_url: 'https://api.66mz8.com/api/social.php?format=json',
	music: 'https://api.66mz8.com/api/rand.music.163.php?format=json'
}
export function getData(num = 1, type) {
	const arr = []
	for (let i = 0; i < num; i++) {
		const p = new Promise((reslove, reject) => {
			uni.request({
				url: obj[type],
				success(res) {
					reslove(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
		})
		arr.push(p);
	}
	return arr;
}
