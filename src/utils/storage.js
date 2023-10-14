const INFO_KEY = 'my_shopping_info'

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
