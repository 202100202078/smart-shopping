import { getAddress, setAddress, setDefaultAddressId, getDefaultAddressId } from '@/utils/storage'
import { delAddress, getAddressList, addAddress, editAddress, setDefaultAddress } from '@/api/address'
export default {
  namespaced: true,
  state () {
    return {
      addressList: getAddress() || [],
      defaultAddressId: getDefaultAddressId() || ''
    }
  },
  mutations: {
    setAddressList (state, list) {
      state.addressList = list
      // 本地存储
      setAddress(list)
    },
    setDefaultAddressId (state, id) {
      state.defaultAddressId = id
      // 本地存储
      setDefaultAddressId(id)
    },
    toFirst (state, id) {
      // 将id的地址置顶
      // console.log(id)
      // console.log(state.addressList)
      let cur = -1
      for (const index in state.addressList) {
        // console.log(state.addressList[index].address_id)
        if (state.addressList[index].address_id === id) {
          cur = index
          break
        }
      }
      if (cur !== 0) {
        state.addressList.unshift(state.addressList.splice(cur, 1)[0])
      }
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
    },
    async addAddressAction (context, formObj) {
      await addAddress(formObj)
      // 重新拉取数据
      context.dispatch('getAddressAction')
    },
    async editAddressAction (context, obj) {
      await editAddress(obj.addressId, obj.formObj)
      // 修改本地数据
      // 重新拉取数据
      context.dispatch('getAddressAction')
    },
    async setDefaultAddressAction (context, id) {
      await setDefaultAddress(id)
      // 更新本地
      context.commit('setDefaultAddressId', id)
      // 如果当前id不是地址栏第一个id则置顶
      context.commit('toFirst', id)
    }

  },
  getters: {
    selectedAddress (state) {
      return state.addressList[0]
    }
  }
}
