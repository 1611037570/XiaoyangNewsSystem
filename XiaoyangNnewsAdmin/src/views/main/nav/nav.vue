<template>
  <Table v-bind="tableConfig"></Table>
  2
</template>

<script setup lang="ts">
import Table from "@/components/Table/index.vue"
import { tableConfig } from "./table.config.js"
</script>

<style lang="less" scoped></style>
