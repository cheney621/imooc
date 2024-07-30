import { createI18n } from 'vue-i18n'
// 导入自定义语言包
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import store from '@/store'

// 创建 messages 数据源
const messages = {
  en: {
    msg: {
      ...mEnLocale //注册语言包
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}

// 创建 locale 语言变量
// const locale = 'en'

// 初始化 i18n 实例
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  // 缓存当前国际化选择（刷新仍为当前语言）
  locale: getLanguage(),
  messages
})

function getLanguage() {
  return store && store.getters && store.getters.language
}

export default i18n
