import { IForm } from '@/base-ui/form/types/index'

export const modalConfig: IForm = {
  title: '修改密码',
  formItems: [
    {
      field: 'oldPassword',
      type: 'password',
      label: '原密码',
      placeholder: '请输入原密码',
      isHidden: false,
      rules: [
        {
          required: true,
          message: '密码必须输入',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'newPassword1',
      type: 'password',
      label: '新密码',
      placeholder: '请输入新密码',
      isHidden: false,
      rules: [
        {
          required: true,
          message: '密码必须输入',
          trigger: 'blur'
        },
        {
          pattern: /^[a-zA-Z0-9]{6,}$/,
          message: '密码必须是6位以上的字母或数字',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'newPassword2',
      type: 'password',
      label: '再输一次',
      placeholder: '请再输入一次新密码',
      isHidden: false,
      rules: [
        {
          required: true,
          message: '密码必须输入',
          trigger: 'blur'
        },
        {
          pattern: /^[a-zA-Z0-9]{6,}$/,
          message: '密码必须是6位以上的字母或数字',
          trigger: 'blur'
        }
      ]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
