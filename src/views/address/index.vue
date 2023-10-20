<template>
  <div class="address">
    <van-nav-bar
      title="收货地址"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="addressList" v-if="this.addressList.length > 0">
      <div class="addressItem" v-for="(address) in addressList" :key="address.address_id">
        <div class="userInfo">
          <span class="userId">{{address.name}}</span>
          <span class="userPhone">{{address.phone}}</span>
        </div>
        <div class="userAddress">
          {{address.detail}}
        </div>
        <hr>
        <div class="bottom">
          <div class="left">
            <span class="choice" @click="setDefaultAddress(address.address_id)">
              <van-checkbox :value="address.address_id===defaultAddressId" checked-color="#ee0a24">{{address.address_id===defaultAddressId?'默认':'选择'}}</van-checkbox>
            </span>
          </div>
          <div class="right">
            <span class="edit" @click="editAddress(address.address_id)">
              <van-icon name="edit" />
              编辑
            </span>
            <span class="del" @click="delAddress(address.address_id)">
              <van-icon name="delete" />
              删除
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-address" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的地址栏是空的, 快去添加吧
      </div>
    </div>
    <div class="addBtn" @click="$router.push('/create')">添加地址</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDefaultAddressId } from '@/api/address'
export default {
  name: 'AddressIndex',
  data () {
    return {
      isLogin: this.$store.getters.token
    }
  },
  computed: {
    ...mapState('address', ['addressList', 'defaultAddressId'])
  },
  methods: {
    delAddress (id) {
      this.$store.dispatch('address/delAddressAction', id)
    },
    editAddress (id) {
      // 先跳转到create页面
      // 获取当前id地址数据
      const address = this.addressList.find(item => item.address_id === id)
      this.$router.replace({
        path: '/create',
        query: {
          mode: 'edit',
          address_id: id,
          name: address.name,
          phone: address.phone,
          detail: address.detail
        }
      })
    },
    setDefaultAddress (id) {
      this.$store.dispatch('address/setDefaultAddressAction', id)
      if (this.$route.query.from) {
        // 如果从支付页来的
        this.$router.go(-1)
      }
    },
    async getDefaultAddressId () {
      await getDefaultAddressId()
    },
    getAddressList () {
      this.$store.dispatch('address/getAddressAction')
    }
  },
  created () {
    if (this.isLogin) {
      this.getAddressList()
    }
  }
}
</script>

<style scoped lang="less">
.address {
  min-height: 100vh;
  background-color: rgb(250, 250, 250);
  .addressList {
    .addressItem {
      margin: 14px;
      padding: 10px 20px;
      height: 115px;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      border-radius: 5px;
      .userInfo {
        margin-bottom: 10px;
      }
      .userAddress {
        margin-bottom: 10px;
      }
      .bottom {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .empty-address {
    padding: 80px 30px;
    img {
      width: 140px;
      height: 92px;
      display: block;
      margin: 0 auto;
    }
    .tips {
      text-align: center;
      color: #666;
      margin: 30px;
    }
  }
  .addBtn {
    position: fixed;
    left: 22px;
    bottom: 10px;
    font-size: 14px;
    width: 90%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    color: #fff;
    border-radius: 25px;
    background: linear-gradient(90deg,#f9211c,#ff6335);
  }
}
</style>
