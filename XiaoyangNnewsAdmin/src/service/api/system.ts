import request from "../index"

export function getMenu() {
  return request.get<any>({
    url: "/menu"
  })
}
export function login(data: any) {
  return request.post<any>({
    url: "/login",
    data
  })
}
