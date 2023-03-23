import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView
    // },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue")
    },
    {
      path: "/show",
      name: "show",
      component: () => import("@/views/main/dataPresentation.vue")
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue")
    // }
  ]
})

export default router
