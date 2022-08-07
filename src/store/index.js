import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCity : {},
    cities: [
      {
      id: 1,
      name: "Москва"
      },
      {
      id: 2,
      name: "Санкт-Петербург"
      },
      {
      id: 3,
      name: "Казань"
      }
    ],
    answer: '',
    answerCode: false
  },
  mutations: {
    changeCurentCity (state,currentCity){
      if(typeof currentCity === 'number') state.currentCity = state.cities.find(el => el.id === currentCity)
      else state.currentCity = currentCity
    },
    setAnswer(state,answer) {
      state.answer = answer
    },
    changeAnswerCode (state,answerCode) {
      state.answerCode = answerCode
    }
  },
  actions: {
     async sendRequest({commit}, requestData){
      
      try{
        const request = await axios({
          method: 'post',
          url: 'http://hh.autodrive-agency.ru/test-tasks/front/task-7/',
          data: requestData
        })
        if(request.status === 200){
            commit('setAnswer',request.data)
            commit('changeAnswerCode', true)
            return true
          }
      }catch(e) {
        commit('setAnswer',e.response.data)
        commit('changeAnswerCode', false)
        return false
      }
    }
  }
})
