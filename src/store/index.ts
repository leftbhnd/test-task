import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'node-fetch'

Vue.use(Vuex)

interface DataType {
  name: string;
  age: number;
  address: string;
  id: number;
  isDisable: boolean;
}

interface Response {
  data: {
    name: string;
    age: number;
    address: string;
    id: number;
    isDisable: boolean;
  };
  message: string;
  id: number;
}

export default new Vuex.Store({
  state: {
    data: [] as Array<DataType>
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
      state.data = payload
    },
    REMOVE_ITEM: function (state, payload) {
      state.data = payload
    }
  },
  actions: {
    getDataFromBack: async function ({ commit }) {
      try {
        const response = await fetch('http://localhost:8118/api/users')
        let payload = await response.json()
        payload = payload.data.map((el: DataType) => {
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
      const changedState = newState.map((el: DataType) => {
        if (el.id === payload) {
          el.isDisable = false
          return el
        } else return el
      })
      payload = changedState
      commit('CHANGE_ITEM', payload)
    },
    saveItem: async function ({ commit }, payload) {
      const newState = [...this.state.data]
      const changedItem = newState.find((el: DataType) => el.id === payload) as DataType
      try {
        const response = await fetch('http://localhost:8118/api/update', {
          method: 'PATCH',
          body: JSON.stringify(changedItem),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json() as Response
        const user = result.data
        const changedState = newState.map((el: DataType) => {
          if (el.id === user.id) {
            el.name = user.name
            el.age = user.age
            el.address = user.address
            el.isDisable = true
            return el
          } else return el
        })
        payload = changedState
        commit('SAVE_ITEM', payload)
      } catch (error) {
        console.error(error)
      }
    },
    addItem: async function ({ commit }, payload) {
      const newState = [...this.state.data]
      try {
        const response = await fetch('http://localhost:8118/api/user', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json() as Response
        let user = {} as DataType
        user = result.data
        user.isDisable = true
        newState.push(user)
        payload = newState
        commit('ADD_ITEM', payload)
      } catch (error) {
        console.error(error)
      }
    },
    removeItem: async function ({ commit }, payload) {
      const newState = [...this.state.data]
      try {
        const response = await fetch('http://localhost:8118/api/delete', {
          method: 'DELETE',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json() as Response
        const id = result.id
        const message = result.message
        if (message === 'deleted') {
          const changedState = newState.filter((el: DataType) => el.id !== id) as Array<DataType>
          payload = changedState
        }
        commit('REMOVE_ITEM', payload)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getData: function (state) {
      return state.data
    }
  }
})
