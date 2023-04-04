import { defineStore } from "pinia"

import { unify, unifyDel } from "@/service/api/unify"
export const useTableStore = defineStore("table", {
  state() {
    return {
      visible: false,
      list: [],
      name: "",
      total: 0,
      page: {
        pageSize: 1,
        pageIndex: 0
      },
      search: {},
      modal: {}
    }
  },

  getters: {},
  actions: {
    // 更新表单
    renewTbale() {
      this.saveTotal()
      this.saveList()
    },

    // 保存表单长度
    async saveTotal() {
      let res = await unify({
        name: this.name,
        conut: true,
        data: {
          ...this.search
        }
      })
      if (res.code === 200 && res.data != null) this.total = res.data[0].rows
      else ElMessage.error("表单长度未请求到数据")
    },

    // 保存表单数据
    async saveList() {
      let res = await unify({
        name: this.name,
        ...this.page,
        data: {
          ...this.search
        }
      })
      if (res.code === 200 && res.data != null) this.list = res.data
      else ElMessage.error("表单数据未请求到数据")
    },

    // 删除表单数据
    async delList(row: any) {
      // 后端需要的配置项
      let config = reactive({
        name: this.name,
        id: ""
      })
      if (this.name == "news") {
        config.id = row.newsId
      } else config.id = row.id
      let res = await unifyDel(config)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        this.saveList()
      } else ElMessage.error("删除失败")
    }
  }
})
