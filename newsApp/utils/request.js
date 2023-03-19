const Request = {
	BASE_URL: 'http://127.0.0.1',
	request(config) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.BASE_URL + config.url,
				headers: {
					"Content-type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": "*"
				},
				dataType: "json",
				method: config.method,
				data: config.data || {},
				success: (res) => {
					resolve(res.data)
				},
				fail() {
					if (config.msg != null) {
						uni.showToast({
							title: config.msg,
							icon: "error"
						})
					}
				}
			})
		})
	},
	get(config) {
		return this.request({
			...config,
			method: "GET"
		})
	},
	post(config) {
		return this.request({
			...config,
			method: "POST"
		})
	},
	delete(config) {
		return this.request({
			...config,
			method: "DELETE"
		})
	}
}
export default Request
