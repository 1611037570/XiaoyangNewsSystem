<template>
  <div>
    <el-dialog
      v-if="visible"
      :visible.sync="visible"
      width="500px"
      center
      :append-to-body="true"
      :title="title"
    >
      <Form
        v-if="visible"
        :formDatas="formDatas"
        v-bind="formConfig"
        ref="formRef"
      ></Form>
      <template #footer>
        <span>
          <el-button type="primary" @click="handle()">{{ title }}</el-button>
          <el-button @click="exit()">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { unify, unifyAdd, unifyRenew } from "@/service/api/unify"
import { mapGetters } from "vuex"

export default {
  name: "Modal",
  data() {
    return {
      formDatas: {}
    }
  },
  mounted() {
    this.$bus.$on("editClick", (row) => {
      this.formDatas = { ...row }
    })
  },
  // 销毁全局总线事件
  beforeDestroy() {
    this.$bus.$off("editClick")
  },
  computed: {
    ...mapGetters("unify", {
      config: "getData"
    }),
    ...mapGetters("user", {
      uid: "getUID"
    }),
    title() {
      if (Object.keys(this.formDatas).length !== 0) return "修改"
      else return "新建"
    },
    visible: {
      get() {
        return this.$store.getters["unify/getVisible"]
      },
      set() {
        this.$store.commit("unify/saveVisible", false)
        return false
      }
    }
  },
  props: {
    // 表单配置
    formConfig: {
      type: Object
    },
    name: {},
    newCb: {
      type: String,
      default: "false"
    }
  },

  methods: {
    // 编辑or新建操作
    async handle() {
      // 是否需要表单检验
      if (this.formConfig.rules != undefined) {
        let validate = this.$refs.formRef.validates()
        if (!validate) {
          this.$message.error("不能空缺内容")
          return
        }
      }
      let name = this.$store.getters["unify/getName"]
      let res
      // 数据重复校验
      if (this.formConfig.check != undefined) {
        let k = this.formConfig.check[0]
        let v = this.config[k]
        let data = {}
        data[k] = v
        res = await unify({ name, strict: true, all: true, data })
        if (this.title == "新建") {
          if (res.code === 200) {
            this.$message.error("已存在该信息")
            return
          }
        } else {
          let id
          if (name == "news") id = "newsId"
          else if (name == "note") id = "uid"
          else id = "id"
          let data = res.data[0]
          if (data[id] != this.uid) {
            this.$message.error("你要修改的数据以存在")
            return
          }
        }
      }
      // 是否自定义事件
      if (this.newCb == "true") {
        this.$emit("callback", { title: this.title, name, data: this.config })
        return
      }
      if (this.editCb == "true") {
        this.$emit("callback", { title: this.title, name, data: this.config })
        return
      }
      // 新建或修改请求
      if (this.title == "新建")
        res = await unifyAdd({ name, data: this.config })
      else res = await unifyRenew({ name, data: this.config })
      // 判断结果
      console.log("objec111111111111111111t :>> ", this.title)
      if (res.code === 200) {
        this.$message.success(this.title + "成功")
        this.$store.commit("unify/saveData", {})
        this.$store.commit("unify/saveVisible", false)
        this.$store.dispatch("unify/getList")
      } else this.$message.error(this.title + "失败")
    },
    exit() {
      this.$store.commit("unify/saveVisible", false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
