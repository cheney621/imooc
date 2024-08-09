<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2Vue :data="sheetData"></s2Vue>
    </el-col>
    <el-col :span="6">
      <!-- 渲染6个方框 -->
      <sheetLabelVue
        :data="item"
        v-for="(item, index) in regionsData"
        :key="item.id"
        class="mb-20"
        :isSelected="currentRegionsIndex === index"
        @click="onChangeRegion(index)"
      ></sheetLabelVue>
    </el-col>
  </el-row>
</template>

<script setup>
import s2Vue from './components/s2.vue'
import sheetLabelVue from './components/sheet-label.vue'
import { getChartRegions, getChartSheet } from '@/api/chart'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

const currentRegionsIndex = ref(0)
// 切换大区
const onChangeRegion = (index) => {
  currentRegionsIndex.value = index
  // 重新获取大区对应的数据
  getChartSheetData(regionsData.value[index].id)
}
/**
 * 获取大区数据
 */
const regionsData = ref([])
const getChartRegionsData = async () => {
  const { regions } = await getChartRegions()
  const res = await getChartRegions()
  regionsData.value = regions
  console.log(res)

  // TODO：获取该大区对应的数据(默认第一个)
  getChartSheetData(regionsData.value[0].id)
}
getChartRegionsData()
// 切换语言，数据重新获取
watchSwitchLang(getChartRegionsData)

/**
 * 大区对应的表格数据
 */
const sheetData = ref([])
const getChartSheetData = async (id) => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
getChartSheetData()
watchSwitchLang(getChartSheetData)
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
