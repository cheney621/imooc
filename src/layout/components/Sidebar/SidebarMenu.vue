<template>
  <!-- 一级 menu 菜单 -->
  <!-- 主题更换——动态样式 -->
  <!-- router——开启router进行路由跳转 -->
  <!-- :default-active="activeMenu"——默认激活项（刷新后的默认页面） -->
  <el-menu
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 计算高亮menu
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})

console.log(JSON.stringify(routes.value))
</script>

<style lang="scss" scoped></style>
