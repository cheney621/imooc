import variables from '@/styles/variables.module.scss'

const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  /**
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  // 动态样式
  // 创建一个快捷访问
  cssVar: (state) => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
  mainColor: (state) => state.theme.mainColor,
  language: (state) => state.app.language
}
export default getters
