import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  avatar?: string
  email?: string
  phone?:string
  joined_day?: string
  initials?: {
    label: string
    state: string
  }
  role?: any
  position?: any
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  name: '',
  email: '',
  phone:''
}
