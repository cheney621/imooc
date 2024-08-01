<template>
  <uploadExcel :onSuccess="onSuccess"></uploadExcel>
</template>

<script setup>
import {} from 'vue'
import uploadExcel from '@/components/UploadEecel'
import { userBatchImport } from '@/api/user-mange'
import { USER_RELATIONS, formatDate } from './utils'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

/**
 * 筛选数据，根据映射表替换中文为中文
 */
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      // 对上传的excel文件中的日期进行单独处理
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}

// 解析成功之后的回调
// 将筛选的数据传给服务器 —> 提示上传成功
const i18n = useI18n()
const router = useRouter()
/**
 * 数据解析成功之后的回调
 */
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
</script>

<style lang="scss" scoped></style>
