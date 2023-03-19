import request from "../index"

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
