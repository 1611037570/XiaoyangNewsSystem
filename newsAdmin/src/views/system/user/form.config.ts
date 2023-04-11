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
  rules: {
    phone: [
      { required: true, message: "必须输入账号", trigger: "blur" },
      {
        pattern: /^[a-z0-9]{6,20}$/,
        message: "必须是6~20个字母或者数字",
        trigger: "blur"
      }
    ],
    password: [
      { required: true, message: "必须输入密码", trigger: "blur" },
      {
        pattern: /^[a-z0-9]{6,20}$/,
        message: "必须是6~20个字母或者数字",
        trigger: "blur"
      }
    ],
    name: [{ required: true, message: "必须输入", trigger: "blur" }],
    role: [{ required: true, message: "必须输入", trigger: "blur" }]
  },
  labelWidth: "60px",
  check: ["phone"],
  colLayout: {
    xl: 24
  }
}
