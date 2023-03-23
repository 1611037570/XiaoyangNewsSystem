import request from "../index"

export function getMenu() {
  return request.get<any>({
    url: "menu"
  })
}
