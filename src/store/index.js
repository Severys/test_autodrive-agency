import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCity : '',
  },
  getters: {
  },
  mutations: {
    changeCurentCity (state,currentCity){
      state.currentCity = currentCity
    }
  },
  actions: {
  },
  modules: {
  }
})
