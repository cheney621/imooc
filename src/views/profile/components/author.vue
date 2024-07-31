<template>
  <div class="author-container">
    <!-- 标题区 -->
    <div class="header">
      <svg-icon icon="user"></svg-icon>
      <div class="header-desc">
        <h3>{{ $t('msg.profile.name') }}</h3>
        <span>{{ $t('msg.profile.job') }}</span>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="info">
      {{ $t('msg.profile.Introduction') }}
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    padding: 6px;

    .svg-icon {
      margin-right: 15px;
      position: relative;
      top: 10px;
    }
    .header-desc {
      span {
        display: block;
        margin-top: 7px;
      }
    }
  }

  .info {
    text-indent: 30px;
    font-style: italic;
    font-weight: 500;
  }
}
</style>
