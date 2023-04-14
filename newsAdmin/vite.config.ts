import path from "path"
import { fileURLToPath, URL } from "node:url"

import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
// ElementPlus
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

const pathSrc = path.resolve(__dirname, "src")
// 改造为函数形式
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) // 使用loadEnv获取当前环境配置
  console.log(env) // 这里就是读取的 .env 文件内设置的参数
  // env = {VITE_ENV: 'development', VITE_PORT: '8080', VITE_BASE_API: '/dev-api'}
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver()
        ],
        dts: path.resolve(pathSrc, "auto-imports.d.ts")
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"]
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],
        dts: path.resolve(pathSrc, "components.d.ts")
      }),
      // 自动安装Icons
      Icons({
        autoInstall: true
      })
    ],
    // 服务器配置
    server: {
      host: "127.0.0.1",
      port: 80,
      open: true
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    envDir: "./env"
    // envPrefix: ["VITE_", "DZ_"]
  }
})
