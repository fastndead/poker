import { animated, useSpring, useTransition } from '@react-spring/web'
import React, { CSSProperties, ReactNode, useCallback, useEffect, useState, useMemo } from 'react'
import { NotificatoinsContext } from './NotificationsContext'

export type Notification = {
  type: 'success' | 'error'
  text: string
  timer?: ReturnType<typeof setTimeout>
}

export default function NotificationContextProvider({ children }: {children: ReactNode}) {
  const [notifications, setNotifications] = useState<Map<string, Omit<Notification,'text'>>>(new Map())

  const handleDismissFactory = useCallback((key: string) => () => {
    setNotifications((prev) => {
      prev.delete(key)
      return new Map(prev)
    })
  }, [setNotifications])

  const addNotification = useCallback((notification: Notification) => {
    const timer = setTimeout(() => {handleDismissFactory(notification.text)()}, 2000)

    setNotifications((prev) => new Map([...prev, [notification.text, { type: notification.type, timer }]])) 
  }, [setNotifications, handleDismissFactory])

  const formattedNotificatoins = useMemo(() => Array.from(notifications).map(item => ({ text: item[0], ...item[1] })), [notifications])

  const [transitions, api] = useTransition(formattedNotificatoins, () => {
    return {
      key: (item: Notification) => item.text,
      from: { opacity: 0, y: -30 },
      enter: { opacity: 1, y: 0 },
      leave: { opacity: 0, y: -30 },
      config: { tension: 310, friction: 20, mass: 2 }, 
    } 
  })

  const handleMouseEnter = useCallback((key: string) => {
    clearTimeout(notifications.get(key)?.timer)
  }, [notifications])

  const handleMouseLeave = useCallback((key: string) => {
    const timer = setTimeout(() => {handleDismissFactory(key)()}, 2000)
    const notification = notifications.get(key) || {} as Notification
    notifications.set(key, { ...notification, timer } )

  }, [handleDismissFactory, notifications])

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
        {transitions((notifStyles, notif, state) => {
          return (
            <Notification  
              onDismiss={handleDismissFactory(notif.text)}
              key={state.key}
              text={notif.text}
              type={notif.type}
              style={notifStyles as unknown as CSSProperties}
              onMouseEnter={() => handleMouseEnter(notif.text)}
              onMouseLeave={() => handleMouseLeave(notif.text)}
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
  onMouseEnter?(): void
  onMouseLeave?(): void
}

function Notification({ text, style, onDismiss, onMouseLeave, onMouseEnter }: NotificationProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const [spring] = useSpring(() => {
    return isHovered
      ? { scale: 1.1 }
      : { scale: 1 }
  }, [isHovered])

  const handleMouseEnter = useCallback(() => {
    onMouseEnter && onMouseEnter() 
    setIsHovered(true)
  }, [onMouseEnter, setIsHovered])

  const handleMouseLeave = useCallback(() => {
    onMouseLeave && onMouseLeave() 
    setIsHovered(false)
  }, [onMouseLeave, setIsHovered])

  return (
    <animated.div
      style={{
        scale: spring.scale,
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onDismiss}
      className='cursor-pointer bg-white relative w-96 mt-4 rounded-xl border border-primary-emphasis p-4 shadow-modal text-center'
    >
      {text}
    </animated.div>
  )
}
