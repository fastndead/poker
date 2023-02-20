import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Home } from 'pages/home'
import { NotFound } from 'pages/404'
import { Room } from 'pages/room'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/room/:roomId',
    element: <Room />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
])

function App()  {
  return (
    <RouterProvider router={router} />
  )
}

export default App