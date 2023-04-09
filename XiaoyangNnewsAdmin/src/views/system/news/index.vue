<template>
  <div>
    <Search :searchConfig="searchConfig"></Search>
    <Table v-bind="tableConfig">
      <!-- 新建按钮 -->
      <template v-slot:newBtn="{ title }">
        <el-button type="primary" @click="edit()">新建{{ title }}</el-button>
      </template>
      <!-- 图片展示 -->
      <template #text="scope">
        <el-image loading="lazy" style="width: 60px; height: 60px" :src="imgFilter(scope.row.text)">
        </el-image>
        <!-- 查看图片图层有bug -->
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

const router = useRouter()
// 编辑或新建
const edit = (row?: any) => {
  if (row == undefined) {
    router.push({
      path: "/main/add"
    })
    return
  }
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
