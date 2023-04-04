<template>
  <Search :searchConfig="searchConfig"></Search>
  <Table v-bind="tableConfig"></Table>
  <Modal :formConfig="formConfig"></Modal>
</template>

<script setup lang="ts">
import { searchConfig } from "./search.config.js"
import { tableConfig } from "./table.config.js"
import { formConfig } from "./form.config.js"
</script>

<style lang="less" scoped></style>
