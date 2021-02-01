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
  description: string;
  success: boolean;
}

export default new Vuex.Store({
  state: {
    data: [] as Array<DataType>
  },
  mutations: {
    GET_USERS: function (state, payload) {
      state.data = payload
    },
    CHANGE_USER: function (state, payload) {
      state.data = payload
    },
    SAVE_USER: function (state, payload) {
      state.data = payload
    },
    ADD_USER: function (state, payload) {
      state.data = payload
    },
    REMOVE_USER: function (state, payload) {
      state.data = payload
    }
  },
  actions: {
    getDataFromBack: async function ({ commit }) {
      try {
        const response = await fetch('http://localhost:8118/api/users')
        let payload = await response.json()
        if (payload.success === true) {
          payload = payload.data.map((el: DataType) => {
            el.isDisable = true
            return el
          })
          commit('GET_USERS', payload)
        } else console.error('cannot get users')
      } catch (error) {
        console.error(error)
      }
    },
    changeUser: function ({ commit }, payload) {
      const newState = [...this.state.data]
      const changedState = newState.map(el => {
        if (el.id === payload) {
          el.isDisable = false
          return el
        } else return el
      })
      payload = changedState
      commit('CHANGE_USER', payload)
    },
    saveUser: async function ({ commit }, payload) {
      const newState = [...this.state.data]
      const changedItem = newState.find(el => el.id === payload)
      try {
        const response = await fetch('http://localhost:8118/api/update', {
          method: 'PATCH',
          body: JSON.stringify(changedItem),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = (await response.json()) as Response
        if (result.message === 'success') {
          const user = result.data
          const changedState = newState.map(el => {
            if (el.id === user.id) {
              el.name = user.name
              el.age = user.age
              el.address = user.address
              el.isDisable = true
              return el
            } else return el
          })
          payload = changedState
          commit('SAVE_USER', payload)
        } else console.error('user cannot be changed')
      } catch (error) {
        console.error(error)
      }
    },
    addUser: async function ({ commit }, payload) {
      const newState = [...this.state.data]
      try {
        const response = await fetch('http://localhost:8118/api/user', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = (await response.json()) as Response
        if (result.message === 'success') {
          const user = result.data
          user.isDisable = true
          newState.push(user)
          payload = newState
          commit('ADD_USER', payload)
        } else console.error('cannot add user')
      } catch (error) {
        console.error(error)
      }
    },
    removeUser: async function ({ commit }, payload) {
      const newState = [...this.state.data]
      try {
        const response = await fetch('http://localhost:8118/api/delete', {
          method: 'DELETE',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = (await response.json()) as Response
        const id = result.id
        const message = result.message
        if (message === 'deleted') {
          const changedState = newState.filter(el => el.id !== id)
          payload = changedState
        } else console.error('cannot delete item')
        commit('REMOVE_USER', payload)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    getUsers: function (state) {
      return state.data
    }
  }
})
