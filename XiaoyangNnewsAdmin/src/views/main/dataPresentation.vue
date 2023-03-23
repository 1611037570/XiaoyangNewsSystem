<template>
  <BarEchart class="box" :data="data" :x-data="yData"></BarEchart>
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
console.log("111 :>> ")

let yData = ["djy", "李雪滢", "admin"]
</script>

<style lang="less" scoped>
.box {
  height: 400px;
  width: 400px;
  width: 40%;
  border: 1px solid;
  z-index: 999;
}
</style>
