<template>
  <div class="login-controller">
    <div class="login-box">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="账号登录2" name="account"></el-tab-pane>
        <el-tab-pane label="验证登录" name="phone"> </el-tab-pane>
        <transition mode="out-in" enter-active-class="animate__animated animate__bounceInLeft">
          <keep-alive>
            <Account key="account" v-if="current == true"></Account>
            <Phone key="phone" v-else></Phone>
          </keep-alive>
        </transition>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import "animate.css"
import Account from "./account.vue"
import Phone from "./phone.vue"
import type { TabsPaneContext } from "element-plus"

const activeName = ref("account")
const current = ref<boolean>(true)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log("tab.paneName :>> ", tab.paneName)

  if (tab.paneName == "account") current.value = true
  else current.value = false
}
</script>

<style lang="less" scoped>
.login-controller {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .login-box {
    width: 400px;
  }
  :deep(.el-tabs__nav) {
    width: 100%;
  }
  :deep(.el-tabs__item) {
    text-align: center;
    padding: 0;
    flex: 1;
    width: 50%;
  }
}
</style>
