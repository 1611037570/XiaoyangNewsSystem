<template>
  <el-menu default-active="1-1" router>
    <template v-for="menu in menus">
      <!-- 一级菜单 -->
      <el-sub-menu class="" v-if="menu.children != null" :index="menu.id" :key="menu.id">
        <template #title>
          <el-icon><i-ep-setting /> </el-icon>
          <span>{{ menu.name }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item-group>
          <el-menu-item v-for="m in menu.children" :index="m.path" :key="m.id">
            {{ m.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 无二级菜单 -->
      <el-menu-item v-else :index="menu.path">
        <el-icon><i-ep-setting /> </el-icon>
        <template #title>{{ menu.name }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import type Menus from "./type"
defineProps<{
  menus?: Menus[]
}>()
</script>

<style lang="less" scoped></style>
