import Sidebar from '../../components/Sidebar'
import React, { useCallback, useState } from 'react'
import { DEFAULT_CARD_SYSTEM } from './constants'
import PlayingCardsInput from './features/PlayingCardsInput.tsx'
import PlayingDesk from './features/PlayingDesk'
import Button from '../../components/Button'
import { Card } from './types'

const testPlayers = [
  {
    id: 1,
    name: 'Liyanamahadug',
    card: {
      isRevealed: false,
      value: '3'
    }
  },
]

export function Room() {
  const [players, setPlayers] = useState(testPlayers)
  const [userCard, setUserCard] = useState<Card | null>(null)

  const handleUserCardChange = useCallback((card: Card) => {
    setUserCard(card)
  }, [setUserCard])

  return (
    <div
      className='width-screen flex flex-row overflow-hidden'
    >
      <div
        className='fixed z-50 bottom-0'
      >
        <Button
          type='secondary'
          label='Add player'
          className=' text-xs p-3'
          onClick={() => setPlayers((prev) => {
            const id = prev[prev.length - 1] ? prev[prev.length - 1]?.id + 1 : 0
            return prev.length < 7 ? [...prev, {
              id,
              card: {
                value: String(Math.floor(Math.random() * 10)),
                isRevealed: false,
              },
              name: id % 2 === 0 ? 'Настёна' : 'Ксюша',
            }] : prev})}
        />
        <Button
          type='secondary'
          label='remove player'
          className='mt-2 text-xs p-3'
          onClick={() => setPlayers((prev) => prev.slice(0, -1))}
        />
        <Button
          type='secondary'
          label='Reveal cards'
          className='mt-2 text-xs p-3'
          onClick={() => {
            setPlayers((prev) => prev.map((player) => ({
              ...player,
              card: {
                ...player.card,
                isRevealed: !player.card.isRevealed
              }
            })))
            setUserCard((card)=>{
              return { ...card, isRevealed: !card?.isRevealed }

            })
          }
          }
        />

      </div>
      <Sidebar />
      <div
        className='container h-screen flex flex-col items-center justify-between relative w-full m-auto'
      >
        <PlayingDesk
          players={players}
          userCard={userCard}
        />
        <PlayingCardsInput
          onChange={handleUserCardChange}
          cards={DEFAULT_CARD_SYSTEM}
        />
      </div>
    </div>
  )

}
