<template>
  <!-- 分配权限弹出框 -->
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <!-- 内容——属性结构 -->
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { rolePermission } from '@/api/role'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)

// 获取当前用户角色的权限
// tree节点
const treeRef = ref(null)
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  // 根据获取到的数据渲染选中的tree
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
</script>
