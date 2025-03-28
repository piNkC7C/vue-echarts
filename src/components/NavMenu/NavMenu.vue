<script setup lang="ts">
import { ref, provide } from 'vue'

// 定义允许的位置类型
type PositionType = 'left' | 'right' | 'center'

interface Props {
  defaultActive?: string
  mode?: 'horizontal' | 'vertical'
  position?: PositionType
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
})

const emit = defineEmits(['select'])

const activeIndex = ref(props.defaultActive || '')

const updateActiveIndex = (index: string) => {
  activeIndex.value = index
  emit('select', index)
}

provide('activeIndex', activeIndex)
provide('updateActiveIndex', updateActiveIndex)

// 提供选择菜单项的处理函数
provide('handleSelect', (index: string) => {
  emit('select', index)
})
</script>

<template>
  <div
    :class="[
      'flex items-center gap-4 md:gap-6',
      { 'flex-col': mode === 'vertical' },
      { 'justify-start': position === 'left' },
      { 'justify-end': position === 'right' },
      { 'justify-center': position === 'center' },
    ]"
  >
    <slot></slot>
  </div>
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
