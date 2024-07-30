import request from '@/utils/requests'

/**
 * 功能
 */
export const feature = () => {
  return request({
    url: 'user/feather'
  })
}
