import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    // 侧边栏展开关闭状态
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 设置国际化
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  },
  actions: {}
}
