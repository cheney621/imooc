<template>
  <div class="">
    <!-- 网站图标 -->
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      ></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">cheney</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu'

const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  // 组件状态驱动的动态 CSS 值
  height: v-bind(logoHeight) + px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 50px;
    font-size: 16px;
    line-height: 50px;
    white-space: nowrap;
  }
}
</style>
