<template>
  <!-- 章节模块 -->
  <!-- 根据数据，利用 Timeline时间线 进行渲染 -->
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { watchSwitchLang } from '@/utils/i18n'
import { chapters } from '@/api/user'
import { ref } from 'vue'

const chapterData = ref([])
console.log(chapterData)
const getChapterData = async () => {
  chapterData.value = await chapters()
}
getChapterData()

// 监听语言变化
watchSwitchLang(getChapterData)
</script>

<style lang="scss" scoped></style>
