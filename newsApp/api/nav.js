import Request from "../utils/request.js"
export function getNavLists(msg) {
	return Request.get({
		url: "/nav",
		msg: msg ?? null
	})
}
