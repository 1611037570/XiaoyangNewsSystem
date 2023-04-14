<template>
  <div>
    <Search :searchConfig="searchConfig"></Search>
    <Table v-bind="tableConfig"></Table>
    <Modal :formConfig="formConfig" @newCb="callback" @editCb="callback" newCb="true" editCb="true">
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { tableConfig } from "./table.config.js"
import { searchConfig } from "./search.config.js"
import { formConfig } from "./form.config.js"
import { unifyAdd, unifyRenew } from "@/service/api/unify"
import { ElMessage } from "element-plus"

// pinia模块
import { useSystemStore } from "@/stores/system"
import { useTableStore } from "@/stores/table"
import { getCurrentInstance } from "vue"

const { proxy }: any = getCurrentInstance()
const system = useSystemStore()
const table = useTableStore()
// 回调函数
const callback = async (datas: any) => {
  // 数据格式化
  let { data, title } = datas
  let config = {
    name: table.name,
    data: { uid: system.user.id, ...data }
  }
  // 按需调用
  let res
  if (title == "新建") res = await unifyAdd(config)
  else res = await unifyRenew(config)
  if (res.code === 200) {
    ElMessage.success(title + "成功")
    if (title == "新建") {
      proxy.$socket.send({
        action: "get",
        socketType: "renewEchart"
      })
    }
    table.renewTbale()
    table.visible = false
  } else ElMessage.error(title + "失败")
}
</script>

<style lang="less" scoped></style>
