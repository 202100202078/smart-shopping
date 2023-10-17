import request from '@/utils/request'

export const addCartRequestFn = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const getCartNum = () => {
  return request.get('/cart/total')
}
