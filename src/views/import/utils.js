/**
 * 业务逻辑：
results 中 key 为中文，我们必须要按照接口要求进行上传
所以需要处理 results 中的数据结构
*/
/**
 * 导入数据对应表
 */
export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

/**
 * 业务背景——excel 导入解析时间会出现错误
业务逻辑——一个固定方案，我们只需要进行固定的时间解析处理
 */

/**
 * 解析 excel 导入的时间格式
 */
export const formatDate = (numb) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}