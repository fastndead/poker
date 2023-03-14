import Button from 'components/Button'
import TextInput from 'components/TextInput'
import React from 'react'
import CardsSpread from './features/CardsSpread'

export function Home() {
  return (
    <>
      <div
        className="container mx-auto min-h-screen"
      >
        <div
          className='w-80 m-auto space-y-3 min-h-full'
        >
          <CardsSpread />
          <TextInput
            placeholder='User name'
          />
          <Button
            label='Start a new game'
            type='primary'
          />
          <Button
            label='Join the room'
            type='secondary'
          />
        </div>
      </div>
    </>

  )
}
