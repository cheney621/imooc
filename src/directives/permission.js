// 创建自定义指令 permission-功能受限
import store from '@/store'

function checkPermission(el, binding) {
  // 获取绑定对象的值,此处为权限
  const { value } = binding
  // 获取所有的功能指令
  const points = store.getters.userInfo.permission.points
  // 当传入的指令为数组时
  if (value && value instanceof Array) {
    // 匹配对应的指令(传入的名称在point是否有)
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 如果无法匹配，则表示当前用户无该指令，那么删除对应的功能按钮
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    // 传入的不是数组
    throw new Error('')
  }
}

export default {
  // 在绑定元素的父组件被挂载后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的Vnode 及其子组件的 VNode更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
