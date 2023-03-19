
import Request from "../utils/request.js"

export function login(data) {
  return Request.post({
    url: "/login",
    data
  })
}