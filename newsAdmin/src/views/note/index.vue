<template>
  <div>
    <Search :formConfig="searchConfig"></Search>
    <Table v-bind="tableConfig" name="note"></Table>
    <Modal :formConfig="formConfig" @callback="callback" newCb="true"> </Modal>
  </div>
</template>

<script>
import { tableConfig } from "./table.config.js"
import { searchConfig } from "./search.config.js"
import { formConfig } from "./form.config.js"
import { mapGetters } from "vuex"
import { unifyAdd, unifyRenew } from "@/service/api/unify"
export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      formConfig
    }
  },
  computed: {
    ...mapGetters("user", {
      uid: "getUID"
    })
  },
  methods: {
    async callback(datas) {
      let { name, data, title } = datas

      data = { uid: this.uid, ...data }
      console.log("data :>> ", data)
      delete data.name
      let res
      if (title == "新建") res = await unifyAdd({ name, data })
      else res = await unifyRenew({ name, data })
      if (res.code === 200) {
        this.$message.success(title + "成功")
        this.$store.commit("unify/saveData", {})
        this.$store.commit("unify/saveVisible", false)
        this.$store.dispatch("unify/getList")
      } else this.$message.error(title + "失败")
    }
  }
}
</script>

<style lang="less" scoped></style>
