import Request from "../utils/request.js"

export function addNews(data) {
	return Request.post({
		url: "/addnews",
		data
	})
}
export function getNews(data) {
	return Request.get({
		url: "/news",
		data
	})
}
