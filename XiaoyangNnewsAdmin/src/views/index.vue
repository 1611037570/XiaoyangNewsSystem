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
        <div class="main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "@/components/Menus/index.vue"
import Header from "@/components/Header/index.vue"
import { useSystemStore } from "@/stores/system"
const store = useSystemStore()
// const before = (el: Element) => {
//   gsap.set(el, {
//     width: 200
//   })
// }
// const enter = (el: Element, done: gsap.Callback) => {
//   console.log("11111111 :>> ", 11111111)
//   gsap.to(el, {
//     width: 200,
//     onComplete: done
//   })
// }
// const leave = (el: Element, done: gsap.Callback) => {
//   console.log("11111111 :>> ", 11111111)

//   gsap.to(el, {
//     width: 60,
//     onComplete: done
//   })
// }
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
    border: 1px solid red;
    margin: 12px;
    padding: 20px;
    background-color: #f5efe9;
  }
}
</style>
