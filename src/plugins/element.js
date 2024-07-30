import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
// 导入 element 的中文、英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

import store from '@/store'

export default (app) => {
  app.use(ElementPlus, {
    // 注册 element 时，根据当前语言选择使用哪种语言包
    locale: store.getters.language === 'en' ? en : zhCn
  })
}
