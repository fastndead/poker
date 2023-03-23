
type DivStyleType = React.HTMLAttributes<HTMLDivElement>['style']
type MappingsType = Record<number, Record<number, DivStyleType>>

const AMOUNT_OF_PLAYERS_TO_INDEX_TO_PLAYER_STYLE_MAP: MappingsType = {
  1: {
    0: {
      top: 'calc(50% - 240px)',
    }
  },
  2: {
    0: {
      top: 'calc(50% - 200px)',
      right: 'calc(50% - 350px)',
    },
    1: {
      top: 'calc(50% - 200px)',
      left: 'calc(50% - 350px)',
    }
  }
} as const

export function getPlayerStyle({ amountOfPlayers, index }: {
  amountOfPlayers: number,
  index: number
}): DivStyleType {
  return AMOUNT_OF_PLAYERS_TO_INDEX_TO_PLAYER_STYLE_MAP[amountOfPlayers][index]
}

const AMOUNT_OF_PLAYERS_TO_INDEX_TO_CARD_STYLE_MAP: MappingsType = {
  1: {
    0: {
      top: 'calc(50% - 160px)'
    }
  },
  2: {
    0: {
      top: 'calc(50% - 130px)',
      right: 'calc(50% - 250px)',
      rotate: '45deg'

    },
    1: {
      top: 'calc(50% - 130px)',
      left: 'calc(50% - 250px)',
      rotate: '-45deg'
    }
  }
} as const

export function getCardStyle({ amountOfPlayers, index }: {
  amountOfPlayers: number,
  index: number
}): DivStyleType {
  return AMOUNT_OF_PLAYERS_TO_INDEX_TO_CARD_STYLE_MAP[amountOfPlayers][index]
}
