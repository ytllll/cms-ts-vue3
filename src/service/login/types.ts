export interface IAccount {
  name: string
  password: string
}

// 登录的data的数据数据类型
export interface ILoginResult {
  id: number
  name: string
  token: string
  overTime: number
}

// post请求的数据类型
// export interface IDataType<T = any> {
//   code: number
//   data: T
// }
