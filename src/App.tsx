import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Home } from 'pages/home'
import { NotFound } from 'pages/404'
import { Room } from 'pages/room'
import NotificationContextProvider from 'contexts/NotificationContextProvider'
import SocketIoErrorCatcher from 'components/SocketIoErrorCatcher'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/room/:roomName',
    element: <Room />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
])

function App()  {
  return (
    <NotificationContextProvider>
      <SocketIoErrorCatcher>
        <div
          className='w-screen min-h-screen'
        >
          <RouterProvider
            router={router}
          />
        </div>
      </SocketIoErrorCatcher>

    </NotificationContextProvider>
  )
}

export default App
