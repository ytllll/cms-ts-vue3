type IFormType = 'input' | 'password' | 'select' | 'datepicker' | 'file'

export interface IFromItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对其他特殊属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  title?: string
  formItems: IFromItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
