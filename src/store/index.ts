import Vue from 'vue'
import Vuex from 'vuex'
import { IUser } from '@/store/types'
import { Validator } from '@/helpers/validator'

const validator = new Validator()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [] as IUser[],
    newUserState: false,
    saveEventState: false,
    editEventState: false,
    isNewUserValid: false,
    paginationStart: 0,
    paginationEnd: 14
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
    VALIDATION_OBSERVER (state, payload: IUser[]) {
      state.users = payload
    },
    NEW_USER_VALIDATION_OBSERVER (state, payload: boolean) {
      state.isNewUserValid = payload
    },
    CHANGE_USER_VALIDATION (state, payload: IUser[]) {
      state.users = payload
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
    },
    SET_PAGINATION_START (state, payload: number) {
      state.paginationStart = payload
    },
    SET_PAGINATION_END (state, payload: number) {
      state.paginationEnd = payload
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
    validationObserver (
      { commit },
      payload: { id: number; type: 'string'; value: string }
    ) {
      const updated = this.state.users.map(user => {
        if (user.id === payload.id) {
          const condition = validator.isValid({
            type: payload.type,
            value: payload.value
          })
          condition
            ? user.valid = true
            : user.valid = false
        }
        return user
      })
      commit('VALIDATION_OBSERVER', updated)
    },
    newUserValidationObserver ({ commit }, payload: boolean) {
      commit('NEW_USER_VALIDATION_OBSERVER', payload)
    },
    changeUserValidation ({ commit }, payload: { id: number, valid: boolean }) {
      const updated = this.state.users.map(user => {
        if (user.id === payload.id) {
          user.valid = payload.valid
        }
        return user
      })
      commit('CHANGE_USER_VALIDATION', updated)
    },

    selectAllUsers ({ commit }, payload: boolean) {
      let updated = []
      updated = this.state.users.map(user => {
        payload
          ? user.selected = true
          : user.selected = false
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
        user.selected = false
        user.valid = true
        return user
      })
      commit('GET_USERS_FROM_API', updated)
    },
    addNewUser ({ commit }, payload: IUser) {
      commit('ADD_NEW_USER', payload)
    },
    updateUser ({ commit }, payload: IUser) {
      const updated = this.state.users.map(user => {
        return user.id === payload.id
          ? payload
          : user
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
    },

    setPaginationStart ({ commit }, payload: number) {
      commit('SET_PAGINATION_START', payload)
    },
    setPaginationEnd ({ commit }, payload: number) {
      commit('SET_PAGINATION_END', payload)
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
    },

    getIsEditUserValid (state): boolean {
      const filtred = state.users.filter(user => {
        if (!user.valid) {
          return user
        }
      })
      return !filtred.length
    },
    getIsNewUserValid (state): boolean {
      return state.isNewUserValid
    },

    getPaginationStart (state): number {
      return state.paginationStart
    },
    getPaginationEnd (state): number {
      return state.paginationEnd
    }
  }
})
