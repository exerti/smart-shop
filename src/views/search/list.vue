<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      show-action
      :value="querySearch || '搜索商品'"
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getGoodsList } from '@/api/product'
import { all } from 'axios'
export default {
  name: 'SearchIndex',
  data () {
    return {
      // 商品列表数据
      goodsList: [],
      page: 1

    }
  },
  async created () {
    console.log(this.$route.query.search)
    // 获取商品列表数据
    const res = await getGoodsList({
      sortType: all,
      sortPrice: 1,
      categoryId: this.$route.query.categoryid,
      goodsName: this.querySearch,
      page: this.page
    })
    this.goodsList = res.data.list.data
    console.log(res)
  },
  computed: {
    querySearch () {
      // 获取路由参数
      return this.$route.query.search
    }
  },
  components: {
    GoodsItem
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
