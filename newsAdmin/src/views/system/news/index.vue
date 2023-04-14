<template>
  <div>
<<<<<<< HEAD
    <!-- 搜索组件 -->
    <Search :searchConfig="searchConfig"></Search>
    <!-- 表格组件 -->
=======
    <Search :searchConfig="searchConfig"></Search>
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
    <Table v-bind="tableConfig">
      <!-- 新建按钮 -->
      <template v-slot:newBtn="{ title }">
        <el-button type="primary" @click="edit()">新建{{ title }}</el-button>
      </template>
      <!-- 图片展示 -->
      <template #text="scope">
        <el-image loading="lazy" style="width: 60px; height: 60px" :src="imgFilter(scope.row.text)">
        </el-image>
<<<<<<< HEAD
        <!-- TODO: 查看图片图层有bug -->
=======
        <!-- 查看图片图层有bug -->
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
        <!-- :preview-src-list="[imgFilter(scope.row.text)]" -->
      </template>
      <!-- 热度格式化 -->
      <template #heat="scope">
        <el-button type="danger">{{ scope.row.heat }}</el-button>
      </template>
      <!-- 时间格式化 -->
      <template #time="scope">
        {{ timeFilter(scope.row.time) }}
      </template>
      <!-- 编辑按钮 -->
      <template #edit="{ row }">
        <el-button type="primary" @click.stop="edit(row)">编辑</el-button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { tableConfig } from "./table.config.js"
import { searchConfig } from "./search.config.js"
import { useRouter } from "vue-router"
import { timeFilter } from "@/utils/timeFilter.js"
import { imgFilter } from "@/utils/imgFilter.js"
import { useTabsStore } from "@/stores/tab"
import { getCurrentInstance } from "vue"

const tabs = useTabsStore()
const { proxy }: any = getCurrentInstance()
<<<<<<< HEAD
// 点击事件
=======
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
const click = (tab: any) => {
  tabs.isTab = tab.name
  proxy.$bus.emit("addTabs", tab)
}
const router = useRouter()
// 编辑或新建
const edit = (row?: any) => {
  if (row == undefined) {
<<<<<<< HEAD
    // 新建
=======
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
    click({
      name: "创作新闻",
      title: "创作新闻",
      path: "/main/add"
    })
    router.push({
      path: "/main/add"
    })
    return
  }
<<<<<<< HEAD
  // 编辑
=======
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
  click({
    name: "创作新闻",
    title: "创作新闻",
    path: "/main/add"
  })
  router.push({
    path: "/main/add",
    query: { newsId: row.newsId }
  })
}
</script>

<style lang="less" scoped>
:deep(.el-button) {
  margin: 10px;
}
</style>
