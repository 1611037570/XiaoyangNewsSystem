<template>
  <el-container class="controller">
    <el-aside :style="{ width: store.isCollapse == true ? '65px' : '200px' }">
      <Suspense>
        <Menu></Menu>
      </Suspense>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <Suspense>
          <router-view></router-view>
        </Suspense>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "@/components/Menus/index.vue"
import Header from "@/components/Header/index.vue"
import { useSystemStore } from "@/stores/system"
const store = useSystemStore()
</script>

<style lang="less" scoped>
.controller {
  transition: all 0.5s linear;
  height: 100%;
  :deep(.el-header) {
    padding: 0;
  }

  :deep(.el-aside) {
    transition: width 1s;
  }
  :deep(.el-main) {
    box-sizing: border-box;
    height: 100%;
    padding: 10px;
    background-color: #f5efe9;
  }
}
</style>
