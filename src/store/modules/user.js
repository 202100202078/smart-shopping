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
    logout (context) {
      // 将user模块信息重置
      context.commit('setUserInfo', {})
      // 将cart模块信息重置
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {

  }
}
