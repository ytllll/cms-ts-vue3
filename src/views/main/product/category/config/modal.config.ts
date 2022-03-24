import { IForm } from '@/base-ui/form/types/index'

export const modalConfig: IForm = {
  title: '新建类别',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '类别名称',
      placeholder: '请输入类别名称',
      rules: [{ required: true, message: '必须输入类别名称', trigger: 'blur' }]
    },
    {
      field: 'goodsCount',
      type: 'input',
      label: '商品数量',
      placeholder: '请输入商品数量'
    },
    {
      field: 'goodsSale',
      type: 'input',
      label: '商品销量',
      placeholder: '请输入商品销量'
    },
    {
      field: 'goodsFavor',
      type: 'input',
      label: '商品收藏量',
      placeholder: '请输入商品收藏量'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}
