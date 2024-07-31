import request from '@/utils/requests'

// 用户管理模块
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}
