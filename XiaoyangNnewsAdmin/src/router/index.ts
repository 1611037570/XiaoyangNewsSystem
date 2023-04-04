import { createRouter, createWebHistory } from "vue-router"
import cache from "@/utils/cache"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/main/show",
      component: () => import("@/views/index.vue"),
      children: []
    },
    {
      path: "/main",
      name: "main",

      component: () => import("@/views/index.vue"),

      children: [
        {
          path: "/main/show",
          name: "show",
          component: () => import("@/views/main/dataPresentation.vue")
        },
        {
          path: "/main/nav",
          name: "nav",
          component: () => import("@/views/system/nav/nav.vue")
        },
        {
          path: "/main/user",
          name: "user",
          component: () => import("@/views/system/user/index.vue")
        },
        {
          path: "/main/note",
          name: "note",
          component: () => import("@/views/system/note/index.vue")
        },
        {
          path: "/main/news",
          name: "news",
          component: () => import("@/views/system/news/index.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue")
    }
  ]
})
// 全局前置导航 to即将要进入的目标对象
router.beforeEach((to, from, next) => {
  // 未登录拦截
  if (to.path !== "/login") {
    let user = cache.get("user")
    if (user !== undefined) {
      let role = user.role
      if (role == undefined && role != "1" && role != "0") next("/login")
    } else next("/login")
  }

  next()
})
export default router
