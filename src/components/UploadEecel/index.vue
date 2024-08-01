<template>
  <!-- 数据导入模块——样式和逻辑 -->
  <div class="upload-excel">
    <!-- 左边——点击上传 -->
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <!-- 点击按钮触发input上传 -->
    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <!-- 右边——拖拽上传 -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { defineProps, ref } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'

/**
 * excel 导入原理与实现分析
1.选中文件之后，解析 excel 数据（核心）
2.上传解析之后的数据
3.返回 员工管理（用户列表） 页面
 */

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 上传成功回调
  onSuccess: Function
})

// 点击选择文件
const loading = ref(false)
const excelUploadInput = ref(null) //获取input框
const handleUpload = () => {
  // 点击按钮触发input框的点击上传文件方法
  excelUploadInput.value.click()
}
// 当用户更改 <input>元素的值时，change 事件触发
const handleChange = (e) => {
  // 获取点击的文件
  const files = e.target.files
  const rawFile = files[0] //一次选择一个文件
  if (!rawFile) return
  upload(rawFile)
}

// 将选中的文件上传
const upload = (rawFile) => {
  // 通过 excelUploadInput 引用的 input 元素的 value 属性设置为 null，
  // 以清空输入框的值。这么做是为了在用户选择文件后，能够再次触发 change 事件，即使用户选择了同一个文件。
  excelUploadInput.value.value = null
  // 没有指定上传前回调
  if (!props.beforeUpload) {
    readerData(rawFile)
    return //提前结束函数的执行，因为没有定义 beforeUpload 回调函数时，后续代码不需要执行
  }
  // 指定上传前回调，只有返回true才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

// 读取文件数据（异步）
const readerData = (rawFile) => {
  loading.value = true //按钮加载完成
  // FileReader 接口允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // FileReader 接口的 load 事件在成功读取文件时触发
    reader.onload = (e) => {
      // 1.获取拿到的数据
      const data = e.target.result
      // 2.利用XSLX对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3.获取第一张表名称
      const firstSheetName = workbook.SheetNames[0]
      // 4.只读取第一张表数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5.解析数据表头
      const header = getHeaderRow(worksheet)
      // 6.解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7.传入解析之后的数据
      generateData({ header, results })
      // 8.loadingh处理
      loading.value = false
      // 9.异步完成
      resolve()
    }
    // 启动读取指定的Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile)
  })
}

// 根据导入内容，生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

// 拖拽文本释放时触发
const handleDrop = (e) => {
  // 上传中跳过
  if (!loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
  }
  const rawFile = files[0]
  // 判断是否为excel文件
  if (!isExcel) {
    ElMessage.error('文件必须是 .xlsx, .xls .csv格式')
    return false
  }
  // 上传文件
  upload(rawFile)
}

// 拖拽悬停时触发
const handleDragover = (e) => {
  // 在新位置生成源数据的副本
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
