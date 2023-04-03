import React, { ReactNode, useEffect } from 'react'
import { socket } from 'sockets/socket'
import { useNotifications } from 'hooks/useNotifications'

type Props = {
  children: ReactNode
}

export default function SocketIoErrorCatcher({ children }: Props) {
  const { addNotification } = useNotifications()
  useEffect(() => {
    socket.on('connect_error', () => {
      addNotification({ type: 'error', text: 'Opps, seems like our server is down, try reloading the page or come back later' })
    })
    socket.on('connect_failed', () => addNotification({ type: 'error', text: 'Opps, seems like our server is down, try reloading the page or come back later' }))
  }, []) 
  return (
    <>
      {children}
    </>
  )
}
