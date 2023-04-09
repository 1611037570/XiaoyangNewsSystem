export const loginConfig = {
  formItems: [
    {
      prop: "phone",
      type: "input",
      placeHolder: "请输入账号"
    },
    {
      prop: "password",
      type: "password",
      placeHolder: "请输入密码"
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
    ]
  },
  labelWidth: "0px",
  colLayout: {
    xl: 24
  },
  itemStyle: { margin: "15px 0 " }
}
