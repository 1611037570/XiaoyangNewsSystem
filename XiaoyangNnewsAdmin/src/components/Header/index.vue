<template>
  <div class="header">
    <div class="left">
      <!-- 滚动按钮 -->
      <div class="collapse">
        <transition mode="out-in" leave-active-class="animate__animated animate__rotateOut">
          <keep-alive>
            <el-icon
              size="25"
              key="enter"
              v-if="store.isCollapse"
              @click="store.isCollapse = !store.isCollapse"
            >
              <i-ep-expand />
            </el-icon>
            <el-icon size="25" key="leave" v-else @click="store.isCollapse = !store.isCollapse">
              <i-ep-fold />
            </el-icon>
          </keep-alive>
        </transition>
      </div>
      <!-- 子菜单 -->
      <div>
        <Tab></Tab>
        <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item to="{path:'/'}">promotion management</el-breadcrumb-item>
          <el-breadcrumb-item>{{ store.breadcrumb.name }}</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
    </div>

    <div class="">
      <Dropdown></Dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import "animate.css"
import { useSystemStore } from "@/stores/system"

const store = useSystemStore()
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid;
  padding: 0 20px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    vertical-align: bottom;
    .collapse {
      height: 24px;
    }
    :deep(.el-breadcrumb) {
      margin-left: 15px;
      font-size: 16px;
    }
    .breadcrumb {
      font-size: 120px !important;
    }
  }
}
</style>
