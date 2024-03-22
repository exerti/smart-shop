<template>
  <div class="search">
    <van-nav-bar title="商品搜素" left-arrow @click-left="onClickLeft" />
    <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" autofocus="true">
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
    </van-search>
    <!-- 搜索历史 -->
    <div class="search-history"  v-if="searchHistory.length >0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon  @click="onRemove" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="(item, index) in  searchHistory" :key="index" class="list-item"   @click="onSearch(item)">{{item}}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getSearch, removeSearch, setSearch } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      value: '',
      searchHistory: getSearch()
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onSearch (item) {
      if (item === '') {
        return
      }
      console.log('我被访问量，当前值是', this.value)
      const index = this.searchHistory.indexOf(item)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(item)
      setSearch(this.searchHistory)
      this.$router.push(`/searchlist?search=${item}`)
    },
    onRemove () {
      this.searchHistory = []
      removeSearch()
      this.$toast('清理数据成功')
      this.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 24%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
