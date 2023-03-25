import { SpringValue, SpringValues, UseSpringProps } from '@react-spring/web'

type MappingsType = Record<number, Record<number, (containerHeight: number, containerWidth: number) => UseSpringProps>>

const PLAYER_LABEL_HEIGHT = 56
const CARD_HEIGHT = 80 

export const AMOUNT_OF_PLAYERS_TO_INDEX_TO_PLAYER_STYLE_MAP: MappingsType = {
  1: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 116),
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
        y: -(containerHeight / 2 + 116),
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
        x: -(containerWidth / 2 + 173),
      }
    }
  },
  4: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 42),
        x: -(containerWidth / 2 + 110),
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + 70 + PLAYER_LABEL_HEIGHT),
        x: -(containerWidth / 2 + 110),
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 42),
        x: (containerWidth / 2 + 110),
      }
    },
    3: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + 70 + PLAYER_LABEL_HEIGHT),
        x: (containerWidth / 2 + 110),
      }
    }
  },
  5: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 10),
        x: -(containerWidth / 2 + 130),
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + 40 + PLAYER_LABEL_HEIGHT),
        x: -(containerWidth / 2 + 140),
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 10),
        x: (containerWidth / 2 + 130),
      }
    },
    3: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + 40 + PLAYER_LABEL_HEIGHT),
        x: (containerWidth / 2 + 140),
      }
    },
    4: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 116),
        x: 0,
      }
    }
  },
  6: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: 40,
        x: -(containerWidth / 2 + 160),
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + 70 + PLAYER_LABEL_HEIGHT),
        x: -(containerWidth / 2 + 110),
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: 40,
        x: (containerWidth / 2 + 160),
      }
    },
    3: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + 70 + PLAYER_LABEL_HEIGHT),
        x: (containerWidth / 2 + 110),
      }
    },
    4: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 42),
        x: -(containerWidth / 2 + 110),
      }
    },
    5: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 42),
        x: (containerWidth / 2 + 110),
      }
    }
  },
  7: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: 40,
        x: -(containerWidth / 2 + 160),
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + 70 + PLAYER_LABEL_HEIGHT),
        x: -(containerWidth / 2 + 110),
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: 40,
        x: (containerWidth / 2 + 160),
      }
    },
    3: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + 70 + PLAYER_LABEL_HEIGHT),
        x: (containerWidth / 2 + 110),
      }
    },
    4: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 42),
        x: -(containerWidth / 2 + 110),
      }
    },
    5: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 42),
        x: (containerWidth / 2 + 110),
      }
    },
    6: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 116),
        x: 0,
      }
    }
  }
} as const

export const AMOUNT_OF_PLAYERS_TO_INDEX_TO_CARD_STYLE_MAP: MappingsType = {
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
  },
  4: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 - 20),
        x: -(containerWidth / 2 + 35),
        rotate: -45,
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 - 20),
        x: (containerWidth / 2 + 35),
        rotate: 45,
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + CARD_HEIGHT - 10),
        x: -(containerWidth / 2 + 25),
        rotate: 45,
      }
    },
    3: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + CARD_HEIGHT - 10),
        x: (containerWidth / 2 + 25),
        rotate: -45,
      }
    },
  },
  5: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 - 30),
        x: -(containerWidth / 2 + 35),
        rotate: -60,
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 - 30),
        x: (containerWidth / 2 + 35),
        rotate: 60,
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + CARD_HEIGHT - 20),
        x: -(containerWidth / 2 + 35),
        rotate: 60,
      }
    },
    3: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + CARD_HEIGHT - 20),
        x: (containerWidth / 2 + 35),
        rotate: -60,
      }
    },
    4: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 40),
        x: 0,
        rotate: 0,
      }
    }
  },
  6: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: 40,
        x: -(containerWidth / 2 + 50),
        rotate: -90,
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: 40,
        x: (containerWidth / 2 + 50),
        rotate: 90,
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + CARD_HEIGHT - 10),
        x: -(containerWidth / 2 + 25),
        rotate: 45,
      }
    },
    3: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + CARD_HEIGHT - 10),
        x: (containerWidth / 2 + 25),
        rotate: -45,
      }
    },
    4: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 - 20),
        x: -(containerWidth / 2 + 35),
        rotate: -45,
      }
    },
    5: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 - 20),
        x: (containerWidth / 2 + 35),
        rotate: 45,
      }
    }
  },
  7: {
    0: function(containerHeight: number, containerWidth: number){
      return {
        y: 40,
        x: -(containerWidth / 2 + 50),
        rotate: -90,
      }
    },
    1: function(containerHeight: number, containerWidth: number){
      return {
        y: 40,
        x: (containerWidth / 2 + 50),
        rotate: 90,
      }
    },
    2: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + CARD_HEIGHT - 10),
        x: -(containerWidth / 2 + 25),
        rotate: 45,
      }
    },
    3: function(containerHeight: number, containerWidth: number){
      return {
        y: (containerHeight / 2 + CARD_HEIGHT - 10),
        x: (containerWidth / 2 + 25),
        rotate: -45,
      }
    },
    4: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 - 20),
        x: -(containerWidth / 2 + 35),
        rotate: -45,
      }
    },
    5: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 - 20),
        x: (containerWidth / 2 + 35),
        rotate: 45,
      }
    },
    6: function(containerHeight: number, containerWidth: number){
      return {
        y: -(containerHeight / 2 + 40),
        x: 0,
        rotate: 0,
      }
    }
  }
} as const

