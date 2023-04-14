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
