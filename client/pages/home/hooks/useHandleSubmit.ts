import { ReactEventHandler, useCallback } from 'react'
import { apiBaseUrl } from 'constants/constants'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from 'hooks/useNotifications'
import { useLocalStorage } from 'hooks/useLocalStorage'

type UseHandleSubmitProps = {
  name: string
  setValidationError(msg: string): void
}
export const useHandleSubmit = ({ name, setValidationError }: UseHandleSubmitProps) => {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const [, setNameLocalStorage] = useLocalStorage('userName', '')

  return useCallback<ReactEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault()
      if (!name) {
        setValidationError('Name cannot be empty')
        return
      }

      if (name.length > 13) {
        setValidationError('Name cannot be longer than 13 characters')
        return
      }
      try {
        const response = await fetch(`${apiBaseUrl}/mynameis`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }), // body data type must match "Content-Type" header
        })

        if (!response.ok) {
          throw new Error('Server error')
        }

        const roomId = (Math.random() + 1).toString(36).substring(2, 6).toUpperCase()
        setNameLocalStorage(name)
        navigate(`/room/${roomId}`)
      } catch {
        addNotification({
          type: 'error',
          text: 'Something is wrong on the server, refresh the page or try again later',
        })
      }
    },
    [addNotification, name, navigate, setNameLocalStorage, setValidationError]
  )
}
