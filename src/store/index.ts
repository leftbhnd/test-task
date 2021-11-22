import Vue from 'vue'
import Vuex from 'vuex'
import { IUser } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [] as IUser[],
    newUserState: false,
    saveEventState: false,
    editState: false
  },
  mutations: {
    NEW_USER_OBSERVER (state, payload: boolean) {
      state.newUserState = payload
    },
    SAVE_EVENT_OBSERVER (state, payload: boolean) {
      state.saveEventState = payload
    },
    EDIT_OBSERVER (state, payload: boolean) {
      state.editState = payload
    },
    SELECT_ALL_USERS (state, payload: IUser[]) {
      state.users = payload
    },

    ADD_NEW_USER (state, payload: IUser) {
      state.users.push(payload)
    },
    SELECT_USER (state, payload: IUser[]) {
      state.users = payload
    },
    REMOVE_SELECTION (state, payload: IUser[]) {
      state.users = payload
    },

    DELETE_USER (state, payload: IUser[]) {
      state.users = payload
    },
    UPDATE_USER (state, payload: IUser[]) {
      state.users = payload
    },
    GET_USERS_FROM_API (state, payload: IUser[]) {
      state.users = payload
    }
  },
  actions: {
    newUserObserver ({ commit }, payload: boolean): void {
      commit('NEW_USER_OBSERVER', payload)
    },
    saveEventObserver ({ commit }, payload: boolean) {
      commit('SAVE_EVENT_OBSERVER', payload)
    },
    editObserver ({ commit }, payload: boolean) {
      commit('EDIT_OBSERVER', payload)
    },

    selectAllUsers ({ commit }, payload: boolean) {
      let updated = []
      updated = this.state.users.map(el => {
        if (payload) {
          el.selected = true
        } else {
          el.selected = false
        }
        return el
      })
      commit('SELECT_ALL_USERS', updated)
    },

    selectUser ({ commit }, payload: number) {
      const updated = this.state.users.map(user => {
        if (user.id === payload) {
          user.selected = true
        }
        return user
      })
      commit('SELECT_USER', updated)
    },
    removeSelection ({ commit }, payload: number) {
      const updated = this.state.users.map(user => {
        if (user.id === payload) {
          user.selected = false
        }
        return user
      })
      commit('REMOVE_SELECTION', updated)
    },

    addNewUser ({ commit }, payload: IUser) {
      commit('ADD_NEW_USER', payload)
    },
    deleteUser ({ commit }) {
      let index = 0
      const updated = this.state.users.filter(user => {
        if (!user.selected) {
          user.id = index
          index++
          return user
        }
      })
      commit('DELETE_USER', updated)
    },
    updateUser ({ commit }, payload: { id: number, user: IUser }) {
      const updated = this.state.users.map(el => {
        if (el.id === payload.id) {
          return payload.user
        } else {
          return el
        }
      })
      commit('UPDATE_USER', updated)
    },
    getUsersFromApi ({ commit }, payload: IUser[]) {
      const updated = payload.map(el => {
        el.id = Number(el.id)
        el.phone = Number(el.phone)
        el.code = Number(el.code)
        el.selected = false
        return el
      })
      commit('GET_USERS_FROM_API', updated)
    }
  },
  getters: {
    getUsers (state): IUser[] {
      return state.users
    },
    getSelectedUsers (state): IUser[] {
      return state.users.filter(user => {
        if (user.selected) {
          return user
        }
      })
    },

    getNewUserState (state): boolean {
      return state.newUserState
    },
    getSaveEvent (state): boolean {
      return state.saveEventState
    },
    getEditState (state): boolean {
      return state.editState
    }
  }
})
