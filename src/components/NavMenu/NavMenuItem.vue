<script setup lang="ts">
import { inject, ref, computed } from 'vue'

const props = defineProps<{
  index: string
  disabled?: boolean
  title?: string
  to?: string | object
  replace?: boolean
}>()

const emit = defineEmits(['click'])

const activeIndex = inject('activeIndex', ref(''))
const updateActiveIndex = inject('updateActiveIndex', (index: string) => {})

const isActive = computed(() => activeIndex.value === props.index)

const handleClick = () => {
  if (props.disabled) return
  updateActiveIndex(props.index)
  emit('click', props.index)
}

const handleItemClick = (navigate: Function) => {
  if (props.disabled) return
  updateActiveIndex(props.index)
  emit('click', props.index)
  navigate()
}
</script>

<template>
  <router-link v-if="to" :to="to" custom v-slot="{ navigate, isActive, isExactActive }">
    <div
      class="px-4 py-2 text-cyan-300 cursor-pointer relative tech-btn group"
      :class="{ 'active-route': isActive || isExactActive }"
      @click="handleItemClick(navigate)"
    >
      <!-- 背景效果 -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-md z-0 tech-bg"
      ></div>

      <!-- 装饰线条 -->
      <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400"></div>
      <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400"></div>

      <!-- 文字和图标 -->
      <div class="relative z-10">
        <slot>{{ title }}</slot>
      </div>
    </div>
  </router-link>

  <div
    v-else
    class="px-4 py-2 text-cyan-300 cursor-pointer relative tech-btn group"
    @click="handleClick"
  >
    <!-- 背景效果 -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-md z-0 tech-bg"
    ></div>

    <!-- 装饰线条 -->
    <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400"></div>
    <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400"></div>

    <!-- 文字和图标 -->
    <div class="relative z-10">
      <slot>{{ title }}</slot>
    </div>
  </div>
</template>

<style scoped>
.active-route .tech-bg {
  background: linear-gradient(to right, rgba(8, 145, 178, 0.3), rgba(6, 182, 212, 0.3));
  box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.3);
}
</style>
