export const searchConfig = {
  pageName: "users",
  formItems: [
    {
      prop: "id",
      type: "input",
      label: "ID",
      placeHolder: "请输入ID"
    },
    {
      prop: "text",
      type: "input",
      label: "内容",
      placeHolder: "请输入内容"
    },
    {
      prop: "name",
      type: "input",
      label: "作者",
      placeHolder: "请输入作者"
    }
  ],
  labelWidth: "60px",
  colLayout: {
    xl: 12,
    lg: 12, // ≥1200px
    md: 12, // ≥992px
    sm: 24, // ≥768px
    xs: 24 // <768px
  }
}
