export const tableConfig = {
  title: "用户",
  propList: [
    { prop: "id", label: "ID", sort: true },
    { prop: "phone", label: "账号" },
    { prop: "password", label: "密码" },
    { prop: "name", label: "姓名" },
    { prop: "role", label: "权限", slotName: "role" }
  ],
  pages: { pageIndex: 0, pageSize: 4, pageSizes: [4, 8, 12, 16] }
}
