import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'

import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'ytllll',
      age: 18,
      height: '1.8'
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    // 注册状态管理的login模块
    login
  }
})

// 解决刷新页面，Vuex中的数据丢失问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 为了更好的使用vuex和typescript，自己封装的useStore
// 明确useStore的数据类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
