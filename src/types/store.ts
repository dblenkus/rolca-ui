import { ContestType, TokenType } from './api'

type _IdType = {
  id: number
}

// Contest module types.

export type ContestStateType = {
  contests: Array<ContestType>
}

// Notification module types.

export type NotificationWithoutIdType = {
  type: string
  message: string
}

export type NotificationType = NotificationWithoutIdType & _IdType

export type NotificationStateType = {
  notifications: Array<NotificationType>
}

// User module types.

export type UserStateType = {
  token: TokenType | null
}

// Root types.

export type RootStateType = {
  app_name: string
}
