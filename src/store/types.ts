export interface IApiUser {
  name: string
  phone: string
  email: string
  registration: string
  code: string
  city: string
  id: number
}

export interface IUser extends IApiUser {
  selected: boolean
  valid: boolean
}

export interface IResponse {
  success: boolean
  payload: IUser[] | Record<string, never>
  description: string
}
