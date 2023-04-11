<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    @tab-click="click"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable="editableTabs.length > 1 ? false : true"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { useSystemStore } from "@/stores/system"
import { ref, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
const { proxy }: any = getCurrentInstance()
const router = useRouter()
proxy.$bus.on("addTabs", (tab: any) => {
  addTab(tab)
})
const store = useSystemStore()

let editableTabs = store.tabs
const editableTabsValue = ref("1")
let tabIndex = ref(editableTabs.length)
console.log("tabIndex :>> ", tabIndex)
console.log("editableTabsValue :>> ", editableTabsValue)
// 路由跳转
const click = (pane?: any) => {
  let tab = editableTabs[pane.index]
  router.push(tab.content)
}
// 添加
const addTab = (tab: any) => {
  let flag = editableTabs.find((item: any) => {
    if (item.name === tab.name) {
      console.log("tab :>> ", tab)
      router.push(tab.path)
      return true
    }
    return false
  })

  if (flag) return
  console.log("111 :>> ", 111)
  const newTabName = ++tabIndex.value
  editableTabs.push({
    title: tab.name,
    name: tab.name,
    content: tab.path
  })

  editableTabsValue.value = newTabName.toString()
  console.log("object :>> ", editableTabsValue)
}
const removeTab = (targetName: any) => {
  if (targetName === editableTabs[0].name) {
    return ElMessage.warning("工作台不能关闭 ！！！")
  }
  //获取路由下标
  const index = editableTabs.findIndex((item: any) => item.name === router.currentRoute.value.name)
  //获取当前选中的tab下标
  const current = editableTabs.findIndex((item: any) => item.name === targetName)
  //删除当前选中tab
  editableTabs.splice(current, 1)
  //判断当前下标和路由下标是否相同，是->跳转前一位路由
  if (index === current) {
    router.push(editableTabs[index - 1].name)
  }
}
</script>
<style>
/* .demo-tabs > .el-tabs__content {
} */
.demo-tabs {
  margin-left: 20px;
  height: 40px;
}
:deep(.el-tabs__content) {
  padding: 0;
  border: 1px solid red;
}
</style>
