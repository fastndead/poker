import { SpringValue, SpringValues, UseSpringProps } from '@react-spring/web'

type MappingsType = Record<number, Record<number, (containerHeight: number, containerWidth: number) => UseSpringProps>>


const DEFAULT_INIT_STYLE = {
  opacity: 0,
  x: 0,
  y: 0,
  rotate: 0
}

const existingIndices: Record<string, boolean> = {}
function getFrom(id: number, type: string) {
  if (existingIndices[`${id}_${type}`]) {
    return {}
  }

  existingIndices[`${id}_${type}`] = true
  return { ...DEFAULT_INIT_STYLE }
}

const AMOUNT_OF_PLAYERS_TO_INDEX_TO_PLAYER_STYLE_MAP: MappingsType = {
  1: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 136),
        x: 0,
      }
    }
  },
  2: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 42),
        x: -(containerWidth / 2 + 110),
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 42),
        x: containerWidth / 2 + 110,
      }
    } },
  3: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 136),
        x: 0,
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: 0,
        x: containerWidth / 2 + 178,
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: 0,
        x: -(containerWidth / 2 + 178),
      }
    }
  }
} as const

export function getPlayerStyle({ 
  containerHeight,
  containerWidth,
  amountOfPlayers,
  index,
  id,
}: {
  containerWidth: number | undefined,
  containerHeight: number | undefined,
  amountOfPlayers: number,
  index: number
  id: number
}): UseSpringProps {

  if(!containerWidth || !containerHeight){
    return {
      opacity: 0,
      x: 0,
      y: 0
    }
  }

  return {
    from: getFrom(id, 'player'),
    to: {
      opacity: 1,
      ...AMOUNT_OF_PLAYERS_TO_INDEX_TO_PLAYER_STYLE_MAP[amountOfPlayers][index](containerHeight, containerWidth)
    }
  }
}

const AMOUNT_OF_PLAYERS_TO_INDEX_TO_CARD_STYLE_MAP: MappingsType = {
  1: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 40),
        x: 0,
        rotate: 0,
      }
    }
  },
  2: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 0),
        x: -(containerWidth / 2 + 16),
        rotate: -45
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 0),
        x: (containerWidth / 2 + 16),
        rotate: 45
      }
    },
  },
  3: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 40),
        x: 0,
        rotate: 0,
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: 0,
        x: (containerWidth / 2 + 69),
        rotate: 90
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: 0,
        x: -(containerWidth / 2 + 69),
        rotate: -90 
      }
    },
  }
} as const

export function getCardStyle({
  containerHeight,
  containerWidth,
  amountOfPlayers,
  index,
  id,
}: {
  containerWidth: number | undefined,
  containerHeight: number | undefined,
  amountOfPlayers: number,
  index: number
  id: number
}): UseSpringProps {
  if(!containerWidth || !containerHeight){
    return  { ...DEFAULT_INIT_STYLE }
  }

  return {
    from: getFrom(id, 'card'),
    to: {
      opacity: 1,
      ...AMOUNT_OF_PLAYERS_TO_INDEX_TO_CARD_STYLE_MAP[amountOfPlayers][index](containerHeight, containerWidth),
    }
  }
}
