<template>
  <div class="search">
    <Form v-bind="props.searchConfig" ref="formRef">
      <template #footer>
        <div class="btns">
          <el-button type="primary" @click="reset()">重置</el-button>
          <el-button type="primary" @click="select()">搜索 </el-button>
        </div>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts">
import Form from "@/components/Form/index.vue"
import { useTableStore } from "@/stores/table"
import { ref } from "vue"
const store = useTableStore()
type Props = {
  searchConfig: { [key: string]: any }
}

const props = withDefaults(defineProps<Props>(), {})

let formRef = ref()
// 清空搜索表单
const reset = () => {
  store.search = {}
  for (let key in formRef.value.formData) {
    formRef.value.formData[key] = ""
  }
  store.renewTbale()
}
// 搜索提交事件
const select = async () => {
  if (props.searchConfig.rules) {
    // 有校验规则
    if (await formRef.value.validates) {
      store.search = formRef.value.formData
    }
  } else {
    // 无校验规则
    store.search = formRef.value.formData
  }
  store.renewTbale()
}
onBeforeMount(() => {
  store.search = {}
})
</script>

<style lang="less" scoped>
.search {
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  // display: flex;
  .btns {
    justify-items: end;
  }
}
</style>
