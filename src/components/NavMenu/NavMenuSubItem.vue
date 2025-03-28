<script setup lang="ts">
import { inject, computed, ref } from 'vue'

const props = defineProps<{
  index: string
  disabled?: boolean
  title?: string
}>()

const emit = defineEmits(['click'])

const activeIndex = inject('activeIndex', ref(''))
const updateActiveIndex = inject('updateActiveIndex', (index: string) => {})
const subMenuIndex = inject('subMenuIndex', '')

const fullIndex = computed(() => `${subMenuIndex}-${props.index}`)
const isActive = computed(() => activeIndex.value === fullIndex.value)

const handleClick = () => {
  if (props.disabled) return
  updateActiveIndex(fullIndex.value)
  emit('click', fullIndex.value)
}
</script>

<template>
  <div
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

.tech-item:hover {
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
}

.tech-item:hover .tech-dot {
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

.tech-item:hover::after {
  width: 80%;
}
</style>
