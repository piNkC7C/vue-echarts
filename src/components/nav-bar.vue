<script setup lang="ts">
import { computed } from 'vue'
import { NavSubMenu, NavMenuItem, NavMenuSubItem } from '@/components/NavMenu'
import routes from '@/router/routes'

const handleSelect = (index: string) => {
  console.log('选中菜单项:', index)
}

// 计算左右两侧的路由
const leftRoutes = computed(() => {
  const half = Math.ceil(routes.length / 2)
  return routes.slice(0, half)
})

const rightRoutes = computed(() => {
  const half = Math.ceil(routes.length / 2)
  return routes.slice(half)
})
</script>

<template>
  <nav class="relative bg-gray-900 w-full h-16 md:h-16" aria-label="主导航">
    <!-- 背景图 -->
    <div
      class="absolute inset-0 bg-[url('@/assets/imgs/bg_header.svg')] bg-contain bg-center bg-no-repeat"
    ></div>

    <!-- 导航内容 - 根据背景图分布 -->
    <div class="relative h-full flex items-center justify-between">
      <!-- 左侧菜单区域 -->
      <div class="flex-1 flex justify-center items-center px-8">
        <!-- 动态生成左侧菜单（routes的前半部分） -->
        <template v-for="(route, index) in leftRoutes" :key="route.path">
          <!-- 有子路由的菜单项 -->
          <NavSubMenu
            v-if="route.children && route.children.length"
            :index="String(route.name)"
            :title="String(route.name)"
          >
            <NavMenuSubItem
              v-for="child in route.children"
              :key="child.path"
              :index="String(child.name)"
              :to="`${route.path}/${child.path}`"
            >
              {{ child.name }}
            </NavMenuSubItem>
          </NavSubMenu>

          <!-- 没有子路由的菜单项 -->
          <NavMenuItem
            v-else
            :index="String(route.name)"
            :title="String(route.name)"
            :to="route.path"
          ></NavMenuItem>
        </template>
      </div>

      <!-- Logo/自定义内容插槽 -->
      <div class="flex-shrink-0 mx-4 w-1/5 flex justify-center">
        <slot></slot>
      </div>

      <!-- 右侧菜单区域 -->
      <div class="flex-1 flex justify-center items-center px-8">
        <!-- 动态生成右侧菜单（routes的后半部分） -->
        <template v-for="(route, index) in rightRoutes" :key="route.path">
          <!-- 有子路由的菜单项 -->
          <NavSubMenu
            v-if="route.children && route.children.length"
            :index="String(route.name)"
            :title="String(route.name)"
          >
            <NavMenuSubItem
              v-for="child in route.children"
              :key="child.path"
              :index="String(child.name)"
              :to="`${route.path}/${child.path}`"
            >
              {{ child.name }}
            </NavMenuSubItem>
          </NavSubMenu>

          <!-- 没有子路由的菜单项 -->
          <NavMenuItem
            v-else
            :index="String(route.name)"
            :title="String(route.name)"
            :to="route.path"
          ></NavMenuItem>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
