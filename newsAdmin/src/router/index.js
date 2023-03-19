import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"

Vue.use(VueRouter)

import { getRouter } from "./config.js"
let r = getRouter()
console.log("r :>> ", r)
const routes = [
  {
    path: "/",
    name: "main",
    redirect: r[0].path,
    component: () => import("@/views/main/index")
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/addnews",
    component: () => import("@/views/addNews/index.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/index.vue"),
    children: r
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})
// 全局前置导航 to即将要进入的目标对象
router.beforeEach((to, from, next) => {
  // 未登录拦截
  let user = store.state.user
  let role = user.role
  if (to.path !== "/login") {
    // let role = role == undefined || role !== 0 && role !=
    if (role == undefined && role != "1" && role != "0") {
      next("/login")
    }
  }

  next()
})
export default router
