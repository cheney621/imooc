<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="container" ref="target">s2</div>
  </el-card>
</template>

<script setup>
import { TableSheet } from '@antv/s2'
import { defineProps, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const i18n = useI18n()
const target = ref(null)
let s2
onMounted(() => {
  // 配置对象
  const s2Options = {
    // 宽度：必须为准确的像素
    width: target.value.clientWidth,
    // 高度：必须为准确的像素
    height: target.value.clientHeight,
    // 是否显示行序号
    showSeriesNumber: true,
    // 条件模式配置
    conditions: {
      // 背景字段标记
      background: [
        {
          // 设置背景的字段
          field: 'balance',
          // 映射函数
          mapping(fieldValue) {
            console.log(fieldValue)
            return {
              fill: fieldValue > 0 ? '#f3fff3' : '#ffe7e7'
            }
          }
        }
      ]
    }
  }
  // 生成说s2实例
  s2 = new TableSheet(target.value, {}, s2Options)
})

// 图像渲染函数
const renderChart = () => {
  // 数据对象
  const s2DataCfg = {
    fields: {
      // 列名
      columns: [
        'province',
        'city',
        'coverage',
        'receivable',
        'actual',
        'balance'
      ]
    },
    meta: [
      // 列头字段对应的元信息，比如展示的中文名
      {
        field: 'province',
        name: i18n.t('msg.chart.sheetProvince')
      },
      {
        field: 'city',
        name: i18n.t('msg.chart.sheetCity')
      },
      {
        field: 'coverage',
        name: i18n.t('msg.chart.sheetCoverage')
      },
      {
        field: 'receivable',
        name: i18n.t('msg.chart.sheetReceivable')
      },
      {
        field: 'actual',
        name: i18n.t('msg.chart.sheetActual')
      },
      {
        field: 'balance',
        name: i18n.t('msg.chart.sheetBalance')
      }
    ],
    data: props.data
  }
  // 更新数据
  s2.setDataCfg(s2DataCfg)
  // 渲染视图
  s2.render(true)
}
watch(
  () => props.data,
  () => renderChart()
)

/**
 * 监听语言变化
 */
watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.container {
  height: 782px;
}
</style>
