<template>
  <div>
    <el-button size="small" @click="addTab(editableTabsValue)"> add tab </el-button>
  </div>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    @tab-click="click"
    @tab-change="test"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable="editableTabs.length > 1 ? false : true"
    >
      <!-- {{ item.content }} -->
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { useSystemStore } from "@/stores/system"
import { ref } from "vue"

const store = useSystemStore()
let tabIndex = 2
const editableTabsValue = ref("2")

const editableTabs = ref([
  {
    title: "Tab 1",
    name: "1",
    content: "Tab 1 content"
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content"
  }
])

const test = (name: string) => {
  console.log("test :>> ", name)
}
console.log("editableTabs.length > 1  :>> ", editableTabs.value.length > 1 ? false : true)
const click = (pane?: any) => {
  let tab = editableTabs.value[pane.index]
}
// 添加
const addTab = (targetName: string) => {
  console.log("object :>> ", targetName)
  const newTabName = `${++tabIndex}`
  console.log(" store.tab :>> ", store.tab)

  editableTabs.value.push({
    title: store.tab.name,
    name: store.tab.name,
    content: store.tab.path
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
