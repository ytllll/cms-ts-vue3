<template>
  <div class="map-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults } from 'vue'
import * as echarts from 'echarts'
import BaseEchart from '@/base-ui/echart'

const props = withDefaults(
  defineProps<{
    title?: string
    xLabels: string[]
    xValues: any[]
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  return {}
})
</script>

<style scoped></style>
