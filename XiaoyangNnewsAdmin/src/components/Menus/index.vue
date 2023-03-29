<template>
  <div class="controller">
    <div class="title" v-if="!store.isCollapse">
      <h2>新闻管理系统</h2>
    </div>
    <div class="title" v-else>img</div>
    <el-menu :default-active="$route.path" router :collapse="store.isCollapse">
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
  </div>
</template>

<script setup lang="ts">
import type Menus from "./type"
import { useSystemStore } from "@/stores/system"
const store = useSystemStore()
let menus: Menus[] = store.menu
</script>

<style lang="less" scoped>
.controller {
  border-right: 1px solid;

  .title {
    display: flex !important;
    justify-content: center;
    align-items: center;
    height: 60px;
    transition: all 1.7s;
  }
}

:deep(.el-menu) {
  border: 0;
  transition: all 0.7s;
}
:deep(.el-menu-item-group__title) {
  padding: 0;
}
</style>
