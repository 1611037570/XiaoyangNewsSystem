<<<<<<< HEAD
import { defineStore } from "pinia"

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
      user: {
        role: null,
        id: null,
        name: ""
      },
      tabs: [
        {
          title: "数据展示",
          name: "数据展示",
          content: "/main/show"
        }
      ],
      TabsValue: 1
    }
  },
  actions: {}
})
=======
import { defineStore } from "pinia"

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
      user: {
        role: null,
        id: null,
        name: ""
      },
      tab: {
        name: "",
        path: ""
      },
      tabs: [
        {
          title: "数据展示",
          name: "数据展示",
          content: "/main/show"
        }
      ]
    }
  },
  actions: {}
})
>>>>>>> dc327334474ef505714dc5b2cd003fea2812ae54
