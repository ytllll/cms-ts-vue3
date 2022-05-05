import { IForm } from '@/base-ui/form/types/index'

export const modalConfig: IForm = {
  title: '新建菜单',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '菜单名',
      placeholder: '请输入菜单名',
      rules: [{ required: true, message: '必须输入菜单名称', trigger: 'blur' }]
    },
    {
      field: 'icon',
      type: 'input',
      label: '图标',
      placeholder: '请输入图标名'
    },
    {
      field: 'type',
      type: 'select',
      label: '选择菜单层级',
      placeholder: '请选择菜单层级',
      options: [
        { title: '一级菜单', value: 1 },
        { title: '二级菜单', value: 2 },
        { title: '三级菜单', value: 3 }
      ],
      rules: [{ required: true, message: '必须选择菜单层级', trigger: 'blur' }]
    },
    {
      field: 'url',
      type: 'input',
      label: '菜单地址',
      placeholder: '请输入菜单地址'
    },
    {
      field: 'parentId',
      type: 'select',
      label: '选择上级菜单',
      placeholder: '请选择上级菜单',
      options: []
    },
    {
      field: 'permission',
      type: 'input',
      label: '按钮权限',
      placeholder: '请输入按钮权限'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
