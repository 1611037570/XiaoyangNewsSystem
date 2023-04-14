<template>
  <el-tabs
    v-model="store.isTab"
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
import { useTabsStore } from "@/stores/tab"
import { getCurrentInstance } from "vue"
import { useRouter } from "vue-router"

const { proxy }: any = getCurrentInstance()
const router = useRouter()
proxy.$bus.on("addTabs", (tab: any) => {
  addTab(tab)
})
const store = useTabsStore()

let editableTabs = store.tabs
store.isTab = editableTabs[0].name

// 路由跳转
const click = (pane?: any) => {
  let tab = editableTabs[pane.index]
  router.push(tab.content)
}
// 添加
const addTab = (tab: any) => {
  let flag = editableTabs.find((item: any) => {
    if (item.name === tab.name) {
      router.push(tab.path)
      return true
    }
    return false
  })

  if (flag) return
  store.isTab = tab.name
  editableTabs.push({
    title: tab.name,
    name: tab.name,
    content: tab.path
  })
}
const removeTab = (targetName: any) => {
  if (targetName === editableTabs[0].name) {
    return ElMessage.warning("工作台不能关闭 ！！！")
  }
  //获取路由下标
  const index = editableTabs.findIndex(
    (item: any) => item.content === router.currentRoute.value.path
  )
  //获取当前选中的tab下标
  const current = editableTabs.findIndex((item: any) => item.name === targetName)
  //删除当前选中tab
  editableTabs.splice(current, 1)
  if (index == current) {
    store.isTab = editableTabs[current - 1].name
    router.push(editableTabs[current - 1].content)
  }
}
</script>
<style>
.demo-tabs {
  margin-left: 20px;
  height: 40px;
}
:deep(.el-tabs__content) {
  padding: 0;
  border: 1px solid red;
}
</style>
