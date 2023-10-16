import request from '@/utils/request'

export const getProductList = (obj) => {
  const { sortType, categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      sortType,
      categoryId,
      goodsName,
      page
    }
  })
}
