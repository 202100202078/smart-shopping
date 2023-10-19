// 用户个人信息
const INFO_KEY = 'my_shopping_info'
const HISTORY_KEY = 'my_history_info'
const ADDRESS_KEY = 'my_address_info'

export const getUserInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

export const setUserInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const removeUserInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 用户搜索历史
export const getHistory = () => {
  const defaultHistory = []
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : defaultHistory
}

export const setHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

// 用户地址列表
export const getAddress = () => {
  const defaultAddress = []
  const result = localStorage.getItem(ADDRESS_KEY)
  return result ? JSON.parse(result) : defaultAddress
}

export const setAddress = (address) => {
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(address))
}
