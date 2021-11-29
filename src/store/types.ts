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

export interface IInputInfo {
  nameInfo: {
    type: string
    placeholder: string
    mask?: string
  }
  phoneInfo: {
    type: string
    placeholder: string
    mask?: string
  }
  emailInfo: {
    type: string
    placeholder: string
    mask?: string
  }
  registrationInfo: {
    type: string
    placeholder: string
    mask?: string
  }
  codeInfo: {
    type: string
    placeholder: string
    mask?: string
  }
  cityInfo: {
    type: string
    placeholder: string
    mask?: string
  }
}
