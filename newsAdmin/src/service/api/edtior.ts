import request from "../index"
export function add(data: any) {
  return request.post<any>({
    url: "/add",
    data
  })
}
export function edit(data: any) {
  return request.post({
    url: "/edit",
    data
  })
}
