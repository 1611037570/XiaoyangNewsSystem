import { unify } from "@/service/api/unify"
import { useTableStore } from "@/stores/table"
const store = useTableStore()
export const isRepeat = async (data: any, ok: any, title: string) => {
  let res
  res = await unify({ name: store.name, strict: true, all: true, data })
  // 新建操作 和单表处理
  if (title == "新建") {
    if (res.code === 200) return false
  } else {
    if (res.code != 400) {
      // 数据库字段编辑
      let id: string
      if (store.name == "news") id = "newsId"
      else if (store.name == "note") id = "uid"
      else id = "id"
      // 数据存在
      if (res.data[0][id] != ok[id]) return false
    }
  }
  return true
}
