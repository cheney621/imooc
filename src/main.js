import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// svgIcon
import installIcons from '@/icons'
import i18n from '@/i18n'

// 全局属性
import installFilter from '@/filter'

// 全局样式
import './styles/index.scss'

// 权限控制模块
import './permission'

// 打印指令
import installDirective from '@/directives'

const app = createApp(App)

installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)

app.use(store).use(router).use(i18n).mount('#app')
