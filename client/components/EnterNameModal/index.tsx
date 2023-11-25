import Button from 'components/Button'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import { apiBaseUrl } from 'constants/constants'
import { useNotifications } from 'hooks/useNotifications'
import React, { ReactEventHandler, useCallback, useState } from 'react'

type Props = {
  isVisible: boolean
  onClose(name: string): void
}

export default function EnterNameModal({ isVisible, onClose }: Props) {
  const [name, setName] = useState<string>('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const { addNotification } = useNotifications()

  const handleChangeName = useCallback<ReactEventHandler<HTMLInputElement>>((e) => {
    setName(e.currentTarget.value)
  }, [])

  const handleSubmit = useCallback<ReactEventHandler<HTMLFormElement>>(
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

        onClose(name)
      } catch {
        addNotification({
          type: 'error',
          text: 'Something is wrong on the server, refresh the page or try again later',
        })
      }
    },
    [name, onClose, addNotification]
  )

  return (
    <Modal
      isVisible={isVisible}
      title={'What\'s your name?'}
    >
      <form
        onSubmit={handleSubmit}
        className='pt-6 space-y-6'
      >
        <TextInput
          placeholder='John Doe'
          onChange={handleChangeName}
          value={name}
          validationError={validationError}
        />
        <Button
          label='Submit'
          htmlType='submit'
          type='primary'
        />
      </form>
    </Modal>
  )
}
