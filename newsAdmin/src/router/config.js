import store from "@/store"

let router1 = [
  {
    path: "/main/news",
    name: "news",
    component: () => import("@/views/news/")
  },

  {
    path: "/main/note",
    name: "note",
    component: () => import("@/views/note/")
  }
]
let router0 = [
  {
    path: "/main/show",
    name: "show",
    component: () => import("@/views/show/")
  },
  {
    path: "/main/news",
    name: "news",
    component: () => import("@/views/news/")
  },
  {
    path: "/main/nav",
    name: "nav",
    component: () => import("@/views/nav/")
  },
  {
    path: "/main/user",
    name: "user",
    component: () => import("@/views/user/")
  },
  {
    path: "/main/note",
    name: "note",
    component: () => import("@/views/note/")
  }
]
export function getRouter() {
  let role = store.state.user.role
  if (role == 0) return router0
  else if (role == 1) return router1
  else
    return [
      {
        path: "/main/show",
        name: "show",
        component: () => import("@/views/news/")
      }
    ]
}
