<template>
  <Search :formConfig="formConfig"></Search>
  <Table v-bind="tableConfig"></Table>
  2
</template>

<script setup lang="ts">
import Search from "@/components/Search/index.vue"
import Table from "@/components/Table/index.vue"
import { formConfig } from "./form.config.js"

import { tableConfig } from "./table.config.js"
</script>

<style lang="less" scoped></style>
