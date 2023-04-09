export const formConfig = {
  formItems: [
    {
      prop: "nid",
      type: "select",
      label: "新闻分类",
      placeHolder: "请选择分类",
      options: []
    },
    {
      prop: "compress",
      type: "select",
      label: "压缩率",
      placeHolder: "请选择压缩率",
      options: [
        { label: "0%", value: 1 },
        { label: "30%", value: 0.7 },
        { label: "50%", value: 0.5 },
        { label: "70%", value: 0.3 },
        { label: "100%", value: 0 }
      ]
    }
  ],
  labelWidth: "70px",
  colLayout: {
    xl: 11,
    lg: 11, // ≥1200px
    md: 11, // ≥992px
    sm: 11, // ≥768px
    xs: 11 // <768px
  }
}
export const titleConfig = {
  formItems: [
    {
      prop: "title",
      type: "input",
      placeHolder: "请输入标题...",
      lSlot: "lSlot",
      rSlot: "rSlot"
    }
  ],

  labelWidth: "px",
  colLayout: {
    xl: 24
  },
  itemStyle: { margin: "15px 0 " }
}
