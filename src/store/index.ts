import { createStore } from 'vuex'

import { IRootState } from './types'

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

export default store
