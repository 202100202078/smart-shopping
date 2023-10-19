import request from '@/utils/request'

// 获取收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 删除收获地址
export const delAddress = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}
