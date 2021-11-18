import { IUser } from '@/store/types'

export function isUserSelected (id: number, list: IUser[]): boolean {
  return list.some(el => {
    return el.id === id
  })
}
