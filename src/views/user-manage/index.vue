<template>
  <!-- 用户列表 分页展示 -->
  <!--整体思路
  1.获取分页数据
  2.利用 el-table 和 el-pagination 渲染数据-->
  <div class="user-manage-container">
    <!-- 上卡片 -->
    <!-- 导入和导出excel模块 -->
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">{{
          $t('msg.excel.importExcel')
        }}</el-button>
        <el-button type="success" @click="onToExcelClick">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>

    <!-- 下卡片 -->
    <!-- 表格 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('msg.excel.name')" />
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')" />
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <!-- 解析图片 -->
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dataFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.action')" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="mini">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button type="info" size="mini">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- excel导出弹出框 -->
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
  </div>
  <div></div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-mange'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportToExcel from './components/Export2Excel.vue'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

// 获取数据
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()

// 处理导入用户数据不重新加载的问题（数据不会自动刷新） 本项目vue版本会自动刷新
// onActivated(getListData)

// 语言切换
watchSwitchLang(getListData)

// 分页相关
// size改变触发
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

// 页码改变触发
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// excel导入事件
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

/**
 * 删除按钮点击事件
 */
const i18n = useI18n()
const onRemoveClick = (row) => {
  console.log(row)
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}

// excel导出弹出框
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
    left: 50%;
    margin-left: -30px;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
