<template>
  <PieEchart :data="data" class="box"> </PieEchart>
  <router-view></router-view>
  <Index></Index>
</template>
<script setup lang="ts">
import Index from "@/views/index.vue"
import { PieEchart } from "@/components/Echarts/"

let data = [
  { value: 1048, name: "用户" },
  { value: 735, name: "作者" }
]
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
</style>
