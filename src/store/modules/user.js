import { getUserInfo, setUserInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      // 同时进行本地存储
      setUserInfo(obj)
    }
  },
  actions: {

  },
  getters: {

  }
}
