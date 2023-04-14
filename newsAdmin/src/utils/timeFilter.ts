<<<<<<< HEAD
import dayjs from "dayjs"

import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
const timeFilter = (
  utc: string | number | dayjs.Dayjs | Date | null | undefined,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  return dayjs.utc(utc).utcOffset(8).format(format)
}

export { timeFilter }
=======
import dayjs from "dayjs"

import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
const timeFilter = (
  utc: string | number | dayjs.Dayjs | Date | null | undefined,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  return dayjs.utc(utc).utcOffset(8).format(format)
}

export { timeFilter }
>>>>>>> dc327334474ef505714dc5b2cd003fea2812ae54
