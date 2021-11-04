import { createApp } from 'vue'
import App from './App.vue'

import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

// 全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

import router from './router'
import store from './store'
import { setupStore } from './store'

// import './service/axios_demo'
// import tlRequest from './service'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
// 全局注册element-plus
// app.use(ElementPlus)
// 方式一：app.use(function(app)) app.use可以传入一个函数，参数默认传入app
// app.use(globalRegister)
// 方式二：
// globalRegister(app)

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// tlRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的config')
//         return config
//       },
//       responsetInterceptor: (res) => {
//         console.log('单独响应的res')
//         return res
//       }
//     }
//     // 设置showLoading，决定是否显示加载画面
//     // showLoding: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

// tlRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     // 设置showLoading，决定是否显示加载画面
//     showLoding: false
//   })
//   .then((res) => {
//     // console.log(res.data)
//     // console.log(res.returnCode)
//     // console.log(res.success)
//     return res
//   })
