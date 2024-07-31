// 定义全局属性
import dayjs from 'dayjs'

// 转换日期格式
const dataFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 设置全局属性
export default (app) => {
  app.config.globalProperties.$filters = {
    dataFilter
  }
}
