import request from "../index"

export function census() {
  return request.get<any>({
    url: "census"
  })
}
