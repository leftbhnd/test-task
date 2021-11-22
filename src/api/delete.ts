import { BaseApi } from '@/api/baseApi'
import { IResponse, IApiUser } from '@/store/types'
import store from '@/store'

export function deleteUser (id: number): void {
  const deleteUser = new BaseApi()
  deleteUser
    .delete(id)
    .then((response: IResponse) => {
      store.dispatch('getUsersFromApi', response.payload as IApiUser[])
    })
    .catch((err) => {
      console.error(err)
    })
}
