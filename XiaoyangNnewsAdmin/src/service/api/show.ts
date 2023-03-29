import request from "../index"

export function getCensus() {
  return request.get<any>({
    url: "/census"
  })
}
