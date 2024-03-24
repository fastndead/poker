import React from 'react'
import { Home } from 'pages/home/Home'
import { NotFound } from 'pages/404'
import { Room } from 'pages/room'
import NotificationContextProvider from 'contexts/NotificationContextProvider'
import SocketIoErrorCatcher from 'components/SocketIoErrorCatcher'
import { useTransition, a, config } from '@react-spring/web'
import { useLocation, Routes, Route } from 'react-router-dom'

function App() {
  const location = useLocation()
  const transitions = useTransition(location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1, top: 0 },
    leave: { opacity: 0 },
    config: {
      ...config.gentle,
      duration: 400,
    },
    trail: 400,
  })

  return (
    <NotificationContextProvider>
      <SocketIoErrorCatcher>
        {transitions((styles, location) => (
          <a.div
            className='max-w-screen min-h-screen'
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
        ))}
      </SocketIoErrorCatcher>
    </NotificationContextProvider>
  )
}

export default App
