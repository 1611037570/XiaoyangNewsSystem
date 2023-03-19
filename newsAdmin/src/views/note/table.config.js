export const tableConfig = {
  title: "文案",
  propList: [
    { prop: "id", label: "ID", sort: true, width: "80px" },
    { prop: "text", label: "内容" },
    {
      prop: "name",
      label: "作者",
      width: "100px"
    }
  ],
  pages: { pageIndex: 0, pageSize: 5, pageSizes: [5, 10, 15, 20] }
}
