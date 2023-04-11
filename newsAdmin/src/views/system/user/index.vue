<template>
  <Search :searchConfig="searchConfig"></Search>
  <Table v-bind="tableConfig" name="user">
    <template #role="scope">
      <el-button v-if="scope.row.role == 0" type="success">管理员</el-button>
      <el-button v-else-if="scope.row.role == 1" type="warning">作者</el-button>
      <el-button v-else>用户</el-button>
    </template>
  </Table>
  <Modal :formConfig="formConfig"></Modal>
</template>

<script setup lang="ts">
import Search from "@/components/Search/index.vue"
import Table from "@/components/Table/index.vue"
import Modal from "@/components/Modal/index.vue"
import { tableConfig } from "./table.config.js"
import { searchConfig } from "./search.config.js"
import { formConfig } from "./form.config.js"
</script>

<style lang="less" scoped></style>
