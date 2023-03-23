import { defineStore } from "pinia"
import { getMenu } from "@/service/api/system"
export const useSystemStore = defineStore("system", {
  state() {
    return {
      isCollapse: false,
      menu: []
    }
  },
  actions: {
    async saveMenu() {
      this.menu = await getMenu()
    }
  }
})
