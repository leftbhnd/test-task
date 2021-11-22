import Vue from 'vue'
import Vuex from 'vuex'
import { IUser } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [] as IUser[],
    newUserState: false,
    saveEventState: false,
    editEventState: false
  },
  mutations: {
    NEW_USER_OBSERVER (state, payload: boolean) {
      state.newUserState = payload
    },
    SAVE_EVENT_OBSERVER (state, payload: boolean) {
      state.saveEventState = payload
    },
    EDIT_EVENT_OBSERVER (state, payload: boolean) {
      state.editEventState = payload
    },

    SELECT_ALL_USERS (state, payload: IUser[]) {
      state.users = payload
    },
    SELECT_USER (state, payload: IUser[]) {
      state.users = payload
    },
    REMOVE_SELECTION (state, payload: IUser[]) {
      state.users = payload
    },

    GET_USERS_FROM_API (state, payload: IUser[]) {
      state.users = payload
    },
    ADD_NEW_USER (state, payload: IUser) {
      state.users.push(payload)
    },
    UPDATE_USER (state, payload: IUser[]) {
      state.users = payload
    },
    DELETE_USER (state, payload: IUser[]) {
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
    editEventObserver ({ commit }, payload: boolean) {
      commit('EDIT_EVENT_OBSERVER', payload)
    },

    selectAllUsers ({ commit }, payload: boolean) {
      let updated = []
      updated = this.state.users.map(user => {
        if (payload) {
          user.selected = true
        } else {
          user.selected = false
        }
        return user
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

    getUsersFromApi ({ commit }, payload: IUser[]) {
      const updated = payload.map(user => {
        user.id = Number(user.id)
        user.phone = Number(user.phone)
        user.code = Number(user.code)
        user.selected = false
        return user
      })
      commit('GET_USERS_FROM_API', updated)
    },
    addNewUser ({ commit }, payload: IUser) {
      commit('ADD_NEW_USER', payload)
    },
    updateUser ({ commit }, payload: IUser) {
      const updated = this.state.users.map(user => {
        if (user.id === payload.id) {
          return payload
        } else {
          return user
        }
      })
      commit('UPDATE_USER', updated)
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
    }
  },
  getters: {
    getNewUserState (state): boolean {
      return state.newUserState
    },
    getSaveEvent (state): boolean {
      return state.saveEventState
    },
    getEditEvent (state): boolean {
      return state.editEventState
    },
    getUsers (state): IUser[] {
      return state.users
    },
    getSelectedUsers (state): IUser[] {
      return state.users.filter(user => {
        if (user.selected) {
          return user
        }
      })
    }
  }
})
