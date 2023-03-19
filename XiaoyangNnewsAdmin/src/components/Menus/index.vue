<template>
  <Menu :menus="data" class="controller"></Menu>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue"
import type Menus from "./type"

const data = reactive<Menus[]>([
  {
    id: "1",
    name: "首页",
    level: 1,
    children: [
      {
        id: "1-1",
        name: "二级首页",
        path: "/main/1",
        level: 2
      },
      {
        id: "1-2",
        name: "二级首页",
        path: "/main/2",
        level: 2
      }
    ]
  },
  {
    id: "2",
    name: "分类",
    path: "/",
    level: 1
  },
  {
    id: "3",
    name: "一级test",
    level: 1,
    children: [
      {
        id: "3-1",
        name: "二级test",
        level: 2,
        path: "/"
      }
    ]
  }
])
</script>

<style lang="less" scoped></style>
