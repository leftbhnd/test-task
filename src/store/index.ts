import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'node-fetch'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    GET_DATA: function (state, payload) {
      state.data = payload
    },
    CHANGE_ITEM: function (state, payload) {
      state.data = payload
    },
    SAVE_ITEM: function (state, payload) {
      state.data = payload
    },
    ADD_ITEM: function (state, payload) {
      state.data.push(payload)
    }
  },
  actions: {
    getDataFromBack: async function ({ commit }) {
      try {
        const response = await fetch('http://localhost:8118/api/users')
        let payload = await response.json()
        payload = payload.data.map((el: any) => {
          el.isDisable = true
          return el
        })
        commit('GET_DATA', payload)
      } catch (error) {
        console.error(error)
      }
    },
    changeItem: function ({ commit }, payload) {
      const newState = [...this.state.data]
      const changedState = newState.map((el: any) => {
        if (el.id === payload) {
          el.isDisable = false
          return el
        } else return el
      })
      payload = changedState
      commit('CHANGE_ITEM', payload)
    },
    saveItem: function ({ commit }, payload) {
      const newState = [...this.state.data]
      const changedState = newState.map((el: any) => {
        if (el.id === payload) {
          el.isDisable = true
          return el
        } else return el
      })
      payload = changedState
      commit('SAVE_ITEM', payload)
    },
    addItem: function ({ commit }, payload) {
      commit('ADD_ITEM', payload)
    }
  },
  getters: {
    getData: function (state) {
      return state.data
    }
  }
})
