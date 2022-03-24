<template>
  <div class="page-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" ref="formRef" :model="formData">
      <el-row>
        <template v-for="item in myformItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.isHidden"
              :prop="item.field"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFromItem } from '../types'
import { ElForm } from 'element-plus'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    formItems: {
      type: Array as PropType<IFromItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px 显示4个
        lg: 8, // ≥1200px 3
        md: 12, // ≥992px 2
        sm: 24, // ≥768px 1
        xs: 24 // <768px 1
      })
    }
  },
  emits: ['update:modelValue', 'validateForm'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 解构modalValue，创建自己的对象，不能直接引用
    const formData = ref({ ...props.modelValue })
    // 通过自己监听formData发送改变，把formData传送出去

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (formData.value['newPassword1'] !== '') {
          // this.$refs.logonForm.validateField('pwd')
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== formData.value['newPassword1']) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const myformItems = [...props.formItems]
    if (props.title === '修改密码') {
      myformItems[1].rules?.push({
        validator: validatePass,
        trigger: 'blur'
      })
      myformItems[2].rules?.push({
        validator: validatePass2,
        trigger: 'blur'
      })
    }

    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )

    // 不使用双向绑定，自己监听数据变化
    // const handleValueChange = (value: any, field: string) => {
    //   emit('update:modelValue', { ...props.modelValue, [field]: value })
    // }

    // 提交时进行校验
    // console.log(formRef)
    // const validateForm = () => {
    //   if (!formRef.value) return
    //   formRef.value.validate((valid: any) => {
    //     if (valid) {
    //       console.log('submit!')
    //     } else {
    //       console.log('error submit!')
    //       return false
    //     }
    //   })
    // }
    watch(
      formRef,
      () => {
        emit('validateForm', formRef)
      },
      {
        deep: true
      }
    )

    return {
      formRef,
      formData,
      myformItems
      // handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.page-form {
  padding-top: 22px;
}
</style>
