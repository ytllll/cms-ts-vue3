<template>
  <div class="chat">
    <el-form ref="formDataRef" :model="formData">
      <el-form-item class="titleFormItem" label="标题" prop="title">
        <el-input type="text" v-model="formData.title" />
      </el-form-item>
      <el-form-item class="introFormItem" label="介绍" prop="intro">
        <el-input type="text" v-model="formData.intro" />
      </el-form-item>
      <el-form-item prop="content">
        <tl-editor v-model:value="htmlString" />
      </el-form-item>
      <el-form-item class="submitFormItem">
        <el-button type="primary" @click="submitForm(formDataRef)"
          >发布故事</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from '@/store'
import TlEditor from '@/base-ui/editor'
import { ElForm } from 'element-plus'

export default defineComponent({
  name: 'chat',
  components: {
    TlEditor
  },
  setup() {
    const store = useStore()
    const formDataRef = ref<InstanceType<typeof ElForm>>()

    const htmlString = ref<string>('')

    const formData = reactive({
      title: '',
      intro: '',
      content: htmlString
    })

    const submitForm = async () => {
      console.log({ ...formData, userId: store.state.login.userInfo.id })
      await store.dispatch('system/createPageDataAction', {
        pageName: 'story',
        newData: { ...formData, userId: store.state.login.userInfo.id }
      })
    }

    return {
      formDataRef,
      formData,
      htmlString,
      submitForm
    }
  }
})
</script>

<style scoped lang="less">
.chat {
  position: relative;
  .titleFormItem {
    width: 60%;
    padding-top: 20px;
    padding-left: 10px;
    font-weight: 700;
  }
  .introFormItem {
    width: 90%;
    padding-left: 10px;
    font-weight: 700;
  }
  .submitFormItem {
    position: absolute;
    bottom: -10;
    right: 0;
  }
}
</style>
