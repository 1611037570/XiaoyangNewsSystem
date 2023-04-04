<template>
  <!-- <el-config-provider locale="zhCn"> -->
  <router-view></router-view>
  <!-- </el-config-provider> -->
  <el-button @click="send">111</el-button>
</template>
<script setup lang="ts">
// import zhCn from "element-plus/dist/locale/zh-cn.mjs"
const ws = new WebSocket("ws://127.0.0.1:9998")
ws.onopen = () => {
  console.log("连接服务器成功！ ")
}
ws.onmessage = (msg) => {
  console.log("msg :>> ", msg)
}
const send = () => {
  ws.send(
    JSON.stringify({
      action: "1"
    })
  )
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
</style>
