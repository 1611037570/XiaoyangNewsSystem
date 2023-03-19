import Request from "../utils/request.js"
import qs from "qs"
// 统一添加
export function unifyAdd(params) {

	return Request.get({
		url: "/add",
		params: params
	})
}

// 统一删除
export function unifyDel(params) {
	return Request.get({
		url: "/del",
		params
	})
}

// 统一修改
export function unifyRenew(params) {
	return Request.get({
		url: "/renew",
		params
	})
}

// 统一请求
export function unify(data) {
	return Request.get({
		url: "/unify",
		data
	})
}
