<script setup lang="ts">
import { ref, computed, inject, provide, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  index: string
  title: string
  to?: string | object
  replace?: boolean
  hideDropdownIcon?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  replace: false,
  hideDropdownIcon: false,
  disabled: false,
})

// 注入顶层处理函数，如果存在的话 - 移到前面来避免顺序问题
const parentHandleSelect = inject('handleSelect', null) as ((index: string) => void) | null

const activeIndex = inject('activeIndex', ref(''))
const updateActiveIndex = inject('updateActiveIndex', (index: string) => {})

const isExpanded = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
// 子菜单插槽内容判断标志
const hasSlotContent = ref(false)

// 计算下拉菜单的位置
const dropdownPosition = computed(() => {
  // 默认向下展示
  return 'top-full left-0'
})

const handleMouseEnter = () => {
  isOpen.value = true
}

const handleMouseLeave = () => {
  isOpen.value = false
}

const handleClick = () => {
  isOpen.value = !isOpen.value
}

// 修复handleItemClick函数
const handleItemClick = (navigate: () => void) => {
  if (parentHandleSelect) {
    parentHandleSelect(props.index)
  }

  // 检查默认插槽是否有内容(通过插槽传递一个标记)
  if (hasSlotContent.value) {
    isOpen.value = !isOpen.value
  } else {
    navigate()
    isOpen.value = false // 导航后关闭下拉菜单
  }
}

// 监听isOpen的变化，使用nextTick确保DOM更新后再调整位置
watch(isOpen, (newValue) => {
  if (newValue) {
    nextTick(() => {
      adjustDropdownPosition()
      // 在菜单打开时检查子项
      checkForChildren()
    })
  }
})

// 更可靠的子项检查方法
const checkForChildren = () => {
  if (!dropdownRef.value) return

  const contentWrapper = dropdownRef.value.querySelector('.relative.z-10')
  hasSlotContent.value = !!(
    contentWrapper &&
    contentWrapper.children &&
    contentWrapper.children.length > 0
  )
}

// 调整下拉菜单位置以避免溢出
const adjustDropdownPosition = () => {
  if (!dropdownRef.value) return

  const dropdown = dropdownRef.value
  const rect = dropdown.getBoundingClientRect()
  const viewportWidth = window.innerWidth

  // 重置样式，确保每次计算都是从初始状态开始
  dropdown.style.left = ''
  dropdown.style.right = ''

  // 获取更新后的位置
  const updatedRect = dropdown.getBoundingClientRect()

  // 检查是否溢出右侧
  if (updatedRect.right > viewportWidth) {
    dropdown.style.left = 'auto'
    dropdown.style.right = '0'
  } else {
    dropdown.style.left = '0'
    dropdown.style.right = 'auto'
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  // 使用ResizeObserver监控窗口大小变化
  resizeObserver = new ResizeObserver(() => {
    if (isOpen.value) {
      adjustDropdownPosition()
    }
  })

  resizeObserver.observe(document.body)

  // 也保留窗口resize事件监听作为后备
  window.addEventListener('resize', adjustDropdownPosition)

  // 监听滚动事件
  window.addEventListener('scroll', adjustDropdownPosition)
})

onUnmounted(() => {
  // 清理事件监听
  window.removeEventListener('resize', adjustDropdownPosition)
  window.removeEventListener('scroll', adjustDropdownPosition)

  // 清理ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

provide('subMenuIndex', props.index)

// 提供自己的处理函数给子菜单项
provide('handleSelect', (index: string) => {
  if (parentHandleSelect) {
    parentHandleSelect(index)
  }
})

// 获取当前路由
const route = useRoute()

// 由子菜单项激活状态决定父菜单项是否激活
const activeChildIndex = ref<string | null>(null)
provide('updateActiveChild', (index: string | null) => {
  activeChildIndex.value = index
})

// 计算子项是否激活
const isChildActive = computed(() => {
  return !!activeChildIndex.value
})
</script>

<template>
  <div
    class="relative group mx-2"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :data-sub-menu-id="index"
  >
    <!-- 主菜单按钮，可以选择是否添加路由链接 -->
    <router-link v-if="to" :to="to" custom v-slot="{ navigate, isActive, isExactActive }">
      <div
        class="px-4 py-2 text-cyan-300 cursor-pointer flex items-center relative overflow-hidden tech-btn group"
        :class="{ 'active-route': isActive || isExactActive || isChildActive }"
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
        <div class="relative z-10 flex items-center">
          <slot name="title">{{ title }}</slot>
          <i
            v-if="!hideDropdownIcon"
            class="ml-1 text-xs transform transition-transform duration-300"
            :class="{ 'rotate-180': isOpen }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </i>
        </div>
      </div>
    </router-link>

    <div
      v-else
      class="px-4 py-2 text-cyan-300 cursor-pointer flex items-center relative overflow-hidden tech-btn group"
      :class="{ 'active-route': isChildActive }"
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
      <div class="relative z-10 flex items-center">
        <slot name="title">{{ title }}</slot>
        <i
          v-if="!hideDropdownIcon"
          class="ml-1 text-xs transform transition-transform duration-300"
          :class="{ 'rotate-180': isOpen }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </div>
    </div>

    <!-- 下拉菜单 -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-show="isOpen"
        ref="dropdownRef"
        class="absolute min-w-[160px] py-2 z-50 mt-1 tech-dropdown rounded-md"
        style="max-height: 80vh; overflow-y: auto"
      >
        <div
          class="absolute inset-0 bg-gray-900/80 backdrop-blur-md border border-cyan-500/30 rounded-md z-0"
        ></div>
        <div class="relative z-10">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.tech-btn {
  position: relative;
  transition: all 0.3s ease;
}

.tech-btn::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 25%;
  width: 50%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent);
  transition: all 0.5s ease;
}

.tech-btn::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 25%;
  width: 50%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent);
  transition: all 0.5s ease;
}

.tech-btn:hover {
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
}

.tech-btn:hover::before,
.tech-btn:hover::after {
  left: 0;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), transparent);
}

.tech-bg {
  box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.tech-btn:hover .tech-bg {
  box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.2);
}

.tech-dropdown {
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}

.active-route .tech-bg {
  background: linear-gradient(to right, rgba(8, 145, 178, 0.3), rgba(6, 182, 212, 0.3));
  box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.3);
}
</style>
