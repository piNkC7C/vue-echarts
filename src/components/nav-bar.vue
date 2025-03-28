<script setup lang="ts">
import { NavSubMenu, NavMenuSubItem } from '@/components/NavMenu'
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
        <NavSubMenu index="1" title="首页">
          <NavMenuSubItem index="1-1">概览</NavMenuSubItem>
          <NavMenuSubItem index="1-2">仪表盘</NavMenuSubItem>
          <NavMenuSubItem index="1-3">报告</NavMenuSubItem>
        </NavSubMenu>

        <NavSubMenu index="2" title="产品">
          <NavMenuSubItem index="2-1">解决方案</NavMenuSubItem>
          <NavMenuSubItem index="2-2">服务</NavMenuSubItem>
          <NavMenuSubItem index="2-3">案例</NavMenuSubItem>
        </NavSubMenu>
      </div>

      <!-- Logo/自定义内容插槽 -->
      <div class="flex-shrink-0 mx-4 w-1/5 flex justify-center">
        <slot></slot>
      </div>

      <!-- 右侧菜单区域 -->
      <div class="flex-1 flex justify-center items-center px-8">
        <NavSubMenu index="3" title="资源">
          <NavMenuSubItem index="3-1">文档</NavMenuSubItem>
          <NavMenuSubItem index="3-2">教程</NavMenuSubItem>
          <NavMenuSubItem index="3-3">API</NavMenuSubItem>
        </NavSubMenu>

        <NavSubMenu index="4" title="关于">
          <NavMenuSubItem index="4-1">团队</NavMenuSubItem>
          <NavMenuSubItem index="4-2">联系我们</NavMenuSubItem>
          <NavMenuSubItem index="4-3">加入我们</NavMenuSubItem>
        </NavSubMenu>
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
