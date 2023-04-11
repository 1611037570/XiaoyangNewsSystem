export const formConfig = {
  formItems: [
    {
      prop: "id",
      type: "input",
      label: "ID",
      placeHolder: "请输入ID名",
      display: true
    },
    {
      prop: "title",
      type: "input",
      label: "分类",
      placeHolder: "请输入分类名"
    }
  ],
  labelWidth: "60px",
  colLayout: {
    xl: 24
  },
  check: ["title"],
  rules: {
    title: [{ required: true, message: "不能空缺内容", trigger: "blur" }]
  }
}
