<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.line_price_min }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ comment.total }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in comment.list" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImage" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score" color="#ffd21e" void-icon="star" void-color="#eee" />
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content">
    </div>

    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24"  @click="$toast('该模块后续开发oh')"/>
      <van-goods-action-icon icon="cart-o" text="购物车"  :badge="cartTotal"  @click="$router.push('/cart')" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addFn" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyFn" />
    </van-goods-action>

    <!-- 购物车弹层 -->
    <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入购物车' : '立刻购买'" @>
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <CountBox v-model="addCount"></CountBox>
        </div>
        <div class="showbtn" v-if="detail.stock_total > 0">
          <div class="btn" v-if="mode === 'cart'" @click="handleAdd">加入购物车</div>
          <div class="btn now" v-if="mode === 'buyNow'"    @click="goPay">立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>

    <!-- <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="goodsId" :quota="quota" :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock" :message-config="messageConfig" @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked" > </van-sku> -->

  </div>
</template>

<script>
import { getGoodsDetail } from '@/api/product'
import { getComment } from '@/api/comment'
import CountBox from '@/components/CountBox.vue'
import { addCart, getCartGoodsTotal } from '@/api/cart'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'ProDetail',
  mixins: [loginConfirm],
  data () {
    return {
      images: [],
      current: 0,
      detail: [],
      comment: [],
      defaultImage: 'http://cba.itlike.com/public/uploads/10001/20230321/a0db9adb2e666a65bc8dd133fbed7834.png',
      mode: 'cart',
      showPannel: false,
      addCount: 1,
      cartTotal: 0
    }
  },
  created () {
    this.getDetail()
    this.getComment()
    this.getTotal()
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }

  },
  methods: {
    onChange (index) {
      this.current = index
    },
    async getDetail () {
      const { data } = await getGoodsDetail(this.$route.params.id)
      this.images = data.detail.goods_images
      this.detail = data.detail
    },
    async getComment () {
      const { data } = await getComment(this.$route.params.id)
      this.comment = data
      console.log(this.comment)
    },
    addFn () {
      this.mode = 'cart'
      this.showPannel = true
    },
    buyFn () {
      this.mode = 'buyNow'
      this.showPannel = true
    },
    async handleAdd () {
      // 判断用户是否登录
      // if (!this.$store.getters.token) {
      //   this.$dialog.confirm({
      //     title: '温馨提示',
      //     message: '此时需要先去登录才能继续操作哦',
      //     confirmButtonText: '去登录',
      //     cancelButtonText: '再逛逛'
      //   })
      //     .then(() => {
      //       // on confirm
      //       this.$router.replace({
      //         path: '/login',
      //         query: {
      //           backUrl: this.$route.fullPath
      //         }
      //       })
      //     })
      //     .catch(() => {
      //       // on cancel
      //     })
      // }
      // // 添加到购物车
      // const { data } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      // this.cartTotal = data.cartTotal
      // this.$toast('加入购物车成功')
      // this.showPannel = false
      if (this.loginConfirm()) {
        return
      }
      const { data } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = data.cartTotal
      this.$toast('加入购物车成功')
      this.showPannel = false
      console.log(this.cartTotal)
    },
    async getTotal () {
      const { data } = await getCartGoodsTotal()
      this.cartTotal = data.cartTotal
    },
    goPay () {
      if (this.loginConfirm()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.addCount
        }
      })
    }

  },
  components: { CountBox }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  img {
    display: block;
    width: 100%;
  }

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .desc {
    width: 100%;
    overflow: scroll;

    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }

  .info {
    padding: 10px;
  }

  .title {
    display: flex;
    justify-content: space-between;

    .now {
      color: #fa2209;
      font-size: 20px;
    }

    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }

    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }

  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }

  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;

    .left-words {
      span {
        margin-right: 10px;
      }

      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }

  .comment-title {
    display: flex;
    justify-content: space-between;

    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;

    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;

      img {
        width: 20px;
        height: 20px;
      }

      .name {
        margin: 0 10px;
      }
    }

    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon-home,
    .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .van-icon {
        font-size: 24px;
      }
    }

    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }

    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

// 弹层的样式
.product {
  .product-title {
    display: flex;

    .left {
      img {
        width: 90px;
        height: 90px;
      }

      margin: 10px;
    }

    .right {
      flex: 1;
      padding: 10px;

      .price {
        font-size: 14px;
        color: #fe560a;

        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn,
  .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }

  .btn.now {
    background-color: #fe5630;
  }

  .btn-none {
    background-color: #cccccc;
  }
}
</style>
