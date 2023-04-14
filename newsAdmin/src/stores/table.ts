import { defineStore } from "pinia"
import { ElMessage } from "element-plus"

import { unify, unifyAdd, unifyDel, unifyRenew } from "@/service/api/unify"

import { useSystemStore } from "./system"
import { reactive } from "vue"

const system = useSystemStore()

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
    async renewTbale() {
      const { role, id } = system.user
      let data = reactive({})
      if (role == 1) {
        data = {
          ...this.search,
          strict: {
            uid: id
          }
        }
      } else {
        data = {
          ...this.search
        }
      }
<<<<<<< HEAD
=======
      console.log("object 11:>> ", data)
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
      let res

      res = await unify({ name: this.name, conut: true, data })
      if (res.code === 200 && res.data != null) this.total = res.data[0].rows
      else ElMessage.error("表单长度未请求到数据")
      res = await unify({ name: this.name, ...this.page, data })
      if (res.code === 200 && res.data != null) this.list = res.data
      else ElMessage.error("表单数据未请求到数据")
<<<<<<< HEAD
=======
      console.log("res :>> ", res)
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
    },

    // 删除表单数据
    async delList(row: any) {
      // 后端需要的配置项
      const config = reactive({
        name: this.name,
        id: ""
      })
      if (this.name == "news") {
        config.id = row.newsId
      } else config.id = row.id
      const res = await unifyDel(config)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        this.renewTbale()
        return true
      } else ElMessage.error("删除失败")
    },

    // 新建或更新表单数据
    async commitList(title: string) {
      let res
      if (title == "新建") {
        res = await unifyAdd({ name: this.name, data: this.modal })
      } else {
        res = await unifyRenew({ name: this.name, data: this.modal })
      }
      if (res.code === 200 && res.data != undefined) {
        ElMessage.success(title + "成功")
        this.renewTbale()
        this.visible = false
      } else ElMessage.error(title + "失败")
    }
  }
})
