<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="$t('msg.navBar.lang')" :effect="effect"
        ><svg-icon icon="language"></svg-icon
      ></el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    vaildator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

// 获取当前语言
const store = useStore()
const language = computed(() => store.getters.language)

const i18n = useI18n()
// 切换语言
const handleSetLanguage = (lang) => {
  // 切换
  i18n.locale.value = lang
  // 存储当前语言
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped></style>
