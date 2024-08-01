import request from '@/utils/requests'

// 用户管理模块
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

// 导入（上传）解析后的数据
/**
 * 批量导入
 */
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

/**
 * 删除指定数据
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}
