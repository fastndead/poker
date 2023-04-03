import Button from 'components/Button'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import React, { ReactEventHandler, useCallback, useState } from 'react'
import { socket } from 'sockets/socket'

type Props = {
  isVisible: boolean
}

export default function EnterNameModal({ isVisible }: Props) {
  const [name, setName] = useState('')
  const handleChangeName = useCallback<ReactEventHandler<HTMLInputElement>>((e)=> {
    setName(e.currentTarget.value)
  },[])
  const handleSubmit = useCallback<ReactEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault()

    socket.emit('mynameis', { name })
  }, [])

  return (
    <Modal
      isVisible={isVisible}
      title='Please, introduce yourself'
    >
      <form
        onSubmit={handleSubmit}
      >
        <TextInput 
          placeholder='John Doe'
          onChange={handleChangeName}
          value={name}
        />
        <Button
          label='Submit'
          htmlType='submit'
        />
      </form>
    </Modal>
  )
}
