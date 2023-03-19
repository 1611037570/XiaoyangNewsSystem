<template>
  <div class="search">
    <Form v-bind="formConfig" ref="formRef">
      <template #footer>
        <div class="btns">
          <el-button icon="el-icon-refresh" @click="reset()">重置</el-button>
          <el-button icon="el-icon-search" @click="select()">搜索</el-button>
        </div>
      </template>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Search",
  data() {
    return {}
  },
  computed: {
    ...mapGetters("unify", {
      config: "getData"
    }),
    ...mapGetters("unify", {
      page: "getPage"
    })
  },
  props: {
    // 表单配置
    formConfig: {
      type: Object
    }
  },
  methods: {
    reset() {
      this.$store.commit("unify/delData")
      this.$store.dispatch("unify/getList")
    },
    select() {
      this.$store.commit("unify/saveData", this.$refs.formRef.formData)

      let page = this.page
      page.pageIndex = 0
      this.$store.commit("unify/savePage", page)
      this.$store.dispatch("unify/getList", { serach: true })
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 20px;
}
</style>
