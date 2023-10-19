<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active" sticky>
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>

    <OrderListItem v-for="order in orderList.data" :key="order.order_id" :order="order"></OrderListItem>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order.js'
import OrderListItem from '@/components/OrderListItem.vue'
export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      orderList: [],
      active: this.$route.query.dataType || 'all',
      page: 1
    }
  },
  methods: {
    async getOrderListFn () {
      const { data: { list } } = await getOrderList(this.active, this.page)
      console.log(list)
      list.data.forEach(item => {
        item.total_num = 0
        // 为每一个订单计算所有的商品数
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.orderList = list
    }
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getOrderListFn()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
