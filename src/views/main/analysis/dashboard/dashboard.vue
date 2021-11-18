<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <tl-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </tl-card>
      </el-col>
      <el-col :span="10">
        <tl-card title="不同城市商品销量"></tl-card>
      </el-col>
      <el-col :span="7">
        <tl-card title="分类商品数量（玫瑰图）"></tl-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <tl-card title="分类商品的销量"></tl-card>
      </el-col>
      <el-col :span="12">
        <tl-card title="分类商品的收藏"></tl-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import TlCard from '@/base-ui/card'
import { PieEchart } from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    TlCard,
    PieEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    return {
      categoryGoodsCount
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 10px;
}
</style>
