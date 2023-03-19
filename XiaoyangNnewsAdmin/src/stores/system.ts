import { defineStore } from "pinia"

export const useSystemStore = defineStore("system", {
  state() {
    return {
      isCollapse: false
    }
  }
})
