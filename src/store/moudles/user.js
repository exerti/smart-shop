import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      userInfo: getInfo()
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setInfo(userInfo)
    }
  }
}
