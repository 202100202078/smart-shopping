import request from '@/utils/request'

// 订单结算确认：
// mode:cart => obj{cartIds}
// mode: buyNow => obj {goodsId,goodsNum,goodsSkuId}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // 购物车结算则为cart，立即购买则为buyNow
      delivery: 10, // 默认10为快递配送，20为门店自提
      couponId: 0, // 默认0不使用优惠券
      isUsePoints: 0, // 默认0不使用积分
      ...obj
    }
  })
}
