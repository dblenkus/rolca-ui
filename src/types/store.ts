import { ContestType } from './api'

type _IdType = {
  id: number
}

export type ContestStateType = {
  contests: Array<ContestType>
}

export type NotificationWithoutIdType = {
  type: string
  message: string
}

export type NotificationType = NotificationWithoutIdType & _IdType

export type NotificationStateType = {
  notifications: Array<NotificationType>
}
