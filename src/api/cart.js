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

export const getCartList = () => {
  return request.get('/cart/list')
}

export const setCartCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const delSelected = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
