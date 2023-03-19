import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
Vue.config.productionTip = false
Vue.config.silent = true // 取消 Vue 所有的日志与警告
Vue.config.devtools = true // 允许 vue-devtools 检查代码
// 全局混入
import Mixin from "@/config/mixin"
Vue.mixin(Mixin)
import cache from "@/utils/cache"
// element
import "@/assets/css/index.css"
import element from "@/config/element"
Vue.use(element.install)
// 全局组件
import component from "@/config/component"
Vue.use(component)
// 全局过滤器
import * as filters from "@/config/filter"
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  beforeCreate() {
    Vue.prototype.$message = element.Message // 提示
    Vue.prototype.$confirm = element.MessageBox // 消息弹窗
    Vue.prototype.$cache = cache // 缓存
    Vue.prototype.$bus = this // 全局事件
  },
  store,
  render: (h) => h(App)
}).$mount("#app")
