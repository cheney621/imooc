<template>
  <el-card class="container">
    <el-row :gutter="32" v-if="chartTrendData.allAmount">
      <el-col :span="6">
        <trendDataVue :data="chartTrendData"></trendDataVue>
      </el-col>
      <el-col :span="18">
        <trendChartVue :data="chartTrendData"></trendChartVue>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import trendChartVue from './trend-chart.vue'
import trendDataVue from './trend-data.vue'
import { getChartTrend } from '@/api/chart'

const chartTrendData = ref({})
const getChartTrendData = async () => {
  const res = await getChartTrend()
  chartTrendData.value = res
}
getChartTrendData()
</script>

<style lang="scss" scoped>
.container {
  height: 286px;
}
</style>
