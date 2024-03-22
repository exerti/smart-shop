import Vue from 'vue'
import Vuex from 'vuex'
import user from './moudles/user'
import cart from './moudles/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user, cart
  }
})
