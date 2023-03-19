import Request from "../utils/request.js"

export function login(data) {
	return Request.post({
		url: "/login",
		data
	})
}
export function addUser(data) {
	return Request.get({
		url: "/adduser",
		data
	})
}
export function getPhone(data) {
	return Request.get({
		url: "/phone",
		data
	})
}

export function getUidUser(data) {
	return Request.get({
		url: "/uid",
		data
	})
}

export function updatePassword(data) {
	return Request.get({
		url: "/password",
		data
	})
}
export function updateName(data) {
	return Request.get({
		url: "/name",
		data
	})
}
