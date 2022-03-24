import { IForm } from '@/base-ui/form/types/index'

export const modalConfig: IForm = {
  title: '更新信息',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户名',
      rules: [
        { required: true, message: '必须输入用户名', trigger: 'change' },
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
      label: '用户名称',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
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
      options: []
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
