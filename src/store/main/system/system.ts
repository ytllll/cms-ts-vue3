import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  getters: {
    getListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1. 根据传入的页面名称获取对应url
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      // 2. 拿到请求数据，对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3. 将数据存储到state中
      const { list, titleCount } = pageResult.data
      const pageNameFirstCharUpper =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      // 通过mutation改变state
      commit(`change${pageNameFirstCharUpper}List`, list)
      commit(`change${pageNameFirstCharUpper}Count`, titleCount)
    }
  }
}

export default systemModule
