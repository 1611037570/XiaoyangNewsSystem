export const searchConfig = {
  pageName: "users",
  formItems: [
    {
      prop: "id",
      type: "input",
      label: "ID",
      placeHolder: "请输入ID名"
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
    xl: 12,
    lg: 12, // ≥1200px
    md: 12, // ≥992px
    sm: 24, // ≥768px
    xs: 24 // <768px
  }
}
