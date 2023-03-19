<template>
  <div class="form">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 封装elForm -->
    <el-form
      ref="ruleFormRef"
      :label-width="labelWidth"
      label-position="left"
      hide-required-asterisk
      :rules="rules"
      :model="formData"
    >
      <el-row :gutter="20">
        <!-- 根据配置动态添加el-form-item -->
        <template v-for="item in formItems">
          <el-col v-bind="colLayout" :key="item.prop">
            <el-form-item
              v-if="!item.display"
              :label="item.label"
              label-position="left"
              :prop="item.prop"
              :style="itemStyle"
            >
              <!-- 输入框 和 密码框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
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
                  <!-- 下拉属性 -->
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
                <el-date-picker
                  style="width: 100%"
                  v-model="formData[`${item.prop}`]"
                >
                </el-date-picker>
              </template>
              <!--  -->
              <template v-else-if="item.type === 'textarea'">
                <el-form-item style="height: 120px">
                  <el-input
                    type="textarea"
                    v-model="formData[`${item.prop}`]"
                  ></el-input> </el-form-item
              ></template>
            </el-form-item>
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

<script>
export default {
  name: "Form",
  data() {
    return {
      formData: {}
    }
  },
  props: {
    // 表单数据
    formDatas: {
      require: true
    },
    // 表单状态数据
    formItems: { type: Array, default: () => [] },
    // label宽度
    labelWidth: { type: String, default: "" },
    // 行排列数据
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
    },
    // 表单规则
    rules: {
      type: Object,
      default: () => {}
    }, // 表单行样式
    itemStyle: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.$store.commit("unify/saveData", val)
      },
      deep: true
    },
    formDatas: {
      handler() {
        this.formData = { ...this.formDatas }
      },
      deep: true
    }
  },
  created() {
    // 初始化表单数据
    this.formData = { ...this.formDatas }
  },
  methods: {
    // 触发表单校验
    validates() {
      let validate = false
      this.$refs.ruleFormRef.validate((valid) => {
        validate = valid
      })
      return validate
    }
  }
}
</script>

<style lang="less">
.el-form-item__error {
  left: 50% !important;

  transform: translateX(-50%);
}

.el-textarea__inner {
  height: 160px !important;
}
</style>
