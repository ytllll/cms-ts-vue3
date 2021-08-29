import axios from 'axios'

// axios的实例对象
// 1. 模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})

// // 2. get请求，并传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'coderytl',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 3. post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'ytllll',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 4. axios的配置选项
// 4.1. aixos的全局配置
axios.defaults.baseURL = 'http://httpbin.org'
// 配置默认数据请求超时时间
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// 4.2. aixos局部配置
// axios
//   .get('/get', {
//     params: {
//       name: 'coderytl',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 3. post请求
// axios
//   .post('/post', {
//     data: {
//       name: 'ytllll',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 5. axios.all
axios
  .all([
    axios.get('/get', { params: { name: 'ytl', age: 18 } }),
    axios.post('/post', { data: { name: 'ytl', age: 18 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// 6.axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 拦截下来后想做的才做在这里执行
    // 1.给请求添加token
    // 2.isLoding的动画
    console.log('请求成功的拦截')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

// fn1: 数据响应成功(服务器正常的返回了数据 状态码一般在20x)
// fn2: 数据响应失败
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
