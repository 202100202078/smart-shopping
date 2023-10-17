import { getCartList, setCartCount, delSelected } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    toggleAllChecked (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    }
  },
  actions: {
    async getCartAction (context) {
      // 发送请求获取购物车列表数据
      const { data } = await getCartList()
      data.list.forEach(element => {
        // 为每一个对象新增是否选中属性
        // 即默认商品要买
        element.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, { goodsId, goodsNum, goodsSkuId }) {
      // 先更新本地
      const goods = context.state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
      // console.log(res)
      // 再更新后台
      await setCartCount(goodsId, goodsNum, goodsSkuId)
    },
    async delGoods (context) {
      const cartIds = context.getters.selGoods.map(item => item.id)
      // 更新后台
      await delSelected(cartIds)
      // 重新拉取数据
      context.dispatch('getCartAction')
      Toast('删除成功')
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selGoods (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selCount (state, getters) {
      return getters.selGoods.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selPrice (state, getters) {
      return getters.selGoods.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    isCheckedAll (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
