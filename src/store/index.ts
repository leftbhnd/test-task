import Vue from 'vue'
import Vuex from 'vuex'
import fetch from 'node-fetch'

Vue.use(Vuex)

interface DataType {
  name: string;
  description: string;
  address: string;
  id: number;
  isDisable: boolean;
}

interface Response {
  item: DataType;
  payload: Array<DataType>;
  message: string;
  id: number;
  description: string;
  success: boolean;
}

export default new Vuex.Store({
  state: {
    data: [] as Response['payload']
  },
  mutations: {
    GET_USERS: function (state, payload: Response['payload']) {
      state.data = payload
    },
    CHANGE_USER: function (state, payload: Response['payload']) {
      state.data = payload
    },
    SAVE_USER: function (state, payload: Response['payload']) {
      state.data = payload
    },
    ADD_USER: function (state, payload: Response['payload']) {
      state.data = payload
    },
    REMOVE_USER: function (state, payload: Response['payload']) {
      state.data = payload
    }
  },
  actions: {
    getDataFromBack: async function ({ commit }) {
      try {
        const response = await fetch('http://localhost:8118/api/users')
        const data = await response.json() as Response
        if (data.success === true) {
          const users = data.payload.map(el => {
            el.isDisable = true
            return el
          })
          commit('GET_USERS', users)
        } else console.error('cannot get users')
      } catch (error) {
        console.error(error)
      }
    },
    changeUser: function ({ commit }, payload: {id: number}) {
      const newState = [...this.state.data]
      const users = newState.map(el => {
        if (el.id === payload.id) {
          el.isDisable = false
          return el
        } else return el
      })
      commit('CHANGE_USER', users)
    },
    saveUser: async function ({ commit }, payload: {id: number}) {
      const newState = [...this.state.data]
      const changedItem = newState.find(el => el.id === payload.id) as DataType
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
          const user = result.item
          const users = newState.map(el => {
            if (el.id === user.id) {
              el.name = user.name
              el.description = user.description
              el.address = user.address
              el.isDisable = true
              return el
            } else return el
          })
          commit('SAVE_USER', users)
        } else console.error('user cannot be changed')
      } catch (error) {
        console.error(error)
      }
    },
    addUser: async function ({ commit }, payload: {id: number}) {
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
          const user = result.item
          user.isDisable = true
          newState.push(user)
          commit('ADD_USER', newState)
        } else console.error('cannot add user')
      } catch (error) {
        console.error(error)
      }
    },
    removeUser: async function ({ commit }, payload: {id: number}) {
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
          const users = newState.filter(el => el.id !== id)
          commit('REMOVE_USER', users)
        } else console.error('cannot delete item')
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
