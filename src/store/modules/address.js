import { getAddress, setAddress } from '@/utils/storage'
import { delAddress, getAddressList } from '@/api/address'
export default {
  namespaced: true,
  state () {
    return {
      addressList: getAddress() || []
    }
  },
  mutations: {
    setAddressList (state, list) {
      state.addressList = list
      // 本地存储
      setAddress(list)
    }
  },
  actions: {
    async getAddressAction (context) {
      const { data: { list } } = await getAddressList()
      // 发请求获取最新地址数据同步到vuex数据
      context.commit('setAddressList', list)
    },
    async delAddressAction (context, id) {
      await delAddress(id)
      // 重新拉取数据
      context.dispatch('getAddressAction')
    }
  },
  getters: {}
}
