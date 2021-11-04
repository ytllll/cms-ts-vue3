type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFromItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对其他特殊属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFromItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}