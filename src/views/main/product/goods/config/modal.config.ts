import { IForm } from '@/base-ui/form/types/index'

export const modalConfig: IForm = {
  title: '新建商品',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称',
      rules: [{ required: true, message: '必须输入上面名称', trigger: 'blur' }]
    },
    {
      field: 'desc',
      type: 'input',
      label: '商品描述',
      placeholder: '请输入商品描述'
    },
    {
      field: 'newPrice',
      type: 'input',
      label: '现价格',
      placeholder: '请输入现价格',
      rules: [{ required: true, message: '必须输入现价格', trigger: 'blur' }]
    },
    {
      field: 'oldPrice',
      type: 'input',
      label: '原价格',
      placeholder: '请输入原价格'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { title: '可用', value: 1 },
        { title: '下架', value: 0 }
      ]
    },
    {
      field: 'inventoryCount',
      type: 'input',
      label: '库存',
      placeholder: '请输入库存'
    },
    {
      field: 'saleCount',
      type: 'input',
      label: '销量',
      placeholder: '请输入销量'
    },
    {
      field: 'favorCount',
      type: 'input',
      label: '收藏',
      placeholder: '请输入收藏量'
    },
    {
      field: 'address',
      type: 'input',
      label: '地址',
      placeholder: '请输入地址'
    },
    {
      field: 'categoryId',
      type: 'select',
      label: '商品类别',
      placeholder: '请选择商品类别',
      options: []
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
