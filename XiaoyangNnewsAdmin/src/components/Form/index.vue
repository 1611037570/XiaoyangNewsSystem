<template>
  <div class="form">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 封装elForm -->
    <el-form
      ref="formRef"
      :label-width="labelWidth"
      label-position="left"
      hide-required-asterisk
      :rules="rules"
      :model="formData"
    >
      <el-row :gutter="20">
        <!-- 根据配置动态添加 -->
        <template v-for="item in formItems">
          <el-col v-bind="colLayout" class="inputbox">
            <slot :name="item.lSlot"> </slot>
            <el-form-item
              v-if="!item.display"
              :label="item.label"
              label-position="left"
              :prop="item.prop"
              :style="itemStyle"
              :key="item.prop"
              style="flex: 1"
            >
              <!-- 输入框 和 密码框 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeHolder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.prop}`]"
                ></el-input>
              </template>
              <!-- 下拉框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="item.placeHolder"
                  v-model="formData[`${item.prop}`]"
                >
                  <!-- 下拉框 -->
                  <el-option
                    v-for="option in item.options"
                    :label="option.label"
                    :key="option.value"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <!-- 时间框 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker style="width: 100%" v-model="formData[`${item.prop}`]">
                </el-date-picker>
              </template>
              <!-- 文本框 -->
              <template v-else-if="item.type === 'textarea'">
                <el-form-item style="width: 100%; height: 100%">
                  <el-input
                    type="textarea"
                    v-model="formData[`${item.prop}`]"
                  ></el-input> </el-form-item
              ></template>
            </el-form-item>
            <slot :name="item.rSlot"> </slot>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 尾部插槽 -->
    <div class="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus"
import { defineEmits, reactive, ref, watch } from "vue"
interface Props {
  formDatas?: Object // 表单数据
  formItems?: Array<any> // 表单框数据
  rules?: FormRules // 表单校验规则
  labelWidth?: string // label宽度
  itemStyle?: Object | string //   item样式
  colLayout?: Object // 行排列大小
}
const props = withDefaults(defineProps<Props>(), {
  formDatas: () => {
    return {}
  },
  formItems: () => [],
  rules: () => {
    return {}
  },
  colLayout: () => {
    return {
      xl: 6,
      lg: 8, // ≥1200px
      md: 12, // ≥992px
      sm: 24, // ≥768px
      xs: 24 // <768px
    }
  },
  itemStyle: () => {
    return {}
  },
  labelWidth: "80px"
})
const emit = defineEmits(["formDataUp"])
let formData = reactive({ ...props.formDatas })
watch(
  formData,
  (newValue, oldValue) => {
    emit("formDataUp", newValue)
  },
  { deep: true }
)
const formRef = ref<FormInstance>()

const validates = async () => {
  return await formRef.value?.validate((valid: boolean) => {
    return valid
  })
}

defineExpose({
  formData,
  validates
})
</script>

<style lang="less">
.inputbox {
  width: 100%;
  display: flex !important;
  align-items: center;
}
.el-form-item__error {
  left: 50% !important;

  transform: translateX(-50%);
}

.el-textarea__inner {
  height: 160px !important;
}
</style>
