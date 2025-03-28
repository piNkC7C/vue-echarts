<script setup lang="ts">
import { inject } from 'vue'

interface Props {
  index: string
  title?: string
  to?: string | object // 添加路由跳转目标
  replace?: boolean // 是否使用replace模式
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  replace: false,
})

// 注入菜单选择处理函数
const handleSelect = inject('handleSelect', null) as ((index: string) => void) | null

const handleClick = () => {
  if (handleSelect) {
    handleSelect(props.index)
  }
}

// 处理路由链接点击
const handleItemClick = (navigate: Function) => {
  if (handleSelect) {
    handleSelect(props.index)
  }
  navigate()
}
</script>

<template>
  <router-link v-if="to" :to="to" custom v-slot="{ navigate, isActive, isExactActive }">
    <div
      class="px-4 py-2 text-cyan-300 hover:bg-cyan-900/30 cursor-pointer relative tech-item"
      :class="{ 'active-route': isActive || isExactActive }"
      @click="handleItemClick(navigate)"
    >
      <!-- 装饰元素 -->
      <div
        class="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-cyan-400 opacity-0 tech-dot"
      ></div>

      <!-- 文本内容 -->
      <div class="relative z-10 pl-2 flex items-center">
        <slot>{{ title }}</slot>
      </div>
    </div>
  </router-link>

  <div
    v-else
    class="px-4 py-2 text-cyan-300 hover:bg-cyan-900/30 cursor-pointer relative tech-item"
    @click="handleClick"
  >
    <!-- 装饰元素 -->
    <div
      class="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-cyan-400 opacity-0 tech-dot"
    ></div>

    <!-- 文本内容 -->
    <div class="relative z-10 pl-2 flex items-center">
      <slot>{{ title }}</slot>
    </div>
  </div>
</template>

<style scoped>
.tech-item {
  transition: all 0.2s ease;
}

.tech-item:hover,
.active-route {
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
}

.tech-item:hover .tech-dot,
.active-route .tech-dot {
  opacity: 1;
  transform: translateY(-50%) scale(1);
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}

.tech-dot {
  transition: all 0.3s ease;
  transform: translateY(-50%) scale(0.5);
}

.tech-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
  transition: all 0.3s ease;
}

.tech-item:hover::after,
.active-route::after {
  width: 80%;
}

.active-route {
  background: rgba(6, 182, 212, 0.15);
}
</style>
