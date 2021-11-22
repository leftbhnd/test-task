export interface IApiUser {
  name: string
  phone: number | string
  email: string
  registration: string
  code: number
  city: string
  id: number
}

export interface IUser extends IApiUser {
  selected: boolean
}

export interface IResponse {
  success: boolean
  payload: IUser[] | Record<string, never>
  description: string
}
