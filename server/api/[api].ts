import { useEnv } from '~/build'

// server/api/[...].ts
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname.replace(/^\/api/, '')
  const baseURL = useEnv().viteEnv.VITE_APP_BASE_URL
  try {
    return await $fetch(`${baseURL}${path}`, {
      method: event.method,
      body: event.method !== 'GET' ? await readBody(event).catch(() => undefined) : undefined,
      query: getQuery(event),
    })
  }
  catch (error) {
    console.error('API 代理错误:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '无法从API获取数据',
    })
  }
})
