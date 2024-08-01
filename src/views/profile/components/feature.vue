<template>
  <!-- 右侧功能模块 -->
  <!-- 折叠面板 -->
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="feature in features"
      :key="feature.id"
      :title="feature.title"
      :name="feature.id"
    >
      <div v-html="feature.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref, defineProps } from 'vue'
const activeName = ref(0)
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}

.el-collapse-item {
  :deep(a) {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
