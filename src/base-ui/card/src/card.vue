<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span @click="openStoryClick()">{{ title }}</span>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    storyId: {
      type: Number
    }
  },
  setup(props) {
    const router = useRouter()

    const openStoryClick = () => {
      let newpage = router.resolve({})
      newpage.href = `${newpage.href}/main/${props.storyId}`

      window.open(newpage.href, '_blank')
    }
    return {
      openStoryClick
    }
  }
})
</script>

<style scoped lang="less">
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.item {
  margin-bottom: 10px;
}
</style>
