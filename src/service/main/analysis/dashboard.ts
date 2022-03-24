import tlRequest from '../../index'

enum DashboardAPI {
  categoryGoodsAmount = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsAmount() {
  return tlRequest.get({
    url: DashboardAPI.categoryGoodsAmount
  })
}

export function getCategoryGoodsCount() {
  return tlRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return tlRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return tlRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return tlRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
