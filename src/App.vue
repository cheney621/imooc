<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'

const store = useStore()

/**
 * 监听 语言变化，重新获取个人信息
 */
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
