<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
      @newBtnClick="handleNewData"
      @EditBtnClick="handleEditData"
    />
    <page-modal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigComputed"
      ref="pageModalRef"
      pageName="menu"
      v-model="typeData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'tl-menu',
  components: {
    PageContent,
    PageModal
  },
  setup() {
    const typeData = ref<any>({})

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    // 2. 动态添加部门和角色列表
    const store = useStore()
    let modalConfigComputed = modalConfig
    watch(typeData, () => {
      const parentItem = modalConfig.formItems.find(
        (item) => item.field === 'parentId'
      )
      parentItem!.options = []
      let type3: any[] = []
      if (typeData.value.type !== 1) {
        parentItem!.options = store.state.entireMenu.map((item) => {
          switch (typeData.value.type) {
            case 2:
              return item.type === 1 && { title: item.name, value: item.id }
            case 3: {
              const result = item.children.map((item2: any) => {
                return (
                  item2.type === 2 && { title: item2.name, value: item2.id }
                )
              })
              result.forEach((res: any) => type3.push(res))
              break
            }
            default:
              break
          }
        })
      }
      if (typeData.value.type === 3) parentItem!.options = type3
      modalConfigComputed = modalConfig
    })

    return {
      typeData,
      contentTableConfig,
      modalConfigComputed,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
