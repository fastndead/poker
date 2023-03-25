import { SpringValue, SpringValues, UseSpringProps } from '@react-spring/web'

type MappingsType = Record<number, Record<number, (containerHeight: number, containerWidth: number) => UseSpringProps>>

const PLAYER_LABEL_HEIGHT = 56
const CARD_HEIGHT = 80 

const PLAYER_PLACEMENTS = {
  UP_MIDDLE: (containerHeight: number, containerWidth: number) => {
    return {
      y: -(containerHeight / 2 + 85),
      x: 0,
    }
  },
  LEFT_TOP: (containerHeight: number, containerWidth: number)=>{
    return {
      y: -(containerHeight / 2 + 43),
      x: -(containerWidth / 2 + 115),
    }
  },
  RIGHT_TOP: (containerHeight: number, containerWidth: number) => {
    return {
      y: -(containerHeight / 2 + 43),
      x: containerWidth / 2 + 110,
    }
  },
  LEFT_MIDDLE: (containerHeight: number, containerWidth: number) => {
    return {
      y: 40,
      x: -(containerWidth / 2 + 160),
    }
  },
  RIGHT_MIDDLE: (containerHeight: number, containerWidth: number) => {
    return {
      y: 40,
      x: (containerWidth / 2 + 155),
    }
  },
  LEFT_BOTTOM: (containerHeight: number, containerWidth: number)=>{
    return {
      y: (containerHeight / 2 + 70 + PLAYER_LABEL_HEIGHT),
      x: -(containerWidth / 2 + 115),
    }
  },
  RIGHT_BOTTOM: (containerHeight: number, containerWidth: number) => {
    return {
      y: (containerHeight / 2 + 70 + PLAYER_LABEL_HEIGHT),
      x: (containerWidth / 2 + 110),
    }
  },
  LEFT_TOP_30DEG: (containerHeight: number, containerWidth: number) => {
    return {
      y: -(containerHeight / 2 + 10),
      x: -(containerWidth / 2 + 130),
    }
  },
  LEFT_BOTTOM_30DEG: (containerHeight: number, containerWidth: number) => {
    return {
      y: (containerHeight / 2 + 40 + PLAYER_LABEL_HEIGHT),
      x: -(containerWidth / 2 + 140),
    }
  },
  RIGHT_TOP_30DEG: (containerHeight: number, containerWidth: number) => {
    return {
      y: -(containerHeight / 2 + 10),
      x: (containerWidth / 2 + 130),
    }
  },
  RIGHT_BOTTOM_30DEG: (containerHeight: number, containerWidth: number) => {
    return {
      y: (containerHeight / 2 + 40 + PLAYER_LABEL_HEIGHT),
      x: (containerWidth / 2 + 140),
    }
  }
}

export const AMOUNT_OF_PLAYERS_TO_INDEX_TO_PLAYER_STYLE_MAP: MappingsType = {
  1: {
    0: PLAYER_PLACEMENTS.UP_MIDDLE
  },
  2: {
    0: PLAYER_PLACEMENTS.LEFT_TOP,
    1: PLAYER_PLACEMENTS.RIGHT_TOP 
  },
  3: {
    0: PLAYER_PLACEMENTS.UP_MIDDLE,
    1: PLAYER_PLACEMENTS.RIGHT_MIDDLE,
    2: PLAYER_PLACEMENTS.LEFT_MIDDLE
  },
  4: {
    0: PLAYER_PLACEMENTS.LEFT_TOP,
    1: PLAYER_PLACEMENTS.RIGHT_TOP,
    2: PLAYER_PLACEMENTS.LEFT_BOTTOM,
    3: PLAYER_PLACEMENTS.RIGHT_BOTTOM, 
  },
  5: {
    0: PLAYER_PLACEMENTS.LEFT_TOP_30DEG,
    1: PLAYER_PLACEMENTS.RIGHT_TOP_30DEG,
    2: PLAYER_PLACEMENTS.LEFT_BOTTOM_30DEG,
    3: PLAYER_PLACEMENTS.RIGHT_BOTTOM_30DEG,
    4: PLAYER_PLACEMENTS.UP_MIDDLE,
  },
  6: {
    0: PLAYER_PLACEMENTS.LEFT_MIDDLE,
    1: PLAYER_PLACEMENTS.RIGHT_MIDDLE,
    2: PLAYER_PLACEMENTS.LEFT_BOTTOM,
    3: PLAYER_PLACEMENTS.RIGHT_BOTTOM,
    4: PLAYER_PLACEMENTS.LEFT_TOP,
    5: PLAYER_PLACEMENTS.RIGHT_TOP
  },
  7: {
    0: PLAYER_PLACEMENTS.LEFT_MIDDLE,
    1: PLAYER_PLACEMENTS.RIGHT_MIDDLE,
    2: PLAYER_PLACEMENTS.LEFT_BOTTOM,
    3: PLAYER_PLACEMENTS.RIGHT_BOTTOM,
    4: PLAYER_PLACEMENTS.LEFT_TOP,
    5: PLAYER_PLACEMENTS.RIGHT_TOP,
    6: PLAYER_PLACEMENTS.UP_MIDDLE,
  }
} as const

const CARD_PLACEMENTS = {
  UP_MIDDLE: (containerHeight: number, containerWidth: number) => {
    return {
      y: -(containerHeight / 2 + 10),
      x: 0,
      rotate: 0,
    }
  },
  LEFT_TOP: (containerHeight: number, containerWidth: number)=>{
    return {
      y: -(containerHeight / 2 - 20),
      x: -(containerWidth / 2 + 35),
      rotate: -45
    }
  },
  RIGHT_TOP: (containerHeight: number, containerWidth: number) => {
    return {
      y: -(containerHeight / 2 - 20),
      x: (containerWidth / 2 + 35),
      rotate: 45,
    }
  },
  LEFT_MIDDLE: (containerHeight: number, containerWidth: number) => {
    return {
      y: 40,
      x: -(containerWidth / 2 + 50),
      rotate: 90,
    }
  },
  RIGHT_MIDDLE: (containerHeight: number, containerWidth: number) => {
    return {
      y: 40,
      x: (containerWidth / 2 + 50),
      rotate: 90,
    }
  },
  LEFT_BOTTOM: (containerHeight: number, containerWidth: number)=>{
    return {
      y: (containerHeight / 2 + CARD_HEIGHT - 10),
      x: -(containerWidth / 2 + 25),
      rotate: 45,
    }
  },
  RIGHT_BOTTOM: (containerHeight: number, containerWidth: number) => {
    return {
      y: (containerHeight / 2 + CARD_HEIGHT - 10),
      x: (containerWidth / 2 + 25),
      rotate: -45,
    }
  },
  LEFT_TOP_30DEG: (containerHeight: number, containerWidth: number) => {
    return {
      y: -(containerHeight / 2 - 30),
      x: -(containerWidth / 2 + 35),
      rotate: -60,
    }
  },
  LEFT_BOTTOM_30DEG: (containerHeight: number, containerWidth: number) => {
    return {
      y: (containerHeight / 2 + CARD_HEIGHT - 20),
      x: -(containerWidth / 2 + 35),
      rotate: 60,
    }
  },
  RIGHT_TOP_30DEG: (containerHeight: number, containerWidth: number) => {
    return {
      y: -(containerHeight / 2 - 30),
      x: (containerWidth / 2 + 35),
      rotate: 60,
    }
  },
  RIGHT_BOTTOM_30DEG: (containerHeight: number, containerWidth: number) => {
    return {
      y: (containerHeight / 2 + CARD_HEIGHT - 20),
      x: (containerWidth / 2 + 35),
      rotate: -60,
    }
  }
}

export const AMOUNT_OF_PLAYERS_TO_INDEX_TO_CARD_STYLE_MAP: MappingsType = {
  1: {
    0: CARD_PLACEMENTS.UP_MIDDLE
  },
  2: {
    0: CARD_PLACEMENTS.LEFT_TOP,
    1: CARD_PLACEMENTS.RIGHT_TOP,
  },
  3: {
    0: CARD_PLACEMENTS.UP_MIDDLE,
    1: CARD_PLACEMENTS.RIGHT_MIDDLE,
    2: CARD_PLACEMENTS.LEFT_MIDDLE
  },
  4: {
    0: CARD_PLACEMENTS.LEFT_TOP,
    1: CARD_PLACEMENTS.RIGHT_TOP,
    2: CARD_PLACEMENTS.LEFT_BOTTOM,
    3: CARD_PLACEMENTS.RIGHT_BOTTOM
  },
  5: {
    0: CARD_PLACEMENTS.LEFT_TOP_30DEG,
    1: CARD_PLACEMENTS.RIGHT_TOP_30DEG,
    2: CARD_PLACEMENTS.LEFT_BOTTOM_30DEG,
    3: CARD_PLACEMENTS.RIGHT_BOTTOM_30DEG,
    4: CARD_PLACEMENTS.UP_MIDDLE,
  },
  6: {
    0: CARD_PLACEMENTS.LEFT_MIDDLE,
    1: CARD_PLACEMENTS.RIGHT_MIDDLE,
    2: CARD_PLACEMENTS.LEFT_BOTTOM,
    3: CARD_PLACEMENTS.RIGHT_BOTTOM,
    4: CARD_PLACEMENTS.LEFT_TOP,
    5: CARD_PLACEMENTS.RIGHT_TOP,
  },
  7: {
    0: CARD_PLACEMENTS.LEFT_MIDDLE,
    1: CARD_PLACEMENTS.RIGHT_MIDDLE,
    2: CARD_PLACEMENTS.LEFT_BOTTOM,
    3: CARD_PLACEMENTS.RIGHT_BOTTOM,
    4: CARD_PLACEMENTS.LEFT_TOP,
    5: CARD_PLACEMENTS.RIGHT_TOP,
    6: CARD_PLACEMENTS.UP_MIDDLE,
  }
} as const

