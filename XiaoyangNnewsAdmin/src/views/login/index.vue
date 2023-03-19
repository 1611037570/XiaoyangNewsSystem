<template>
  <div class="login-controller">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="账号登录2" name="first"></el-tab-pane>
      <el-tab-pane label="验证登录" name="second"> </el-tab-pane>
    </el-tabs>
  </div>
  <transition mode="out-in" leave-active-class="animate__animated animate__rotateOut">
    <keep-alive>
      <Account v-if="activeName == 'first'"></Account>
      <Phone v-else></Phone>
    </keep-alive>
  </transition>
</template>
<script lang="ts" setup>
import "animate.css"
import Account from "./account.vue"
import Phone from "./phone.vue"
import type { TabsPaneContext } from "element-plus"

const activeName = ref("first")
const current = ref(true)
const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (activeName.value == "first") {
    current.value = true
  } else current.value = false
  console.log("current :>> ", current)
}
const test = () => {
  console.log("11111111111 :>> ", 11111111111)
}
</script>

<style lang="less" scoped>
.login-controller {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  //   background: url("../../assets/img/login-bg.svg");
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  width: 500px;
}
</style>
