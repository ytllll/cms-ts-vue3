<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" style="width: 90px" />
          <el-button
            type="primary"
            class="get-btn"
            @click="sendCode"
            :disabled="isSmsBtn"
            style="width: 138px"
            >{{ smsBtn }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { rules } from '../config/phone-config'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const store = useStore()

    let smsBtn = ref('获取验证码')
    let isSmsBtn = ref(false)
    const formRef = ref<InstanceType<typeof ElForm>>()

    const phone = reactive({
      number: '',
      code: ''
    })

    const sendCode = () => {
      formRef.value?.validateField(['number'], (isValid: any) => {
        if (isValid) {
          ElMessage.error('发送短信失败，请填写正确的手机号')
          return
        }
        let time = 60
        isSmsBtn.value = true
        store.dispatch('login/sendSmsAction', { ...phone }).then((value) => {
          if (value === 200) {
            ElMessage.success('短信验证码发送成功')
          } else {
            ElMessage.error('短信验证码发送失败')
            return
          }
        })
        const t = setInterval(() => {
          smsBtn.value = `${time--}s 后重新获取`
          if (time === -1) {
            clearInterval(t)
            isSmsBtn.value = false
            smsBtn.value = '获取验证码'
          }
        }, 1000)
      })
    }

    const loginAction = () => {
      // console.log('开始登录')
      formRef.value?.validate((valid) => {
        if (!valid) {
          ElMessage.error('请输入手机号和验证码')
        } else {
          // 开始登录
          store
            .dispatch('login/phoneLoginAction', { ...phone })
            .then((value) => {
              if (value?.code === 400) {
                ElMessage.error('验证码错误')
              }
            })
        }
      })
    }

    return {
      phone,
      rules,
      smsBtn,
      sendCode,
      isSmsBtn,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 10px;
}
</style>
