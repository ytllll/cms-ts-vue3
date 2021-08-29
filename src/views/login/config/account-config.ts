// 编写校验规则
export const rules = {
  name: [
    {
      // 要求是必传的
      required: true,
      // 提示文字
      message: '用户名必须输入',
      // 失去焦点时验证，还有一个change，是修改时验证
      trigger: 'blur'
    },
    {
      // 正则校验
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必须输入',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
