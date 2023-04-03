import { animated, useSpring, useSpringRef, useTransition } from '@react-spring/web'
import React, { CSSProperties, ReactNode, useCallback, useEffect, useState, useMemo } from 'react'
import { NotificatoinsContext } from './NotificationsContext'

export type Notification = {
  type: 'success' | 'error'
  text: string
}

export default function NotificationContextProvider({ children }: {children: ReactNode}) {
  const [notifications, setNotifications] = useState<Map<string, 'success' | 'error'>>(new Map())

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => new Map([...prev, [notification.text, notification.type]])) 
  }, [setNotifications])

  const formattedNotificatoins = useMemo(() => Array.from(notifications).map(item => ({ text: item[0], type: item[1] })), [notifications])


  console.log({ formattedNotificatoins })
  console.log({ notifications })

  const [transitions, api] = useTransition(formattedNotificatoins, () => {
    return {
      key: (item: Notification) => item.text,
      from: { opacity: 0, y: -30 },
      enter: { opacity: 1, y: 0 },
      leave: { opacity: 0, y: -30 },
      config: { tension: 310, friction: 20, mass: 2 }, 
    } 
  })

  const handleDismiss = useCallback((key: string) => () => {
    setNotifications((prev) => {
      prev.delete(key)
      return new Map(prev)
    })
  }, [setNotifications])

  useEffect(() => {
    api.start()
  }, [notifications])

  return (
    <NotificatoinsContext.Provider
      value={{
        addNotification
      }}
    >
      {children}
      <div
        className='fixed top-0 w-96 left-2/4 -translate-x-2/4'
      >
        {transitions((notifStyles, notif, state, index) => {
          console.log({ notifStyles, notif, state, index })
          return (
            <Notification  
              onDismiss={handleDismiss(notif.text)}
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
