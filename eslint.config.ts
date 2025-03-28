import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  // 添加自定义规则配置
  {
    rules: {
      // JavaScript未使用变量改为警告级别
      'no-unused-vars': 'warn',
      // TypeScript未使用变量改为警告级别
      '@typescript-eslint/no-unused-vars': 'warn',
      // Vue模板中未使用变量改为警告级别
      'vue/no-unused-vars': 'warn',
      // 未使用组件改为警告级别
      'vue/no-unused-components': 'warn',
    },
  },
)
