import { BaseApi } from '@/api/baseApi'
import { IResponse, IApiUser } from '@/store/types'
import store from '@/store'

export function postUser (payload: IApiUser): void {
  const postUser = new BaseApi()
  postUser
    .post(payload)
    .then((response: IResponse) => {
      store.dispatch('getUsersFromApi', response.payload as IApiUser[])
    })
    .catch((err) => {
      console.error(err)
    })
}
