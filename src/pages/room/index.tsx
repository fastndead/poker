import Sidebar from '../../components/Sidebar'
import React, { useCallback, useEffect, useState } from 'react'
import { DEFAULT_CARD_SYSTEM } from './constants'
import PlayingCardsInput from './features/PlayingCardsInput.tsx'
import PlayingDesk from './features/PlayingDesk'
import Button from '../../components/Button'
import { Card, Player } from './types'
import { socket } from '../../sockets/socket'
import { useParams } from 'react-router-dom'

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
function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export function Room() {
  const { roomName } = useParams<{roomName: string}>()
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    socket.emit('join', { roomName })
    socket.on('initial_state', ({ players }: {players: Player[]}) => {
      setPlayers([...players] )
    })

    socket.on('new_player', ({ player }: {player: Player}) => {
      setPlayers((prev) => [...prev, player])
    })

    socket.on('player_disconnect', ({ playerId }: {playerId: string}) => {
      setPlayers((prev) => [...prev].filter((player)=> player.id !== playerId))
    })

    socket.on('player_voted', ({ value, playerId }: {value: string, playerId: string}) => {
      setPlayers((prev) => {
        debugger
        return [...prev].map((player)=> player.id === playerId ? { ...player, card: { ...player.card, value } } : player)
      })
    })
  }, [])

  const [userCard, setUserCard] = useState<Card | null>(null)

  const handleUserCardChange = useCallback((card: Card) => {
    socket.emit('vote', { voteValue: card.value })
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
              id: String(id),
              card: {
                value: String(Math.floor(Math.random() * 10)),
                isRevealed: false,
              },
              name: Number(id) % 2 === 0 ? 'Настёна' : 'Ксюша',
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
