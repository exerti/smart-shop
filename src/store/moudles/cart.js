import { getCartList, updateCart, deleteCart } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartlist: []
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.checked = true
      })
      context.commit('setCartList', data.list)
    },
    async ChangeCountAction (context, payload) {
      // 1. 获取商品id
      const { value, goodsId, skuId } = payload

      // 2 把修改后的商品列表保存到vuex中
      context.commit('ChangeCount', { goodsId, value, skuId })
      // 3、修改后端的数据
      await updateCart(goodsId, value, skuId)
    },
    async  delSelect (context, payload) {
      // 选中商品
      const goods = context.getters.selCartList
      console.log(goods)
      const goodsId = goods.map(item => item.id)
      await deleteCart(goodsId)
      Toast('删除成功')

      // 获取新数据
      context.dispatch('getCartAction')
    }
  },
  mutations: {
    ChangeCount (state, payload) {
      const { goodsId, value } = payload
      const goods = state.cartlist.find(item => item.goods_id === goodsId)
      goods.goods_num = value
    },
    setCartList (state, list) {
      state.cartlist = list
    },
    toggleChecked (state, id) {
      const goods = state.cartlist.find(item => item.goods_id === id)
      goods.checked = !goods.checked
    },
    toggleAllChecked (state, isCheckedAll) {
      state.cartlist.forEach(item => {
        item.checked = isCheckedAll
      })
    }

  },
  getters: {
    cartTotal (state) {
      return state.cartlist.reduce((total, item) => total + item.goods_num, 0)
    },
    // 选中商品
    selCartList (state) {
      return state.cartlist.filter(item => item.checked)
    },
    // 选中的总数
    selNum (state, getters) {
      return getters.selCartList.reduce((total, item) => total + item.goods_num, 0)
    },
    // 选中的商品的总价
    selTotal (state, getters) {
      return getters.selCartList.reduce((total, item) => total + item.goods.goods_price_min * item.goods_num, 0).toFixed(2)
    },
    isCheckedAll (state, getters) {
      return state.cartlist.every(item => item.checked)
    }
  }
}
