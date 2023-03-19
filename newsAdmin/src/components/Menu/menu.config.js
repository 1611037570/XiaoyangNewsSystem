/* eslint-disable */
import store from "@/store"

let menus0 = [
  {
    id: 1,
    name: "数据展示",
    icon: "",
    path: "/main/show"
  },
  {
    id: 2,
    name: "新闻管理",
    path: "/main/news",
    icon: ""
  },
  {
    id: 3,
    name: "分类管理",
    path: "/main/nav",
    icon: ""
  },
  {
    id: 4,
    name: "文案管理",
    path: "/main/note",
    icon: ""
  },
  {
    id: 5,
    name: "用户管理",
    path: "/main/user",
    icon: ""
  }
]
let menus1 = [
  {
    id: 1,
    name: "新闻管理",
    path: "/main/news",
    icon: ""
  },
  {
    id: 2,
    name: "文案管理",
    path: "/main/note",
    icon: ""
  }
]

export function getMenus() {
  let role = store.state.user.role
  if (role == 0) return menus0
  else if (role == 1) return menus1
}
