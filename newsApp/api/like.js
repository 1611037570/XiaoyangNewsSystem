import Request from "../utils/request.js"

export function addlike(data) {
	return Request.get({
		url: "/islike",
		data
	})
}
export function getlike(data) {
	return Request.get({
		url: "/like",
		data
	})
}
export function dellike(data) {
	return Request.get({
		url: "/dellike",
		data
	})
}
