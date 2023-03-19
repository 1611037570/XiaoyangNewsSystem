export const formConfig = {
  pageName: "users",
  formItems: [
    {
      prop: "pw",
      type: "input",
      label: "旧的密码",
      placeHolder: "请输入原密码"
    },
    {
      prop: "newpw",
      type: "input",
      label: "新的密码",
      placeHolder: "请输入新密码"
    },
    {
      prop: "yespw",
      type: "input",
      label: "确定密码",
      placeHolder: "请确定新密码"
    }
  ],
  labelWidth: "70px",
  colLayout: {
    xl: 24
  },
  rules: {
    pw: [
      { required: true, message: "不能空缺内容", trigger: "blur" },
      {
        pattern: /^[a-z0-9]{6,20}$/,
        message: "必须是6~20个字母或者数字",
        trigger: "blur"
      }
    ],
    newpw: [
      { required: true, message: "不能空缺内容", trigger: "blur" },
      {
        pattern: /^[a-z0-9]{6,20}$/,
        message: "必须是6~20个字母或者数字",
        trigger: "blur"
      }
    ],
    yespw: [
      { required: true, message: "不能空缺内容", trigger: "blur" },
      {
        pattern: /^[a-z0-9]{6,20}$/,
        message: "必须是6~20个字母或者数字",
        trigger: "blur"
      }
    ]
  }
}
