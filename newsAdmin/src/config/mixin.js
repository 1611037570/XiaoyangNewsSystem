import { img } from "@/config/config"
let mixin = {
  data() {
    return {}
  },
  methods: {
    imgFilter(str) {
      let data
      str.replace(
        /<img [^>]*src=['"]([^'"]+)[^>]*>/,
        function (match, capture) {
          data = capture
        }
      )
      if (data) return data
      else return img
    }
  }
}
export default mixin
