<template>
  <div class="personal">
    <tl-card title="头像">
      <el-upload
        class="avatar-uploader"
        action="/api/file/avatar"
        name="avatar"
        :show-file-list="false"
        :headers="myheaders"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
        <img v-else src="@/assets/img/avatarUpload.jpg" class="avatarBg" />
        <div class="nameDiv">
          {{ userInfo.name }}
        </div>
      </el-upload>
    </tl-card>
    <tl-card title="基本信息">
      <el-descriptions :column="1" border extra size="large">
        <el-descriptions-item
          label="用户昵称"
          label-align="center"
          align="left"
          width="50px"
          >{{ userInfo.name }}</el-descriptions-item
        >
        <el-descriptions-item
          label="用户名称"
          label-align="center"
          align="left"
          width="50px"
          >{{ userInfo.realname }}</el-descriptions-item
        >
        <el-descriptions-item
          label="手机号码"
          label-align="center"
          align="left"
          width="50px"
          >{{ userInfo.cellphone }}</el-descriptions-item
        >
        <el-descriptions-item
          label="所在部门"
          label-align="center"
          align="left"
          width="50px"
          >{{ userInfo.department.name }}</el-descriptions-item
        >
        <el-descriptions-item
          label="所属角色"
          label-align="center"
          align="left"
          width="50px"
          >{{ userInfo.role.name }}</el-descriptions-item
        >
        <el-descriptions-item
          label="是否可用"
          label-align="center"
          align="left"
          width="50px"
          >{{ userInfo.enable === 1 ? '启用' : '停用' }}</el-descriptions-item
        >
        <el-descriptions-item
          label="创建时间"
          label-align="center"
          align="left"
          width="50px"
          >{{ $filters.formatTime(userInfo.createAt) }}</el-descriptions-item
        >
        <el-descriptions-item
          label="更新时间"
          label-align="center"
          align="left"
          width="50px"
          >{{ $filters.formatTime(userInfo.updateAt) }}</el-descriptions-item
        >
      </el-descriptions>
      <el-button class="updateBtn" type="primary" @click="handleEditData"
        >更新信息</el-button
      >
    </tl-card>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :modalConfig="modalConfigComputed"
      pageName="users-person"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import localCache from '@/utils/cache'

import { ElMessage } from 'element-plus'

import TlCard from '@/base-ui/card'

import { modalConfig } from './config/modal.config'
import PageModal from '@/components/page-modal'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  components: {
    TlCard,
    PageModal
  },
  setup() {
    const store = useStore()
    const userId = computed(() => store.state.login.userInfo.id)
    const avatarUrl = computed(() => store.state.login.userInfo.avatar_url)
    const userInfo = computed(() => store.state.login.userInfo)

    const token = localCache.getCache('token')
    const myheaders = {
      Authorization: `Bearer ${token}`
    }

    const handleAvatarSuccess = async () => {
      await store.dispatch('login/getUserInfo', {
        id: userId.value
      })
    }

    const beforeAvatarUpload = (file: any) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        ElMessage.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }

    const modalConfigComputed = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const newCallBack = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallBack = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
      return {
        ...userInfo.value,
        departmentId: userInfo.value.department.id,
        roleId: userInfo.value.role.id
      }
    }

    // 3. 调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallBack, editCallBack)

    return {
      avatarUrl,
      myheaders,
      userInfo,
      handleAvatarSuccess,
      beforeAvatarUpload,
      modalConfigComputed,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style lang="less" scoped>
.personal {
  .el-card {
    text-align: left;
    margin-bottom: 20px;
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-size: 20px;
      font-weight: 900;
    }
  }

  .avatar-uploader {
    position: relative;
  }

  .avatar-uploader .el-upload {
    width: 190px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: right;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 10px;
    border: rgb(226, 226, 226) 1px dashed;
  }
  .avatar:hover {
    border: rgb(64, 158, 255) 1px dashed;
  }
  .avatarBg {
    width: 178px;
    height: 178px;
    border: rgb(226, 226, 226) 1px dashed;
    border-radius: 10px;
  }
  .avatarBg:hover {
    border: rgb(64, 158, 255) 1px dashed;
  }
  .nameDiv {
    position: absolute;
    left: 200px;
    top: 20px;
    font-size: 30px;
    font-weight: bolder;
  }
  .updateBtn {
    margin-top: 10px;
  }
}
</style>
