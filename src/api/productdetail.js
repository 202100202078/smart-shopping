import request from '@/utils/request'

export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getProductComment = (obj) => {
  const { goodsId, commentNum } = obj
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit: commentNum
    }
  })
}
