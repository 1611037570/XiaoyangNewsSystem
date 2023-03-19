export const formConfig = {
  pageName: "users",
  formItems: [
    {
      prop: "id",
      type: "input",
      label: "ID",
      placeHolder: "请输入ID",
      display: true
    },
    {
      prop: "text",
      type: "textarea",
      label: "内容",
      placeHolder: "请输入内容"
    }
  ],
  rules: {
    text: [{ required: true, message: "不能空缺内容", trigger: "blur" }]
  },
  labelWidth: "60px",
  colLayout: {
    xl: 24
  }
}
