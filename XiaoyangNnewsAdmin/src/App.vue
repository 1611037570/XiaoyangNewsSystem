<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import { innerTextBtn } from "@/components/Editor/innerTextBtn.js"
import { InnerimgBtn } from "@/components/Editor/innerImgBtn.js"
import { Boot } from "@wangeditor/editor"
import type { IDomEditor } from "@wangeditor/editor"
import { getCurrentInstance } from "vue"

// 富文本菜单注册
const { proxy }: any = getCurrentInstance()
class NewInnerimgBtn extends InnerimgBtn {
  exec(editor: IDomEditor, value: any) {
    if (this.isDisabled(editor)) return
    proxy.$bus.emit("innerImgClick")
  }
}
const inImgBtn = {
  key: "inImgBtn",
  factory() {
    return new NewInnerimgBtn()
  }
}
Boot.registerMenu(innerTextBtn)
Boot.registerMenu(inImgBtn)
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
