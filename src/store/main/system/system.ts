import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData,
  getPageData
} from '@/service/main/system/system'
import { ElMessage } from 'element-plus'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      queryInfo: {},
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0,
      storyList: [],
      storyCount: 0,
      storyMain: {},
      commentList: [],
      commentCount: 0
    }
  },
  mutations: {
    changeQueryInfo(state, info: any) {
      state.queryInfo = info
    },
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
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    },
    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    },
    changeStoryList(state, storyList: any[]) {
      state.storyList = storyList
    },
    changeStoryCount(state, storyCount: number) {
      state.storyCount = storyCount
    },
    changeStoryMain(state, storyMain: any) {
      state.storyMain = storyMain
    },
    changeCommentList(state, commentList: any[]) {
      state.commentList = commentList
    },
    changeCommentCount(state, commentCount: number) {
      state.commentCount = commentCount
    }
  },
  getters: {
    getListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    getListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 保存查询条件的action
    saveQueryInfoAction({ commit }, payload: any) {
      const info = {
        offset: (payload.pageInfo.currentPage - 1) * payload.pageInfo.pageSize,
        size: payload.pageInfo.pageSize,
        ...payload.queryInfo
      }
      commit('changeQueryInfo', info)
    },

    async getPageDataAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const pageUrl = payload.pageUrl
      const pageResult = await getPageData(pageUrl)

      if (pageName === 'story') {
        commit('changeStoryMain', pageResult.data)
      } else if (pageName === 'comment') {
        commit('changeCommentList', pageResult.data.list)
        commit('changeCommentCount', pageResult.data.totalCount)
      }
    },

    async getPageListAction({ commit }, payload: any) {
      // 1. 根据传入的页面名称获取对应url
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 2. 拿到请求数据，对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3. 将数据存储到state中
      const { list, totalCount } = pageResult.data
      const pageNameFirstCharUpper =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      // 通过mutation改变state
      commit(`change${pageNameFirstCharUpper}List`, list)
      commit(`change${pageNameFirstCharUpper}Count`, totalCount)
    },
    async deletePageDataAction(context, payload: any) {
      // 1. 获取pageName和id
      // payload 需要 pageName 和 id
      const { pageName, id, imageId } = payload
      const pageUrl =
        pageName === 'goods'
          ? `/${pageName}/${id}/${imageId}`
          : `/${pageName}/${id}`

      // 2. 调用删除的网络请求
      await deletePageData(pageUrl)

      if (pageName === 'comment') return
      // 3. 重新获取数据
      // 拿取当前查询信息
      const info = context.state.queryInfo
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          ...info
        }
      })
    },
    async createPageDataAction(context, payload: any) {
      // 1. 创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      const result = await createPageData(pageUrl, newData)
      if (result?.code === 200) {
        ElMessage.success('新建成功')
      } else {
        ElMessage.error('新建失败')
      }

      if (
        pageName === 'story' ||
        pageName === 'comment' ||
        pageName.slice(0, 7) === 'comment'
      )
        return
      // 2. 请求最新的数据
      // 拿取当前查询信息
      const info = context.state.queryInfo
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          ...info
        }
      })
    },
    async editPageDataAction(context, payload: any) {
      // 1. 编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      const result = await editPageData(pageUrl, editData)
      if (result?.code === 200) {
        ElMessage.success('编辑成功')
      } else {
        ElMessage.error('编辑失败')
      }

      // 2. 请求最新的数据
      // 拿取当前查询信息
      const info = context.state.queryInfo
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          ...info
        }
      })
    }
  }
}

export default systemModule
