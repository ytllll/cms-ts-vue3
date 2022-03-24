<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="modalConfig.title"
      width="30%"
      center
      destroy-on-close
    >
      <page-form
        v-bind="modalConfig"
        v-model="formData"
        @validateForm="validateFormClick"
      />
      <slot></slot>
      <template v-if="modalConfig.title === '新建商品'">
        <el-upload
          ref="uploadRef"
          class="goods-upload"
          action="/api/file/picture"
          name="picture"
          :limit="1"
          :on-success="uploadSuccess"
        >
          <el-button type="primary">上传商品图片</el-button>
        </el-upload>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import type { ElUpload } from 'element-plus'

import PageForm from '@/base-ui/form'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    modalValue: {
      type: Object,
      required: false
    },
    submitUpload: {
      type: Function,
      default: () => ({})
    }
  },
  components: {
    PageForm
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const store = useStore()

    const dialogVisible = ref(false)

    const formData = ref<any>({})

    const uploadRef = ref<InstanceType<typeof ElUpload>>()
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    watch(
      formData,
      (newValue) => {
        if (newValue.type) {
          emit('update:modelValue', { type: newValue.type })
        }
      },
      { deep: true }
    )

    let imageId: number | null
    function uploadSuccess(response: any) {
      imageId = response.data.insertId
    }

    let formRef: any
    const validateFormClick = (formref: any) => {
      formRef = formref
    }

    const handleConfirmClick = async () => {
      if (!formRef.value) return
      formRef.value.validate((valid: any) => {
        if (valid) {
          dialogVisible.value = false
        } else {
          console.log('error submit!')
        }
      })

      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        if (props.pageName === 'goods') {
          store.dispatch('system/editPageDataAction', {
            pageName: props.pageName,
            editData: { ...formData.value, ...props.otherInfo, imageId },
            id: props.defaultInfo.id
          })
        } else if (props.pageName === 'users-updatePassword') {
          await store.dispatch('system/editPageDataAction', {
            pageName: props.pageName.split('-')[0],
            editData: { ...formData.value, ...props.otherInfo },
            id: store.state.login.userInfo.id
          })
        } else {
          await store.dispatch('system/editPageDataAction', {
            pageName: props.pageName,
            editData: { ...formData.value, ...props.otherInfo },
            id: props.defaultInfo.id
          })
          if (props.pageName === 'users') {
            store.dispatch('login/getUserInfo', {
              id: props.defaultInfo.id
            })
          }
        }
      } else {
        // 新建
        if (props.pageName === 'goods') {
          await store.dispatch('system/createPageDataAction', {
            pageName: props.pageName,
            newData: { ...formData.value, ...props.otherInfo, imageId }
          })
        } else {
          await store.dispatch('system/createPageDataAction', {
            pageName: props.pageName,
            newData: { ...formData.value, ...props.otherInfo }
          })
        }
      }
      imageId = null
    }

    return {
      dialogVisible,
      formData,
      validateFormClick,
      handleConfirmClick,
      uploadRef,
      uploadSuccess
    }
  }
})
</script>

<style scoped lang="less"></style>
