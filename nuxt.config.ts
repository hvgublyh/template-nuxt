// https://nuxt.com/docs/api/configuration/nuxt-config
import { createRuntimeConfig, createViteConfig } from './build'

const isProd = process.env.NODE_ENV === 'production'
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-lodash',
    'arco-design-nuxt-module',
    'nuxt-swiper',
    'dayjs-nuxt',
    '@element-plus/nuxt',
  ],
  devtools: { enabled: false },
  css: ['assets/css/index.css', '@unocss/reset/tailwind-compat.css', 'element-plus/dist/index.css'],
  runtimeConfig: createRuntimeConfig(),
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    keepalive: false,
    baseURL: isProd ? '/dist/' : '', // 让所有静态资源链接前缀加上 dist
  },

  routeRules: {
    '/api/**': {
      proxy: 'http://127.0.0.1:4523/m1/1624492-0-default/**',
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },

  experimental: {
    // 启用新的实验性类型路由器使用 [unplugin-vue-router](https://github.com/posva/unplugin-vue-router).
    typedPages: true,
  },

  vite: createViteConfig(),

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  swiper: {
    enableComposables: false,
  },

  compatibilityDate: '2025-03-29',
})
