<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项——最后一项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-direct">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
// 生成数组数据
const breadcrumbData = ref([])
// 筛选有文字的路由
// route.matched 属性来：获取与给定路由地址匹配的标准化的路由记录数组
const getBreadcrumbDta = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbDta()
  },
  { immediate: true }
)

// 处理点击事件
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 将来需要主题替换，所有这里获取动态样式
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  margin-top: 16px;
  font-size: 16px;
  font-weight: 50px;
  margin-left: 8px;

  .no-direct {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;

    &:hover {
      // 将来需要主题替换
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
