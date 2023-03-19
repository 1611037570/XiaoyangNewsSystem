<template>
  <div>
    <Search :formConfig="searchConfig"></Search>
    <Table v-bind="tableConfig" name="nav"></Table>
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
