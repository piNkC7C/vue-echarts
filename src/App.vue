<script lang="ts" setup>
import { RouterView } from 'vue-router'
import NavBar from './components/nav-bar.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <NavBar>
      <!-- 这是中间Logo插槽内容 -->
      <div class="text-cyan-300 font-bold text-xl md:text-2xl tracking-wider flex items-center">
        <div
          class="bg-gradient-to-r from-cyan-400 to-blue-500 h-8 w-8 rounded mr-2 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        >
          <span class="text-white">X</span>
        </div>
        数据监控平台
      </div>
    </NavBar>
    <main class="basis-full">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
