<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      @newBtnClick="handleNewData"
      @EditBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #image="scope">
        <el-image
          style="width: 45px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
      <template #newPrice="scope">{{ '￥' + scope.row.newPrice }}</template>
    </page-content>
    <page-modal
      :modalConfig="modalConfigComputed"
      ref="pageModalRef"
      pageName="goods"
      :defaultInfo="defaultInfo"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/uesPageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()
    const modalConfigComputed = computed(() => {
      const categoryItem = modalConfig.formItems.find(
        (item) => item.field === 'categoryId'
      )
      categoryItem!.options = store.state.entireCategory.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigComputed,
      pageContentRef,
      handleResetClick,
      handleSearchClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less"></style>
