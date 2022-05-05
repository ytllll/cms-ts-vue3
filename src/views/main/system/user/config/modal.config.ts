import { IForm } from '@/base-ui/form/types/index'

export const modalConfig: IForm = {
  title: '新建用户',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [
        { required: true, message: '必须输入用户名', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{6,20}$/,
          message: '必须是6~20个字母或者数字',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false,
      rules: [
        { required: true, message: '必须输入密码', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{6,}$/,
          message: '必须是6~20个字母或者数字',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
      rules: [
        { required: true, message: '必须输入电话号码', trigger: 'blur' },
        {
          pattern: /^1[345789]\d{9}$/,
          message: '请输入正确的电话号码',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: [],
      rules: [{ required: true, message: '必须选择角色', trigger: 'blur' }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
