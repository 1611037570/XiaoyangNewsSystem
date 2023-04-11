import { defineConfig } from "vite"
import Components from "unplugin-vue-components/vite"
import uni from "@dcloudio/vite-plugin-uni"
import { VantResolver } from "unplugin-vue-components/resolvers"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    Components({
      resolvers: [VantResolver()]
    })
  ]
})
