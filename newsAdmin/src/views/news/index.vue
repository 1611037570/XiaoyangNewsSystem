<template>
  <div>
    <Search :formConfig="searchConfig"></Search>
    <Table v-bind="tableConfig" name="news">
      <!-- 新建按钮 -->
      <template v-slot:newBtn="{ title }">
        <el-button type="primary" @click="edit()">新建{{ title }}</el-button>
      </template>
      <!-- 图片展示 -->
      <template #text="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="imgFilter(scope.row.text)"
          :preview-src-list="[imgFilter(scope.row.text)]"
        >
        </el-image>
      </template>
      <!-- 热度格式化 -->
      <template #heat="scope">
        <el-button type="danger">{{ scope.row.heat }}</el-button>
      </template>
      <!-- 时间格式化 -->
      <template #time="scope">
        {{ scope.row.time | timeFilter }}
      </template>
      <!-- 编辑按钮 -->
      <template #edit="{ row }">
        <el-button type="primary" @click.stop="edit(row)">编辑</el-button>
      </template>
    </Table>
  </div>
</template>

<script>
import { tableConfig } from "./table.config.js"
import { searchConfig } from "./search.config.js"
export default {
  data() {
    return {
      tableConfig,
      searchConfig
    }
  },
  methods: {
    edit(row) {
      if (row == undefined) {
        let routeUrl = this.$router.resolve({
          path: "/addnews"
        })
        window.open(routeUrl.href, "_blank")
        return
      }
      const routeUrl = this.$router.resolve({
        path: "/addnews",
        query: { newsId: row.newsId }
      })
      window.open(routeUrl.href, "_blank")
    }
  }
}
</script>

<style lang="less" scoped></style>
