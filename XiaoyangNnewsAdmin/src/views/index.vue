<template>
  <el-container class="controller">
    <el-aside width="200px"> <Menu></Menu></el-aside>
    <el-container>
      <el-header>
        <transition mode="out-in" leave-active-class="animate__animated animate__rotateOut">
          <keep-alive>
            <el-icon size="30" key="enter" v-if="isCollapse" @click="isCollapse = !isCollapse">
              <i-ep-fold />
            </el-icon>
            <el-icon size="30" key="leave" v-else @click="isCollapse = !isCollapse">
              <i-ep-expand />
            </el-icon>
          </keep-alive>
        </transition>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "@/components/Menus/index.vue"
import "animate.css"
const isCollapse = ref(true)
</script>

<style lang="less" scoped>
.controller {
  height: 100%;
  :deep(.el-menu-item-group__title) {
    padding: 0;
  }
  :deep(.el-container) {
    height: 100%;
  }
}
</style>
