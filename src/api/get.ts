import { users } from '@/backend/users.json'
import { BaseApi } from '@/api/baseApi'
import { IResponse, IApiUser } from '@/store/types'
import store from '@/store'

export function getUsers (): void {
  const getUsers = new BaseApi()
  getUsers
    .get()
    .then((response: IResponse) => {
      store.dispatch('getUsersFromApi', response.payload as IApiUser[])
    })
    .catch((err) => {
      console.error(err)
    })
}

// заглушка
export function get (): void {
  const payload = []
  const data = JSON.parse(JSON.stringify(users))
  for (const key in data) {
    payload.push(data[key])
  }
  store.dispatch('getUsersFromApi', payload)
}
