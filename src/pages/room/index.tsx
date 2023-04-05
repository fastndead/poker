import Sidebar from 'components/Sidebar'
import React, { useCallback, useEffect, useState } from 'react'
import { DEFAULT_CARD_SYSTEM } from './constants'
import PlayingCardsInput from './features/PlayingCardsInput.tsx'
import PlayingDesk from './features/PlayingDesk'
import { Player, PlayerSeialized } from './types'
import { socket } from 'sockets/socket'
import { useParams } from 'react-router-dom'
import EnterNameModal from 'components/EnterNameModal'
import { useLocalStorage } from 'hooks/useLocalStorage'

export function Room() {
  const { roomName } = useParams<{roomName: string}>()
  const [players, setPlayers] = useState<Player[]>([])
  const [isRevealed, setIsRevealed] = useState<boolean>(false)

  const [name, setName] = useLocalStorage<string | null>('userName', null)
  const [isNameModalVisible, setIsNameModalVisible] = useState(false)

  useEffect(() => {
    if (!name) {
      setIsNameModalVisible(true)
    } else {
      socket.emit('mynameis', { name })
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
    } 


    return () => {
      socket.emit('leave', { roomId: roomName })
    }
  }, [name, roomName, isNameModalVisible])

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
      <Sidebar />
      <div
        className='container h-screen flex flex-col items-center justify-between relative m-auto'
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
          userValue={userValue}
          cards={DEFAULT_CARD_SYSTEM}
        />
      </div>
      <EnterNameModal 
        isVisible={isNameModalVisible}
        onClose={(inputName: string) => {
          setIsNameModalVisible(false)
          setName(inputName)
        }}
      />
    </div>
  )

}
