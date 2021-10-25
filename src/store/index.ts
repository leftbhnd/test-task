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
    ] as IUser[]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getUsers (state): IUser[] {
      return state.users
    }
  }
})
