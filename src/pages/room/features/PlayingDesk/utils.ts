import { UseSpringProps } from '@react-spring/web'
import { Player } from '.'
import { AMOUNT_OF_PLAYERS_TO_INDEX_TO_PLAYER_STYLE_MAP, AMOUNT_OF_PLAYERS_TO_INDEX_TO_CARD_STYLE_MAP, CARD_PLACEMENTS } from './constants'


const DEFAULT_INIT_STYLE = {
  opacity: 0,
  x: 0,
  y: 0,
  rotate: 0
}

const renderedPlayerLabels: Record<string, boolean> = {}
const renderedPlayerCards: Record<string, boolean> = {}

export function recalculateFromStateForPlayer (players: Player[]) {
  const amountOfPlayers = players.length

  if (amountOfPlayers < Object.keys(renderedPlayerLabels).length) {
    Object.keys(renderedPlayerLabels).forEach((playerId) => {
      if (!players.find(({ id })=> String(id) === playerId)) {
        delete renderedPlayerLabels[playerId]
      }
    })
  }

  if (amountOfPlayers < Object.keys(renderedPlayerCards).length) {
    Object.keys(renderedPlayerCards).forEach((playerId) => {
      if (!players.find(({ id })=> String(id) === playerId)) {
        delete renderedPlayerCards[playerId]
      }
    })
  }
}

function getFrom(id: number, existingIds: Record<string, boolean>) {
  if (existingIds[id]) {
    return {}
  }

  existingIds[String(id)] = true
  return { ...DEFAULT_INIT_STYLE }
}

export function getPlayerStyle({
  containerHeight,
  containerWidth,
  index,
  players,
}: {
  containerWidth: number | undefined,
  containerHeight: number | undefined,
  index: number
  players: Player[]
}): UseSpringProps {
  const amountOfPlayers = players.length
  const id = players[index].id


  if (!containerWidth || !containerHeight){
    return {
      opacity: 0,
      x: 0,
      y: 0
    }
  }

  return {
    from: getFrom(id, renderedPlayerLabels),
    to: {
      opacity: 1,
      ...AMOUNT_OF_PLAYERS_TO_INDEX_TO_PLAYER_STYLE_MAP[amountOfPlayers][index](containerHeight, containerWidth)
    }
  }
}


export function getCardStyle({
  containerHeight,
  containerWidth,
  index,
  players
}: {
  containerWidth: number | undefined,
  containerHeight: number | undefined,
  index: number
  players: Player[]
}): UseSpringProps {
  const amountOfPlayers = players.length
  const id = players[index].id

  if (!containerWidth || !containerHeight){
    return  { ...DEFAULT_INIT_STYLE }
  }

  return {
    from: getFrom(id, renderedPlayerCards),
    to: {
      opacity: 1,
      ...AMOUNT_OF_PLAYERS_TO_INDEX_TO_CARD_STYLE_MAP[amountOfPlayers][index](containerHeight, containerWidth),
    }
  }
}

export function getUserCardStyle({
  containerHeight,
  containerWidth,
}: {
  containerHeight: number | undefined,
  containerWidth: number | undefined,
  }){

  if (!containerWidth || !containerHeight){
    return  { ...DEFAULT_INIT_STYLE }
  }

  return {
    from: {
      opacity: 0,
      x: 0,
      y: 0
    },
    to: {
      opacity: 1,
      ...CARD_PLACEMENTS.BOTTOM_MIDDLE(containerHeight, containerWidth)
    }
  }
}
