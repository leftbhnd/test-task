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
        city: 'Perm'
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 2,
        city: 'Perm'
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 3,
        city: 'Perm'
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 4,
        city: 'Perm'
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 5,
        city: 'Perm'
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 6,
        city: 'Perm'
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 7,
        city: 'Perm'
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 8,
        city: 'Perm'
      },
      {
        name: 'Дима',
        phone: 228,
        email: 'd@p.ru',
        registration: '01.11.1999',
        code: 12,
        city: 'Perm'
      }
    ] as IUser[],
    newUser: {
      name: '',
      phone: '',
      email: '',
      registration: '',
      code: '',
      city: ''
    } as IUser,
    newUserState: false,
    saveEventState: false
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
    }
  },
  actions: {
    newUserObserver ({ commit }, payload: boolean): void {
      commit('NEW_USER_OBSERVER', payload)
    },
    newUserWatcher ({ commit }, payload: { type: keyof IUser, data: string }): void {
      this.state.newUser[payload.type] = payload.data
      commit('NEW_USER_WATCHER', this.state.newUser)
    },
    addNewUser ({ commit }, payload: IUser) {
      commit('ADD_NEW_USER', payload)
    },
    saveEventObserver ({ commit }, payload: boolean) {
      commit('SAVE_EVENT_OBSERVER', payload)
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
    }
  }
})
