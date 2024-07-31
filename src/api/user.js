import request from '@/utils/requests'

// 功能模块
export const features = () => {
  return request({
    url: '/user/feature'
  })
}

// 章节模块
export const chapters = () => {
  return request({
    url: '/user/chapter'
  })
}