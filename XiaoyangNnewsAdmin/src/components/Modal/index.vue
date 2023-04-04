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
import { unify } from "@/service/api/unify"
import { useTableStore } from "@/stores/table"
const store = useTableStore()
const { proxy }: any = getCurrentInstance()
let formDatas = reactive({})
let title = ref("")
// 全局事件
proxy.$bus.on("openModal", (row: any) => {
  if (row) title.value = "修改"
  else title.value = "新建"
  formDatas = row
})
onBeforeUnmount(() => {
  proxy.$bus.off("openModal")
})
type Props = {
  formConfig: { [key: string]: any }
  newCb?: String
  editCb?: String
}
const props = withDefaults(defineProps<Props>(), {})
let formRef = ref()
const emit = defineEmits(["newCb", "editCb"])
// 编辑or新建操作
const handle = async () => {
  // 是否有校验规则并且是否校验通过
  if (props.formConfig.rules && !(await formRef.value.validates())) return
  // 数据查重校验
  if (!(await check())) return
  // 是否自定义事件
  if (props.newCb == "true") {
    emit("newCb", { title: title.value, data: formRef.value.formData })
    return
  }
  if (props.editCb == "true") {
    emit("editCb", { title: title.value, data: formRef.value.formData })
    return
  }
  // 提交操作
  commit()
}
// 数据查重校验
const check = async () => {
  if (props.formConfig.check) {
    let key: Array<string>[] = props.formConfig.check // 要检测的字段数组
    let data = reactive({}) // 后端需求对象格式
    key.forEach((k: any) => {
      data[k] = formRef.value.formData[k].toString()
    })
    let res
    // 严格模式查找数据
    res = await unify({ name: store.name, strict: true, all: true, data })
    // 新建操作 和单表处理
    if (store.name == "nav" || title.value == "新建") {
      if (res.code === 200) {
        ElMessage.error("数据已存在！")
        return false
      }
    } else {
      if (res.code != 400) {
        // 数据库字段编辑
        let id: string
        if (store.name == "news") id = "newsId"
        else if (store.name == "note") id = "uid"
        else id = "id"
        // 数据存在
        if (res.data[0][id] != formRef.value.formData[id]) {
          ElMessage.error("数据已存在！")
          return false
        }
      }
    }
  }
  return true
}
// 提交操作
const commit = () => {
  store.modal = formRef.value.formData
  store.commitList(title.value)
}
// 关闭组件事件
const exit = () => {
  store.visible = false
}
</script>

<style lang="scss" scoped></style>
