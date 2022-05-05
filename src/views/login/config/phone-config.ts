// 编写校验规则
export const rules = {
  number: [
    {
      // 要求是必传的
      required: true,
      // 提示文字
      message: '手机号码必须输入',
      // 失去焦点时验证，还有一个change，是修改时验证
      trigger: 'blur'
    },
    {
      // 正则校验
      pattern: /^1[345678]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码必须输入',
      trigger: 'blur'
    }
  ]
}
