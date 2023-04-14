import { DEFAULT_TABS } from "@/config"
import { defineStore } from "pinia"

export const useTabsStore = defineStore("tabs", {
  state() {
    return {
      tabs: DEFAULT_TABS,
      isTab: ""
    }
  },
  actions: {}
})
