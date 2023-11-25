import { NotificatoinsContext } from 'contexts/NotificationsContext'
import { useContext } from 'react'

export function useNotifications() {
  const { addNotification } = useContext(NotificatoinsContext)
  return { addNotification }
}
