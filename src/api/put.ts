import { BaseApi } from '@/api/baseApi'
import { IResponse, IApiUser } from '@/store/types'
import store from '@/store'

export function putUser (payload: IApiUser): void {
  const putUser = new BaseApi()
  putUser
    .put(payload)
    .then((response: IResponse) => {
      store.dispatch('getUsersFromApi', response.payload as IApiUser[])
    })
    .catch((err) => {
      console.error(err)
    })
}
