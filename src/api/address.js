import request from '@/utils/request'

// 获取收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 删除收货地址
export const delAddress = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}

// 新增收货地址
export const addAddress = (formObj) => {
  return request.post('/address/add', {
    form: formObj
  })
}

// 修改收货地址
export const editAddress = (addressId, form) => {
  return request.post('/address/edit', {
    addressId,
    form
  })
}

// 设置默认地址
export const setDefaultAddress = (addressId) => {
  return request.post('/address/setDefault', {
    addressId
  })
}

// 获取默认地址id
export const getDefaultAddressId = () => {
  return request.get('/address/defaultId')
}
