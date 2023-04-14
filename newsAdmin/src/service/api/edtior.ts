<<<<<<< HEAD
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
=======
import request from "../index"
export function add(data: any) {
  return request.post({
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
>>>>>>> dc327334474ef505714dc5b2cd003fea2812ae54
