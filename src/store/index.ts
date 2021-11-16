import Vue from 'vue'
import Vuex from 'vuex'
import { IUser } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 1,
        city: 'Perm',
        id: 0
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 2,
        city: 'Perm',
        id: 1
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 3,
        city: 'Perm',
        id: 2
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 4,
        city: 'Perm',
        id: 3
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 5,
        city: 'Perm',
        id: 4
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 6,
        city: 'Perm',
        id: 5
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 7,
        city: 'Perm',
        id: 6
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 8,
        city: 'Perm',
        id: 7
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 12,
        city: 'Perm',
        id: 8
      }
    ] as IUser[],
    newUser: {
      name: '',
      phone: '',
      email: '',
      registration: '',
      code: null,
      city: '',
      id: null
    } as IUser,
    selected: [] as IUser[],
    newUserState: false,
    saveEventState: false,
    editState: false,
    selectAllState: false
  },
  mutations: {
    NEW_USER_OBSERVER (state, payload: boolean) {
      state.newUserState = payload
    },
    NEW_USER_WATCHER (state, payload: IUser) {
      state.newUser = payload
    },
    ADD_NEW_USER (state, payload: IUser) {
      state.users.push(payload)
    },
    SAVE_EVENT_OBSERVER (state, payload: boolean) {
      state.saveEventState = payload
    },
    SELECT_USER (state, payload: IUser) {
      state.selected.push(payload)
    },
    REMOVE_SELECTION (state, payload: IUser[]) {
      state.selected = payload
    },
    CANCEL_SELECTION (state) {
      state.selected = []
      state.selectAllState = false
    },
    SELECT_ALL_OBSERVER (state, payload: boolean) {
      state.selectAllState = payload
    }
  },
  actions: {
    newUserObserver ({ commit }, payload: boolean): void {
      commit('NEW_USER_OBSERVER', payload)
    },
    newUserWatcher (
      { commit },
      payload: { type: keyof IUser; data: string | number }
    ): void {
      this.state.newUser[payload.type] = payload.data
      commit('NEW_USER_WATCHER', this.state.newUser)
    },
    addNewUser ({ commit }, payload: IUser) {
      commit('ADD_NEW_USER', payload)
    },
    saveEventObserver ({ commit }, payload: boolean) {
      commit('SAVE_EVENT_OBSERVER', payload)
    },
    selectUser ({ commit }, payload: IUser) {
      commit('SELECT_USER', payload)
    },
    removeSelection ({ commit }, payload: number) {
      const updated = this.state.selected.filter(user => {
        return user.id !== payload
      })
      commit('REMOVE_SELECTION', updated)
    },
    cancelSelection ({ commit }) {
      commit('CANCEL_SELECTION')
    },
    selectAllObserver ({ commit }, payload: boolean) {
      commit('SELECT_ALL_OBSERVER', payload)
    }
  },
  getters: {
    getUsers (state): IUser[] {
      return state.users
    },
    getNewUserState (state): boolean {
      return state.newUserState
    },
    getSaveEvent (state): boolean {
      return state.saveEventState
    },
    getSelectedUsers (state): IUser[] {
      return state.selected
    },
    getSelectAllState (state): boolean {
      return state.selectAllState
    },
    getEditState (state): boolean {
      return state.editState
    }
  }
})
