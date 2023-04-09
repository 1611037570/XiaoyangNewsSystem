import { img } from "@/config/config.js"
export const imgFilter = (str: any) => {
  let data
  str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match: any, capture: any) {
    data = capture
  })
  if (data) return data
  else return img
}
