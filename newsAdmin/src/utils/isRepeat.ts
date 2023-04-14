import { unify } from "@/service/api/unify"
import { useTableStore } from "@/stores/table"
<<<<<<< HEAD

const store = useTableStore()
/**
 * 判断数据是否重复
 * @param {any} data - 待操作数据
 * @param {any} ok - 原始数据
 * @param {string} title - 操作标题
 * @returns {boolean} 如果数据不存在或者已存在但主键值未变化，则返回 true，否则返回 false
 * 适用场景：
 * 1. 新建操作
 * 2. 数据库字段编辑（仅对单表操作）
 */
export const isRepeat = async (data: any, ok: any, title: string) => {
  let res = await unify({ name: store.name, strict: true, all: true, data })

  // 新建操作和单表处理的情况
  if (title == "新建") {
    // 如果返回码为 200，说明数据不存在，返回 false
    if (res.code === 200) return false
  } else {
    // 数据库字段编辑的情况
    if (res.code != 400) {
      // 根据表名获取对应的主键名
=======
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
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
      let id: string
      if (store.name == "news") id = "newsId"
      else if (store.name == "note") id = "uid"
      else id = "id"
<<<<<<< HEAD
      // 如果当前数据的主键值与原始数据的主键值不同，说明数据已存在，返回 false
      if (res.data[0][id] != ok[id]) return false
    }
  }
  // 数据不存在或者已存在但主键值未变化，返回 true
=======
      // 数据存在
      if (res.data[0][id] != ok[id]) return false
    }
  }
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
  return true
}
