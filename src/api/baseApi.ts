import { IApiUser, IResponse } from '@/store/types'
const http = 'http://127.0.0.1:8118/api/'

export class BaseApi {
  async get (): Promise<IResponse> {
    try {
      const response = await fetch(`${http}`)
      return await response.json()
    } catch (error) {
      return error
    }
  }

  async post (payload: IApiUser): Promise<IResponse> {
    try {
      const response = await fetch(`${http}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      return error
    }
  }

  async put (payload: IApiUser): Promise<IResponse> {
    try {
      const response = await fetch(`${http}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      return error
    }
  }

  async delete (id: number): Promise<IResponse> {
    try {
      const response = await fetch(`${http}`, {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return await response.json()
    } catch (error) {
      return error
    }
  }
}
