<template>
  <div class="trend-chart-container" ref="target"></div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
// ECharts基本图标渲染
// 1.导入Echarts模块
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 2.利用target方法，获取Echarts实例
const target = ref(null)
let mChart
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

/**
 * 图表渲染方法
 */
const renderChart = () => {
  // 3.配置options对象（渲染核心）
  const options = {
    // // 图表标题
    // title: {
    //   // 标题文本
    //   text: ''
    // },

    // 鼠标移入后的提示框
    tooltip: {
      // 鼠标移入坐标轴时，触发提示框
      trigger: 'axis',
      // 移入坐标轴时,提示框的配置项
      axisPointer: {
        // 显示十字准星指示器
        type: 'cross',
        // 指示器样式
        crossStyle: {
          // 色值
          color: '#999'
        }
      }
    },

    // 图例配置
    legend: {
      // 图例数据
      data: [i18n.t('msg.chart.monthIncome'), i18n.t('msg.chart.dayIncome')],
      // 图例位置
      right: 0
    },

    // echarts 网格绘制的位置，对应 上、右、下、左
    grid: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0,
      // 计算边距时，包含标签
      containLabel: true
    },

    // X轴配置
    xAxis: {
      // 坐标轴类型
      type: 'category',
      // 数据
      data: props.data.monthAmountList.map((item) => item.time),
      // 不显示坐标轴刻度
      axisTick: {
        show: false
      }
    },
    // Y轴配置
    yAxis: {
      // Y轴类型
      type: 'value',
      // 最小值
      min: 0,
      // 最大值
      max: function (value) {
        // 保证最大值距离顶部有一定的空间
        return parseInt(value.max * 1.2)
      },
      // 刻度上展示的文字
      axisLabel: {
        formatter: `{value} ${i18n.t('msg.chart.unit')}`
      }
    },
    // 图表类型
    series: [
      // 第一个图表-柱状图
      {
        // 图标名称,对应lengend.data[]--可以实现点击图例实现图表的显示与隐藏
        name: i18n.t('msg.chart.monthIncome'),
        // 图表类型
        type: 'bar',
        // 柱的宽度
        barWidth: 30,
        // 提示框展示配置
        tooltip: {
          // 提示框展示的内容
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
          }
        },
        // 图表的数据
        data: props.data.monthAmountList.map((item) => item.amount)
      },
      // 第二个图表-曲线图
      {
        // 图标名称
        name: i18n.t('msg.chart.dayIncome'),
        // 图表类型
        type: 'line',
        // 颜色
        color: '#6EC6D0',
        // 平滑
        smooth: true,
        // 提示框展示配置
        tooltip: {
          // 提示框展示的内容
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
          }
        },
        // 图表的数据
        data: props.data.dailyCurve.map((item) => item.amount)
      }
    ]
  }
  // 5.配置options
  mChart.setOption(options)
}

watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>
