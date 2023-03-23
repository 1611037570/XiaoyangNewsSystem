import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import "./assets/base.less"

console.log("import.meta.env :>> ", import.meta.env.VITE_BASE_URL)
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")
