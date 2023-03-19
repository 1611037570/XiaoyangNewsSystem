import Vue from "vue"
import Vuex from "vuex"
import unify from "./unify"
import user from "./user"

import cache from "@/utils/cache"
import store from "@/store"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    unify,
    user
  }
})

function setupStore() {
  let user = cache.get("user")
  if (user !== undefined) {
    store.commit("user/saveRole", user.role)
    store.commit("user/saveUID", user.id)
    store.commit("user/saveName", user.name)
  }
  console.log("初始化VUEX完成")
}
setupStore()
