<template>
  <BarEchart :data="data" :x-data="yData"></BarEchart>
</template>

<script setup lang="ts">
import { BarEchart } from "@/components/Echarts/"
let data = [
  {
    name: "djy",
    value: 1
  },
  {
    name: "李雪滢",
    value: 6
  },
  {
    name: "admin",
    value: 7
  }
]
let yData = ["djy", "李雪滢", "admin"]
</script>

<style lang="less" scoped></style>
