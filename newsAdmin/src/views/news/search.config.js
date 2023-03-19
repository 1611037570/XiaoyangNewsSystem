export const searchConfig = {
  pageName: "users",
  formItems: [
    {
      prop: "newsId",
      label: "ID",
      type: "input",
      display: true
    },
    {
      prop: "ntitle",
      label: "标题",
      type: "input"
    },
    {
      prop: "text",
      label: "内容",
      type: "input"
    },
    {
      prop: "title",
      label: "分类",
      type: "input"
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
