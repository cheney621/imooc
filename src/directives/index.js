import print from 'vue3-print-nb'

// vue-print-nb 以指令的形式存在，所以需要创建对应指令
export default (app) => {
  app.use(print)
}
