<template>
  <div class="page-content">
    <tl-table
      v-bind="contentTableConfig"
      :listData="datalist"
      @selectionChange="handleSelectionChange"
    >
      <!-- 1. header中的插槽 -->
      <template #headerHandle>
        <el-button type="primary" size="medium">新建用户</el-button>
        <el-button type="danger" size="medium">删除选中</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-refresh"
        ></el-button>
      </template>

      <!-- 2. 用户列表中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <!-- utc时间格式化 -- 正常时间格式化 -->
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handler">
          <el-button size="mini" type="text" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button size="mini" type="text" icon="el-icon-delete"
            >删除</el-button
          >
        </div>
      </template>
    </tl-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

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
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      qureyInfo: {
        offset: 0,
        size: 10
      }
    })

    const datalist = computed(() =>
      store.getters[`system/getListData`](props.pageName)
    )

    return {
      datalist
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
