import dayjs from "dayjs"

import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
let timeFilter = (utc, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs.utc(utc).utcOffset(8).format(format)
}

export { timeFilter }
