import React from 'react'
import { Home } from 'pages/home/Home'
import { NotFound } from 'pages/404'
import { Room } from 'pages/room'
import NotificationContextProvider from 'contexts/NotificationContextProvider'
import SocketIoErrorCatcher from 'components/SocketIoErrorCatcher'
import { useTransition, a, config } from '@react-spring/web'
import { useLocation, Routes, Route } from 'react-router-dom'

const PAGE_TRANSITION_DURATION = 500

function App() {
  const location = useLocation()
  const transitions = useTransition(location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1, top: 0, position: 'absolute' },
    leave: { opacity: 0 },
    config: {
      ...config.gentle,
      duration: PAGE_TRANSITION_DURATION,
    },
    trail: PAGE_TRANSITION_DURATION,
  })

  return (
    <NotificationContextProvider>
      <SocketIoErrorCatcher>
        {transitions((styles, location) => (
          <div className='base-background max-w-screen border-box -z-50 min-h-screen w-full bg-repeat'>
            <a.div
              className=' max-w-screen border-box relative min-h-screen w-full'
              style={styles}
            >
              <Routes location={location}>
                <Route
                  path='/'
                  element={<Home />}
                />
                <Route
                  path='/room/:roomName'
                  element={<Room />}
                />
                <Route
                  path='*'
                  element={<NotFound />}
                />
              </Routes>
            </a.div>
          </div>
        ))}
      </SocketIoErrorCatcher>
    </NotificationContextProvider>
  )
}

export default App
