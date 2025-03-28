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
]

export default routes
