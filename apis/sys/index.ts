import type { BannerResultModel, BannerType, BaseResultModel, MenusResultModel } from '~/apis/sys/typing'

export * from './typing'

enum Api {
  getBanner = '/operation/app/banner/getBanner',
  getMenus = '/getMenus/test',
}

export async function getBanner(type: BannerType) {
  return useHttp.get<BannerResultModel[]>(Api.getBanner, { banner_type_id: type })
}

export async function getMenus() {
  return useHttp.get<MenusResultModel[]>(Api.getMenus)
}
