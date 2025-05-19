export interface GetAreaParams {
  parent_id: number
}
export interface AreaResultModel {
  id: number
  area_name: string
}
// 6:PC,7:H5
export type BannerType = 6 | 7
export interface BannerResultModel {
  id: number
  banner_img: string
}

export interface BaseResultModel<T> {
  data: T
  code: number
}

export interface MenusResultModel {
  menuId: string
  menuName: string
  children: MenusResultModel[]
}
