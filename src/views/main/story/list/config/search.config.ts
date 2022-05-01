import { IForm } from '@/base-ui/form/types/index'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    xl: 6, // ≥1920px 显示4个
    lg: 8, // ≥1200px 3
    md: 12, // ≥992px 2
    sm: 24, // ≥768px 1
    xs: 24 // <768px 1
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '故事标题',
      placeholder: '请输入故事标题'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '发布时间',
      placeholder: '请选择发布时间段',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
