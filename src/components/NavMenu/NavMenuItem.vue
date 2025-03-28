<script setup lang="ts">
import { inject, ref, computed } from 'vue'

const props = defineProps<{
  index: string
  disabled?: boolean
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
</script>

<template>
  <div class="relative">
    <button
      @click="handleClick"
      :class="[
        'px-3 py-2 text-cyan-300 border border-cyan-500/30 rounded bg-slate-900/60',
        'backdrop-blur-sm hover:bg-slate-800/80 hover:border-cyan-400/50 hover:text-cyan-200',
        'transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]',
        'flex items-center gap-1 text-sm md:text-base',
        { 'opacity-50 cursor-not-allowed': disabled },
        { 'bg-slate-800/80 text-cyan-200': isActive },
      ]"
    >
      <slot></slot>
    </button>
  </div>
</template>
