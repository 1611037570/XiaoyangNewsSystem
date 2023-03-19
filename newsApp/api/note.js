import Request from "../utils/request.js"

export function getnote() {
	return Request.get({
		url: "/note"
	})
}