import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
  sendSms,
  phoneLoginRequest
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenuToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

// 导入login和root的类型
import { IRootState } from '../types'
import { ILoginState } from './types'
import { IAccount, IPhoneSms } from '@/service/login/types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    // 设置vuex中的token值
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 在这里进行路由映射 userMenus => routes
      const routes = mapMenuToRoutes(userMenus)
      // 将routes 添加到 router.main.children里
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult: any = await accountLoginRequest(payload)
      // console.log(loginResult)
      // console.log(loginResult.data.id, loginResult.data.token)
      if (loginResult) {
        const { id, token, overTime } = loginResult.data
        // 通过mutations修改数据
        commit('changeToken', token)
        localCache.setCache('token', token)
        localCache.setCache('overTIme', overTime)

        // 发送初始化数据的请求（完整的role/department） 调用根里的action要写第三个参数
        dispatch('getInitialDataAction', null, { root: true })

        // 2.请求用户信息
        const userInfoResult = await requestUserInfoById(id)
        // console.log(userInfoResult)
        const userInfo = userInfoResult.data
        // console.log(userInfo)
        commit('changeUserInfo', userInfo)
        localCache.setCache('userInfo', userInfo)

        // 3.请求用户菜单
        const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
        const userMenus = userMenusResult.data
        // console.log(userMenus)
        commit('changeUserMenus', userMenus)
        localCache.setCache('userMenus', userMenus)

        // 4.跳到首页
        router.push('/main')
      } else {
        return { code: 400 }
      }
    },
    async sendSmsAction({ commit }, payload: IPhoneSms) {
      console.log(commit)
      const result = await sendSms(payload.number)
      return result.code
    },
    async phoneLoginAction({ commit, dispatch }, payload: IPhoneSms) {
      // 1.实现登录逻辑
      const loginResult: any = await phoneLoginRequest(payload)
      // console.log(loginResult)
      // console.log(loginResult.data.id, loginResult.data.token)
      if (loginResult) {
        const { id, token, overTime } = loginResult.data
        // 通过mutations修改数据
        commit('changeToken', token)
        localCache.setCache('token', token)
        localCache.setCache('overTIme', overTime)

        // 发送初始化数据的请求（完整的role/department） 调用根里的action要写第三个参数
        dispatch('getInitialDataAction', null, { root: true })

        // 2.请求用户信息
        const userInfoResult = await requestUserInfoById(id)
        // console.log(userInfoResult)
        const userInfo = userInfoResult.data
        // console.log(userInfo)
        commit('changeUserInfo', userInfo)
        localCache.setCache('userInfo', userInfo)

        // 3.请求用户菜单
        const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
        const userMenus = userMenusResult.data
        // console.log(userMenus)
        commit('changeUserMenus', userMenus)
        localCache.setCache('userMenus', userMenus)

        // 4.跳到首页
        router.push('/main')
      } else {
        return { code: 400 }
      }
    },
    // 刷新页面后，将本地的数据重新加入Vuex
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化数据的请求（完整的role/department） 调用根里的action要写第三个参数
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    async getUserInfo({ commit }, payload: any) {
      const { id } = payload
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      if (userInfo) {
        commit('changeUserInfo', userInfo)
        localCache.setCache('userInfo', userInfo)
      }
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default loginModule
