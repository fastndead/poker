import { useSpring } from '@react-spring/web'
import { Player } from 'pages/room/types'
import { useEffect, useRef } from 'react'
import { getUserCardStyle } from '../utils'

type Props = {
  userCard: Player['value'],
  containerWidth?: number,
  containerHeight?: number
  isRevealed: boolean
}

const USER_CARD_CONFIG = {
  mass: 1,
  tension: 210,
  friction: 20
}

export function useUserCardSpring({ userCard, isRevealed, containerHeight, containerWidth }: Props) {
  const firstAppearance = useRef(!userCard)

  const [userCardSpring, userCardSpringApi] = useSpring(() => {
    const style = getUserCardStyle({
      containerHeight,
      containerWidth,
    })

    if (isRevealed) {
      return
    }

    if (userCard && firstAppearance.current){
      firstAppearance.current = false
      return { 
        ...style,
        config: USER_CARD_CONFIG
      }
    } 

    if (userCard && !firstAppearance.current) {
      return {
        from: { ...style.to },
        to: [
          {
            opacity: 0,
            x: 0,
            y: 0
          },
          {
            ...style.to,
          }
        ],
        config: USER_CARD_CONFIG
      }
    }

    return {
      to: {
        opacity: 0,
        x: 0,
        y: 0
      },
      config: USER_CARD_CONFIG
    }

  }, [userCard, containerWidth, containerHeight, isRevealed])

  return userCardSpring
}
