import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'

import { getPageListData } from '@/service/main/system/system'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'ytllll',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
      entireCategory: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    },
    changeEntireCategory(state, list) {
      state.entireCategory = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1. 请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      const categoryResult = await getPageListData('category/list', {
        offset: 0,
        size: 1000
      })
      const { list: categoryList } = categoryResult.data

      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
      commit('changeEntireCategory', categoryList)
    }
  },
  modules: {
    // 注册状态管理的login模块
    login,
    system,
    dashboard
  }
})

// 解决刷新页面，Vuex中的数据丢失问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // 在这里发送数据请求，可能会再登录的时候还没拿到token就发送了请求产生bug
  // store.dispatch('getInitialDataAction')
}

// 为了更好的使用vuex和typescript，自己封装的useStore
// 明确useStore的数据类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
