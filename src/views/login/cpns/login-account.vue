<template>
  <div class="login-account">
    <!-- 把rules传入form表单，进行校验 -->
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <!-- 定义prop的名字，根据名字校验 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- show-password 属性，隐藏密码 -->
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
// 验证规则
import { rules } from '../config/account-config'
import localCache from '../../../utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // 拿到form对象，确定form的实例类型
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      // validate 验证结果对的就返回true，错的就返回false
      formRef.value?.validate((valid) => {
        if (valid) {
          //1. 判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            // 将用户名加入本地缓存
            localCache.setCache('name', account.name)
            // 将密码加入本地缓存
            localCache.setCache('password', account.password)
          } else {
            // localCache.deleteCahe('name')
            // 不记住密码就删除缓存
            localCache.deleteCahe('password')
          }
          //2. 开始进行登录验证
          store
            .dispatch('login/accountLoginAction', { ...account })
            .then((value) => {
              if (value?.code === 400) {
                ElMessage.error('登录失败，请输入正确的账号和密码')
              }
            })
          // console.log(account)
        } else {
          ElMessage.error('登录失败，请输入正确的账号和密码')
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
