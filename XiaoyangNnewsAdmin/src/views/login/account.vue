<template>
  <div>
    <Form v-bind="loginConfig" ref="accountRef"></Form>
    <el-button @click="accountLogin"></el-button>
  </div>
</template>

<script setup lang="ts">
import Form from "@/components/Form/index.vue"
import { login } from "@/service/api/system"
import { loginConfig } from "./login.js"
import { useSystemStore } from "@/stores/system"
const store = useSystemStore()
const { proxy }: any = getCurrentInstance()
const accountRef = ref<any>(null)

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
      store.saveMenu()
      proxy.$cache.set("user", res.data[0])
    } else ElMessage.error("账号或密码错误")
  }
}
</script>

<style lang="less" scoped></style>
