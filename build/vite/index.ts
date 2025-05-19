import type { NuxtConfig } from '@nuxt/schema'
import { useEnv } from '../env'
import { createVitePlugins } from './plugins'

export function createViteConfig(): NuxtConfig['vite'] {
  const { viteEnv } = useEnv()
  return {
    ssr: {
      noExternal: ['@arco-design/web-vue'],
    },
    plugins: createVitePlugins(viteEnv),
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:4523/m1/1624492-0-default', // 目标后端地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
}
