import { IForm } from '@/base-ui/form/types/index'

export const modalConfig: IForm = {
  title: '新建角色',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名',
      rules: [{ required: true, message: '必须输入角色名称', trigger: 'blur' }]
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
