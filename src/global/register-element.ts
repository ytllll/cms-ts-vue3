import { App } from 'vue'
// 基础样式可以统一引用
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElForm,
  ElInput,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElFormItem
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElInput,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElFormItem
]
// 封装element-plus的组件局部注册
export default function (app: App): void {
  // 组件全局注册
  for (const component of components) {
    app.component(component.name, component)
  }
}