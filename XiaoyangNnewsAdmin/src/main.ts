import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import piniaPluginPersist from "pinia-plugin-persist" //引入pinia数据持久化插件
import "./assets/base.less"

// console.log("import.meta.env :>> ", import.meta.env.VITE_BASE_URL)
import cache from "./utils/cache"
import locale from "element-plus/lib/locale/lang/zh-cn"
import ScoketService from "./utils/ws"
ScoketService.inStance.connect()
const app = createApp(App)
// app.use(ElementPlus, { locale })
app.config.globalProperties.$cache = cache
app.use(createPinia().use(piniaPluginPersist))

app.use(router)

app.mount("#app")
