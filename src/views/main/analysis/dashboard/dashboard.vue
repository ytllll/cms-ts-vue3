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
        <tl-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </tl-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <tl-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </tl-card>
      </el-col>
      <el-col :span="12">
        <tl-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </tl-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import TlCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    TlCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const xValues: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        xValues.push(item.goodsCount)
      }

      return { xLabels, xValues }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const xValues: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        xValues.push(item.goodsFavor)
      }

      return { xLabels, xValues }
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 10px;
}
</style>
