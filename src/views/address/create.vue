<template>
  <div class="create">
    <van-nav-bar
      title="新增收货地址"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="page-title">
      <span class="title">收货地址</span>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="姓名"
        label="姓名"
        placeholder="请输入收货人姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field
        v-model="phone"
        name="电话"
        label="电话"
        placeholder="请输入收货人电话号码"
        :rules="[{ required: true, message: '请输入电话号码' }]"
      />
      <!-- <van-field
        readonly
        clickable
        name="area"
        :value="addressValue"
        label="地区"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup> -->
      <van-field
        v-model="addressDetail"
        name="详细地址"
        label="详细地址"
        placeholder="请输入收货详细地址"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      />
      <div style="margin: 16px;">
        <van-button v-if="!$route.query.mode" round block type="info" native-type="submit" color="red">提交</van-button>
      </div>
    </van-form>
      <van-button v-if="$route.query.mode" round block type="info" color="red" @click="editAddress">修改</van-button>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
export default {
  name: 'createAddressIndex',
  data () {
    return {
      username: this.$route.query.name || '',
      phone: this.$route.query.phone || '',
      addressDetail: this.$route.query.detail || '',
      // addressValue: '',
      showArea: false,
      areaList
      // areaCodeList: []
    }
  },
  computed: {
    region () {
      return [
        {
          label: '上海',
          value: 782
        },
        {
          label: '上海市',
          value: 783
        },
        {
          label: '徐汇区',
          value: 785
        }
      ]
    },
    formObj () {
      return {
        name: this.username,
        phone: this.phone,
        detail: this.addressDetail,
        region: this.region
      }
    }
  },
  methods: {
    onSubmit (values) {
      // 接口地区码规则未说明，这里无法实现地区确认
      this.$store.dispatch('address/addAddressAction', this.formObj)
      this.$router.replace('/address')
    },
    editAddress () {
      // console.log('vuex发送修改请求')
      const obj = {}
      obj.addressId = this.$route.query.address_id
      obj.formObj = this.formObj
      this.$store.dispatch('address/editAddressAction', obj)
      this.$router.replace('/address')
    }
    // onConfirm (values) {
    //   // 存储地区码
    //   this.areaCodeList = values.map(item => item.code)
    //   this.addressValue = values
    //     .filter((item) => !!item)
    //     .map((item) => item.name)
    //     .join('/')
    //   this.showArea = false
    // }
  }
}
</script>

<style scoped lang="less">
.create {
  .page-title {
    width: 94%;
    margin: 0 auto;
    padding-top: 29px;
    font-size: 20px;
    color: rgba(69,90,100,.6);
  }
}
</style>
