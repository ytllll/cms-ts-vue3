<template>
  <div class="page-content">
    <tl-table
      v-bind="contentTableConfig"
      :listData="datalist"
      :listCount="dataCount"
      v-model:page="pageInfo"
      @selectionChange="handleSelectionChange"
    >
      <!-- 1. header中的插槽 -->
      <template #headerHandle>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
        >
          {{ `新建${contentTableConfig.title.slice(0, 2)}` }}
        </el-button>
      </template>

      <!-- 2. 用户列表中的插槽 -->
      <template #createAt="scope">
        <!-- utc时间格式化 -- 正常时间格式化 -->
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler">
          <el-button
            v-if="isUpdate"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在pageContent中动态的插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </tl-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'

import TlTable from '@/base-ui/table'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    TlTable
  },
  emits: ['newBtnClick', 'EditBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // console.log(props.contentTableConfig.title)

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送网络请求  注意：因为接口定义页数是从0开始的，而table分页只能从第一页开始，所以offset的当前页要-1来发送请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return // 如果没有查询权限，直接返回

      // 派发保存当前查询条件的信息
      store.dispatch('system/saveQueryInfoAction', {
        pageInfo: pageInfo.value,
        queryInfo: queryInfo
      })

      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取数据
    const datalist = computed(() =>
      store.getters[`system/getListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/getListCount`](props.pageName)
    )

    // 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propsList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 这里可以进行选中行的数据操作
    const handleSelectionChange = (e: any) => {
      console.log(e)
    }

    // 删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      if (props.pageName === 'goods') {
        store.dispatch('system/deletePageDataAction', {
          pageName: props.pageName,
          id: item.id,
          imageId: item.imageId
        })
      } else {
        store.dispatch('system/deletePageDataAction', {
          pageName: props.pageName,
          id: item.id
        })
      }
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    const handleEditClick = (item: any) => {
      emit('EditBtnClick', item)
    }

    return {
      props,
      datalist,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleSelectionChange,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
