<script lang="ts" setup>
import type { SwiperContainer } from 'swiper/element'
import type { Swiper } from 'swiper/types'
import type { BaseResultModel, MenusResultModel } from '~/apis/sys/typing'
import { useDayjs } from '#dayjs'
import { Message } from '@arco-design/web-vue'
import { ref } from 'vue'

definePageMeta({
  title: '首页',
})
const dayjs = useDayjs()
const { sys } = useApi()

// Using MenusResultModel to type the data
const { data, refresh } = await useAsyncData('menus', () => sys.getMenus(), {

})
// const data = await $fetch('/api/getMenus/test', {
//   method: 'GET',
//   params: {
//     id: 1,
//   },
// }) as BaseResultModel<MenusResultModel>
// const data = ref({})
// sys.getMenus().then((res) => {
//   data.value = res
// }).catch((err) => {
//   console.error(err)
//   Message.error('获取菜单失败')
// })

function onShowEnv() {
  const config = useRuntimeConfig()
  Message.info(JSON.stringify(config.public))
}
const swiperRef = ref<Nullable<SwiperContainer>>(null)
const swiperIns = useSwiper(swiperRef, {
  on: {
    slideChange: handleSwiperChange,
  },
})

function handleSwiperChange(swiper: Swiper) {
  console.warn(swiper.realIndex)
}
function handleSlideNext() {
  swiperIns.next()
}
function jumpTo() {
  const router = useRouter()
  router.push({
    name: 'demo-api',
    state: {
      id: 1,
    },
  })
}
</script>

<template>
  <div>
    <ul v-if="data">
      <li v-for="(item, index) in data.data" :key="index">
        <div>{{ item.menuName }}</div>
        <ul>
          <li v-for="(child, childIndex) in item.children" :key="childIndex">
            <div>{{ child.menuName }}</div>
          </li>
        </ul>
      </li>
    </ul>
    <client-only>
      <el-button type="primary" @click="() => refresh()">
        刷新
      </el-button>
      <el-button type="primary" @click="jumpTo">
        跳转
      </el-button>
      <swiper-container ref="swiperRef" :autoplay="true" :loop="true" :init="false">
        <swiper-slide>
          <div h-400px w-full flex-center bg-amber>
            1
          </div>
        </swiper-slide>
        <swiper-slide>
          <div h-400px w-full flex-center bg-red>
            2
          </div>
        </swiper-slide>
        <swiper-slide>
          <div h-400px w-full flex-center bg-blue>
            3
          </div>
        </swiper-slide>
      </swiper-container>
    </client-only>
    <div mt-2 flex-center space-x-4>
      <a-button type="primary" @click="() => swiperIns.prev()">
        上一张
      </a-button>
      <a-button type="primary" @click="handleSlideNext">
        下一张
      </a-button>
    </div>
    <div mx-auto w-1200px flex flex-col space-y-4>
      <div class="text-2xl font-bold">
        index {{ dayjs().format('YYYY-MM-DD HH:mm') }}
      </div>
      <div flex space-x-4>
        <div i-mdi-user text-4xl text-red />
        <div i-mdi-github animate-spin text-36px />
      </div>
      <a-button type="primary" w-80px @click="onShowEnv">
        env
      </a-button>
    </div>
  </div>
</template>

<style scoped></style>
