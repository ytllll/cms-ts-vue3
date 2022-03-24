<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          :src="
            avatarUrl
              ? avatarUrl
              : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
          "
          class="avatarC"
        ></el-avatar>
        <span>{{ useName }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick"
            >退出登录
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-info"
            @click="handlePersonalClick"
            divided
            >个人信息</el-dropdown-item
          >
          <el-dropdown-item
            icon="el-icon-unlock"
            divided
            @click="handleEditData"
            >修改密码</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :modalConfig="modalConfig"
      pageName="users-updatePassword"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'

import { usePageModal } from '@/hooks/usePageModal'
import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'

export default defineComponent({
  components: {
    PageModal
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const useName = computed(() => store.state.login.userInfo.name)
    const avatarUrl = computed(() => store.state.login.userInfo.avatar_url)

    const handleExitClick = () => {
      localCache.deleteCahe('token')
      router.push('/main')
    }

    const handlePersonalClick = () => {
      router.push('/main/others/personal')
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()

    return {
      useName,
      avatarUrl,
      handleExitClick,
      handlePersonalClick,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  .avatarC {
    margin-right: 5px;
  }
}
</style>
