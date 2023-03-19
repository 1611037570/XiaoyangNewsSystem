export const formConfig = {
  pageName: "users",
  formItems: [
    { prop: "id", type: "input", label: "ID", sort: true, display: true },
    { prop: "phone", type: "input", label: "账号" },
    { prop: "password", type: "input", label: "密码" },
    { prop: "name", type: "input", label: "姓名" },
    {
      prop: "role",
      type: "select",
      label: "权限",
      placeHolder: "请选择权限",
      options: [
        { label: "管理员", value: 0 },
        { label: "作者", value: 1 },
        { label: "用户", value: 2 }
      ]
    }
  ],
  labelWidth: "60px",
  colLayout: {
    xl: 24
  }
}
