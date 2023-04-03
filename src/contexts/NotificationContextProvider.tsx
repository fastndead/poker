import { animated, useSpring, useSpringRef, useTransition } from '@react-spring/web'
import React, { CSSProperties, ReactNode, useCallback, useEffect, useState, useMemo } from 'react'
import { NotificatoinsContext } from './NotificationsContext'

export type Notification = {
  type: 'success' | 'error'
  text: string
}

export default function NotificationContextProvider({ children }: {children: ReactNode}) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((notification: Notification) => {
    if (notifications.find((notif) => notif.text === notification.text)){
      return
    }
    setNotifications((prev: Notification[]) => [...prev, notification]) 
  }, [setNotifications])

  const [transitions, api] = useTransition(notifications, () => {
    return {
      from: { opacity: 0, y: -30 },
      enter: { opacity: 1, y: 0 },
      leave: { opacity: 0, y: -30 },
      config: { tension: 310, friction: 20, mass: 2 }, 
    } 
  })

  const handleDissmiss = useCallback((index: number) => () => {
    setNotifications((prev) => prev.filter((_, i) => index !== i))
  }, [setNotifications])

  useEffect(() => {
    api.start()
  }, [notifications.length])

  return (
    <NotificatoinsContext.Provider
      value={{
        addNotification
      }}
    >
      {children}
      <div
        className='fixed top-4 w-96 left-2/4 -translate-x-2/4'
      >
        {transitions((notifStyles, notif, state, index) => {
          console.log({ notifStyles, notif, state, index })
          return (
            <Notification  
              onDismiss={handleDissmiss(index)}
              key={state.key}
              text={notif.text}
              type={notif.type}
              style={notifStyles as unknown as CSSProperties}
            />
          )
        })}
      </div>
    </NotificatoinsContext.Provider>
  )
}


type NotificationProps = Notification & {
  style: CSSProperties
  onDismiss(): void
}

function Notification({ text, type, style, onDismiss }: NotificationProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const [spring] = useSpring(() => {
    return isHovered
      ? { scale: 1.1 }
      : { scale: 1 }
  }, [isHovered])

  return (
    <animated.div
      style={{
        scale: spring.scale,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onDismiss}
      className='cursor-pointer bg-white relative w-96 mt-4 rounded-xl border border-primary-emphasis p-4 shadow-modal text-center'
    >
      {text}
    </animated.div>
  )
}
