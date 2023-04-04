import { defineStore } from "pinia"

import { unify, unifyDel } from "@/service/api/unify"
export const useTableStore = defineStore("table", {
  state() {
    return {
      list: [],
      name: ""
    }
  },
  actions: {
    // 保存表单数据
    async saveList() {
      let res = await unify({
        name: this.name
      })
      if (res.code === 200 && res.data != null) this.list = res.data
      else ElMessage.error("表单数据请求失败")
    },
    // 删除表单数据
    async delList(row: any) {
      console.log("row :>> ", row)
      let config = reactive({
        name: this.name,
        id: ""
      })
      if (this.name == "news") {
        config.id = row.newsId
      } else config.id = row.id
      console.log("config :>> ", config)
      let res = await unifyDel(config)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        this.saveList()
        // this.page.pageIndex = 0
        // this.renew()
      } else ElMessage.error("删除失败")
    }
  }
})
