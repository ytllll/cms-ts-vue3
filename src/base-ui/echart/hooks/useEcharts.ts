import * as echarts from 'echarts'

import ChinaMapData from '../data/china.json'

echarts.registerMap('china', ChinaMapData)

export default function useEcharts(el: HTMLElement) {
  const echartsInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }

  const updateSize = () => {
    echartsInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  return {
    echartsInstance,
    setOptions,
    updateSize
  }
}
