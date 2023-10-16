<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="searchKey || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns" @click="changeType">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in productList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { getProductList } from '@/api/product'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      page: 1,
      productList: []
    }
  },
  computed: {
    searchKey () {
      return this.$route.query.key
    }
  },
  methods: {
    changeType (e) {
      const type = e.target.innerText
      if (type === '综合') {
        this.getProductListData('all')
      } else if (type === '销量') {
        this.getProductListData('sales')
      } else if (type === '价格') {
        this.getProductListData('price')
      }
    },
    async getProductListData (type) {
      const { data: { list } } = await getProductList({
        categoryId: this.$route.query.categoryId,
        sortType: type,
        goodsName: this.searchKey,
        page: this.page
      })
      this.productList = list.data
    }
  },
  created () {
    this.getProductListData('all')
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
