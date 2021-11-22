import { IUser } from '@/store/types'

export function isUserInArray (user: IUser, list: IUser[]): boolean {
  return list.some(el => {
    return el.id === user.id
  })
}
