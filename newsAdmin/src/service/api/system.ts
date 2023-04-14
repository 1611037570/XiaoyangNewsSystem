<<<<<<< HEAD
import request from "../index"

export function getMenu(params: any) {
  return request.get<any>({
    url: "/menu",
    params
  })
}
export function login(data: any) {
  return request.post<any>({
    url: "/login",
    data
  })
}
=======
import request from "../index"

export function getMenu(params: any) {
  return request.get<any>({
    url: "/menu",
    params
  })
}
export function login(data: any) {
  return request.post<any>({
    url: "/login",
    data
  })
}
>>>>>>> dc327334474ef505714dc5b2cd003fea2812ae54
