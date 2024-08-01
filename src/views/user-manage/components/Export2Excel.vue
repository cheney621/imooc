<template>
  <!-- excel导出
  一、业务逻辑
1.点击 excel 导出按钮
2.展示 dialog 弹出层
3.确定导出的 excel 文件名称
4.点击导出按钮
5.获取 所有用户列表数据
6.将 json 结构数据转化为 excel 数据，并下载
二、核心原理
将 json 结构数据转化为 excel 数据，并下载
三、实现方案
1.创建 excel 导出弹出层
2.处理弹出层相关的业务
3.点击导出按钮，将 json 结构数据转化为 excel 数据，并下载（核心）
  -->
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      :placeholder="$t('msg.excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { watchSwitchLang } from '@/utils/i18n'
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getUserManageAllList } from '@/api/user-mange'
import { USER_RELATIONS } from './Export2ExcelConstants'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 定义触发事件--update:modelValue(vue3默认) 的函数
const emits = defineEmits(['update:modelValue'])

// 导出按钮点击事件--导出全部用户数据
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list

  // 获取导出的二维数组
  const data = formatJson(USER_RELATIONS, allUser)

  // 导入工具包
  const excel = await import('@/utils/Export2Excel')

  // excel导出
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })

  closed()
}

// 关闭弹出框
const closed = () => {
  // 调用 触发函数,向父组件传递事件及参数,修改相应数据
  emits('update:modelValue', false)
}

// 指定 input 默认导出文件名称
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

// 将数组转为二维数组
/**
 * 业务背景:从服务端获取到的为 json 数组对象 结构，但是导出时的数据需要为 二维数组
 */
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 时间特殊处理
      // if (headers[key] === 'openTime') {
      //   return this.$filters.dataFilter(item[headers[key]])
      // }
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]

        return JSON.stringify(roles.map((role) => role.title))
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
