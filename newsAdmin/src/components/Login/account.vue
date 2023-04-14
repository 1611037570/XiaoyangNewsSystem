<template>
  <div>
    <Form v-bind="loginConfig" ref="accountRef"></Form>
  </div>
</template>

<script setup lang="ts">
// 组件
import Form from "@/components/Form/index.vue"
import { ElMessage } from "element-plus"
// pinia
import { login } from "@/service/api/system"
import { useSystemStore } from "@/stores/system"
import { useTabsStore } from "@/stores/tab"
// vue
import { useRouter } from "vue-router"
import { getCurrentInstance, ref } from "vue"
// 自定义
import { loginConfig } from "./account.config.js"
import { DEFAULT_TABS } from "@/config"
const tab = useTabsStore()
const { proxy }: any = getCurrentInstance()
const store = useSystemStore()
const accountRef = ref<any>(Form)
const router = useRouter()

const accountLogin = async () => {
  let account = accountRef.value
  if (await account.validates()) {
    const { phone, password } = account.formData
    let res = await login({
      phone,
      password
    })
    if (res.code === 200) {
      ElMessage.success("登录成功")
      store.user = res.data[0]
      proxy.$cache.set("user", res.data[0])
      router.push("/")
      tab.tabs = DEFAULT_TABS
    } else ElMessage.error("账号或密码错误")
  }
}

defineExpose({
  accountLogin
})
</script>

<style lang="less" scoped></style>
