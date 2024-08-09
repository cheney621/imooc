import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'

// 私有路由表——权限路由
export const privateRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

// 公有路由表——无权限路由
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index') //路由懒加载
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/path',
        name: 'chart',
        component: () => import('@/views/chart'),
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      {
        path: '/404',
        name: '404',
        compoent: () => import('@/views/error-page/404.vue')
      },
      {
        path: '/401',
        name: '40',
        compoent: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

// 初始化路由表
export function resetRoute() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})
export default router
