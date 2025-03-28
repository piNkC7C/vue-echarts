import { defineAsyncComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

// 路由懒加载
const _import = (path: string) => defineAsyncComponent(() => import(`@/views/${path}.vue`))
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '数据大屏',
    component: _import('home-view'),
  },
  {
    path: '/customer',
    name: '客户档案',
    component: () => import('@/layouts/RouterViewLayout.vue'),
    redirect: '/customer/chat-records',
    children: [
      {
        path: 'chat-records',
        name: '聊天记录',
        component: _import('chat-records-view'),
      },
      {
        path: 'orders',
        name: '客户订单',
        component: _import('orders-view'),
      },
    ],
  },
  {
    path: '/travel',
    name: '美丽出境',
    component: () => import('@/layouts/RouterViewLayout.vue'),
    redirect: '/travel/live-records',
    children: [
      {
        path: 'live-records',
        name: '直播记录',
        component: _import('live-records-view'),
      },
      {
        path: 'staff-management',
        name: '人员管理',
        component: _import('staff-management-view'),
      },
    ],
  },
  {
    path: '/wechat-service',
    name: '微信客服',
    component: () => import('@/layouts/RouterViewLayout.vue'),
    redirect: '/wechat-service/service-management',
    children: [
      {
        path: 'service-management',
        name: '客服管理',
        component: _import('service-management-view'),
      },
      {
        path: 'temp-dialog',
        name: '临时对话框',
        component: _import('temp-dialog-view'),
      },
    ],
  },
]

export default routes
