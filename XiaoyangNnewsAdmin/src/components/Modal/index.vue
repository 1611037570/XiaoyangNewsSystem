<template>
  <div>
    <el-dialog
      v-if="store.visible"
      v-model="store.visible"
      width="500px"
      center
      :append-to-body="true"
      :title="title"
    >
      <Form v-if="store.visible" :formDatas="formDatas" v-bind="formConfig" ref="formRef">
        <template #footer>
          <span>
            <el-button type="primary" @click="handle()">{{ title }}</el-button>
            <el-button @click="exit()">取消</el-button>
          </span>
        </template>
      </Form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useTableStore } from "@/stores/table"
const store = useTableStore()
const { proxy }: any = getCurrentInstance()
let formDatas = reactive({})
// 全局事件
proxy.$bus.on("openModal", (row: any) => {
  formDatas = row
})

let title = "hhhh"
// this.$bus.$on("editClick", (row) => {
//   this.formDatas = { ...row }
// })
// 销毁全局总线事件
// beforeDestroy() {
//   this.$bus.$off("editClick")
// },

// title() {
//   if (Object.keys(this.formDatas).length !== 0) return "修改"
//   else return "新建"
// }

// visible: {
//   get() {
//     return this.$store.getters["unify/getVisible"]
//   },
//   set() {
//     this.$store.commit("unify/saveVisible", false)
//     return false
//   }
// }
// props: {
//   // 表单配置
//   formConfig: {
//     type: Object
//   },
//   name: {},
//   newCb: {
//     type: String,
//     default: "false"
//   }
// },
type Props = {
  formConfig: { [key: string]: any }
  newCb?: String
}

const props = withDefaults(defineProps<Props>(), {})
// 编辑or新建操作
const handle = async () => {}
const exit = () => {}
</script>

<style lang="scss" scoped></style>
