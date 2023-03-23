import { defineStore } from "pinia"
import { getMenu } from "@/service/api/system"

export const useSystemStore = defineStore("system", {
  persist: {
    enabled: true, //开启数据持久化
    strategies: [
      {
        key: "system", //给一个要保存的名称
        storage: localStorage //sessionStorage / localStorage 存储方式
      }
    ]
  },
  state() {
    return {
      isCollapse: false,
      menu: [],
      user: {
        role: null
      }
    }
  },
  actions: {
    async saveMenu() {
      if (this.user.role == 1 || this.user.role == 0) {
        let res = await getMenu()
        this.menu = res.data
        console.log("saveMenu完成 :>> ", this.menu)
      }
    }
  }
})
