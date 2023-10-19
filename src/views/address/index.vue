<template>
  <div class="address">
    <van-nav-bar
      title="收货地址"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="addressList" v-if="this.addressList.length > 0">
      <div class="addressItem" v-for="(address,index) in addressList" :key="address.address_id">
        <div class="userInfo">
          <span class="userId">{{address.name}}</span>
          <span class="userPhone">{{address.phone}}</span>
        </div>
        <div class="userAddress">
          {{address.region.province+
          address.region.city+
          address.region.region+
          address.detail}}
        </div>
        <hr>
        <div class="bottom">
          <div class="left">
            <span class="choice">
              <van-checkbox :value="true" checked-color="#ee0a24">{{index===0?'默认':'选择'}}</van-checkbox>
            </span>
          </div>
          <div class="right">
            <span class="edit">
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
    <div class="addBtn" @click="$router.push('/')">添加地址</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AddressIndex',
  data () {
    return {
      isLogin: this.$store.getters.token
    }
  },
  computed: {
    ...mapState('address', ['addressList'])
  },
  methods: {
    delAddress (id) {
      this.$store.dispatch('address/delAddressAction', id)
    }
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch('address/getAddressAction')
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
