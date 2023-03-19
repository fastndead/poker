import Sidebar from 'components/Sidebar'
import React from 'react'
import { DEFAULT_CARD_SYSTEM } from './constants'
import PlayingCardsInput from './features/PlayingCardsInput.tsx'

export function Room() {
  return (
    <div
      className='width-screen flex flex-row overflow-hidden'
    >
      <Sidebar />
      <div
        className='container h-screen flex items-center justify-center relative w-full m-auto'
      >
        <PlayingCardsInput
          cards={DEFAULT_CARD_SYSTEM}
        />
      </div>
    </div>
  )

}
