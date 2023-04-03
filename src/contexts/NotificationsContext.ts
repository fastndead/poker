import { createContext } from 'react'
import type { Notification } from './NotificationContextProvider'

type NotificationContextValue = {
  addNotification(notif: Notification): void
}

export const NotificatoinsContext = createContext<NotificationContextValue>({ addNotification: () => {/* */} })
