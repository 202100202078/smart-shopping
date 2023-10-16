// 用户个人信息
const INFO_KEY = 'my_shopping_info'
const HISTORY_KEY = 'my_history_info'

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
