import print from 'vue3-print-nb'
import permission from './permission'

// vue-print-nb 以指令的形式存在，所以需要创建对应指令
export default (app) => {
  app.use(print)
  // 绑定功能指令
  app.directive('permission', permission)
}
