import { Notification } from '@arco-design/web-vue'
import { useUserStore } from '~/stores/user.store'

// export default defineNuxtRouteMiddleware((to) => {
//   // 检测是否在预渲染过程中
//   if (process.server && process.env.prerender) {
//     // 在预渲染期间跳过认证检查
//     console.log('Skipping auth check during static generation')
//     return
//   }

//   // 客户端或SSR模式下的正常认证逻辑
//   const userStore = useUserStore()
//   if (!userStore.isLogin) {
//     // 仅在客户端显示通知
//     if (process.client) {
//       Notification.warning('未登录,请登录之后访问')
//     }
//     return navigateTo({ path: '/demo/api', query: { redirect: to.path } })
//   }
// })

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  if (!userStore.isLogin) {
    Notification.warning('未登录,请登录之后访问')
    return navigateTo({ path: '/demo/api', query: { redirect: to.path } })
  }
})
