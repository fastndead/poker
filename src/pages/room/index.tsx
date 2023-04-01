import Sidebar from '../../components/Sidebar'
import React, { useCallback, useEffect, useState } from 'react'
import { DEFAULT_CARD_SYSTEM } from './constants'
import PlayingCardsInput from './features/PlayingCardsInput.tsx'
import PlayingDesk from './features/PlayingDesk'
import Button from '../../components/Button'
import { Player, PlayerSeialized } from './types'
import { socket } from '../../sockets/socket'
import { useParams } from 'react-router-dom'

const testPlayers = [
  {
    id: 1,
    name: 'Liyanamahadug',
    card: {
      value: 'M'
    }
  },
]

export function Room() {
  const { roomName } = useParams<{roomName: string}>()
  const [players, setPlayers] = useState<Player[]>([])
  const [isRevealed, setIsRevealed] = useState<boolean>(false)

  useEffect(() => {
    socket.emit('join', { roomName })
    socket.on('initial_state', ({ players }: {players: PlayerSeialized[]}) => {
      const deserializedPlayers = players.map((player) => ({
        name: player.name,
        id: player.id,
        value: player.value
      }))
      setPlayers([...deserializedPlayers] )
    })

    socket.on('new_player', ({ player }: {player: Player}) => {
      
      setPlayers((prev) => {
        return [...prev, player]})
    })

    socket.on('player_disconnect', ({ playerId }: {playerId: string}) => {
      setPlayers((prev) => [...prev].filter((player)=> player.id !== playerId))
      setIsRevealed(false)
    })

    socket.on('player_voted', ({ value, playerId }: {value: string, playerId: string}) => {
      setPlayers((prev) => {
        return [...prev].map((player)=> player.id === playerId ? { ...player, value } : player)
      })
    })

    socket.on('show_all', () => {
      setIsRevealed(true)
    })

    socket.on('reset', () => {
      setIsRevealed(false)
      setPlayers((prev) => {
        return [...prev].map((player) => ({ ...player, value: null }))
      })
      setUserValue(null)
    })

    return () => {
      socket.emit('leave', { roomId: roomName })
    }
  }, [roomName])

  const [userValue, setUserValue] = useState<Player['value']>(null)

  const handleUserCardChange = useCallback((value: Player['value']) => {
    socket.emit('vote', { voteValue: value })
    setUserValue(value)
  }, [setUserValue])

  const handleShowAll = useCallback(() => {
    socket.emit('show_all')
  }, [])

  const handleReset = useCallback(() => {
    socket.emit('reset')
  }, [])

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
              value: 'M',
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
            setIsRevealed((prev) => !prev)
          }
          }
        />

      </div>
      <Sidebar />
      <div
        className='container h-screen flex flex-col items-center justify-between relative w-full m-auto'
      >
        <PlayingDesk
          isRevealed={isRevealed}
          players={players}
          userValue={userValue}
          onShowAll={handleShowAll}
          onReset={handleReset}
        />
        <PlayingCardsInput
          onChange={handleUserCardChange}
          cards={DEFAULT_CARD_SYSTEM}
        />
      </div>
    </div>
  )

}
