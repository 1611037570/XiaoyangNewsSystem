<template>
  <div class="login-controller">
    <div class="login-box">
      <h1>新闻系统后台</h1>
      <div class="box">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="账号登录" name="account"></el-tab-pane>
          <el-tab-pane label="验证登录" name="phone"> </el-tab-pane>

          <transition mode="out-in" enter-active-class="animate__animated animate__bounceInLeft">
            <keep-alive>
              <Account ref="accountRef" key="account" v-if="current == true"></Account>
              <Phone key="phone" v-else></Phone>
            </keep-alive>
          </transition>
        </el-tabs>
      </div>
      <el-button class="login" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import "animate.css"
import Account from "@/components/Login/account.vue"
import Phone from "@/components/Login/phone.vue"
import type { TabsPaneContext } from "element-plus"
import { ref } from "vue"

const activeName = ref("account")
const current = ref<boolean>(true)
const accountRef = ref(Account)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.paneName == "account") current.value = true
  else current.value = false
}

const login = () => {
  if (current.value == true) {
    accountRef.value.accountLogin()
  }
}
</script>

<style lang="less" scoped>
.login-controller {
  h1 {
    text-align: center;
    margin-bottom: 5px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .login-box {
    height: 310px;
    .box {
      height: 175px;
    }
    width: 400px;
    border: 1px solid;
    box-sizing: border-box;
    padding: 20px;
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

  .login {
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>
