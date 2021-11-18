import { IUser } from '@/store/types'

export function isElementInArray (id: number, list: IUser[]): boolean {
  return list.some(el => {
    return el.id === id
  })
}

export function uniqueUsers (users: IUser[], selected: IUser[]): IUser[] {
  let index = 0
  const uniq = users.filter(el => {
    if (!isElementInArray(el.id, selected)) {
      el.id = index
      index++
      return el
    }
  }) as IUser[]
  console.log(uniq)
  return uniq
}
