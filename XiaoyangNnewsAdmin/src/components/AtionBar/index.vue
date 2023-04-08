<template>
  <Form v-bind="config"></Form>
</template>

<script setup lang="ts">
import { unify } from "@/service/api/unify"
import { formConfig } from "./form.config.js"
let config = reactive(formConfig)
console.log("config :>> ", config)
let nav: any = []
// 请求所有分类数据
let res = await unify({
  name: "nav",
  all: true
})
// 分类数据格式化
res.data.forEach((n: { title: any; id: any }) => {
  nav.push({
    label: n.title,
    value: n.id
  })
})
config.formItems[0].options = nav
</script>

<style lang="less" scoped></style>
