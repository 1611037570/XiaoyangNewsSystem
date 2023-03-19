<template>
  <div class="news">
    <Search :formConfig="searchConfig"></Search>
    <Table v-bind="tableConfig" name="user">
      <template #role="scope">
        <el-button v-if="scope.row.role == 0" type="success">管理员</el-button>
        <el-button v-else-if="scope.row.role == 1" type="warning"
          >作者</el-button
        >
        <el-button v-else>用户</el-button>
      </template>
    </Table>
    <Modal :formConfig="formConfig"></Modal>
  </div>
</template>

<script>
import { tableConfig } from "./table.config.js"
import { searchConfig } from "./search.config.js"
import { formConfig } from "./form.config.js"

export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      formConfig
    }
  }
}
</script>

<style lang="less" scoped></style>
