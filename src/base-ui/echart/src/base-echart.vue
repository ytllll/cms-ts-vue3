<template>
  <div class="base-echarts">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults, defineProps, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '@/base-ui/echart/hooks/useEcharts'

// 定义props
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    options: () => ({}),
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEcharts(echartDivRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
