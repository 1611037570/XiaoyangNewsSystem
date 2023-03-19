import request from "../index"
export function census() {
  return request.get({
    url: "/census"
  })
}

export function login(data) {
  return request.post({
    url: "/login",
    data: data
  })
}

export function add(data) {
  return request.post({
    url: "/add",
    data
  })
}
export function edit(data) {
  return request.post({
    url: "/edit",
    data
  })
}
