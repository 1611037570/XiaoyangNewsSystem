export const tableConfig = {
  title: "新闻",
  propList: [
    { prop: "newsId", label: "ID", sort: true, width: "80px" },
    { prop: "ntitle", label: "标题" },
    { prop: "text", label: "图片", slotName: "text", width: "100px" },
    { prop: "name", label: "作者", width: "110px" },
    { prop: "time", label: "时间", sort: true, slotName: "time" },
    {
      prop: "heat",
      label: "热度",
      sort: true,
      width: "120px",
      slotName: "heat"
    },
    { prop: "title", label: "分类" }
  ],
  pages: { pageIndex: 0, pageSize: 5, pageSizes: [5, 10, 15, 20] }
}
