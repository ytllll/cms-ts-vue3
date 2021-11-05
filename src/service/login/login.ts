import tlRequest from '../index'

import { IAccount, ILoginResult } from './types'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //用法: /users/id
  UserMenus = '/role/' //用法: /role/id/menu
}

export function accountLoginRequest(account: IAccount) {
  return tlRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return tlRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoding: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return tlRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoding: false
  })
}
