import { useSpring } from '@react-spring/web'
import { useEffect, useRef } from 'react'
import { Card } from '../../../types'
import { getUserCardStyle } from '../utils'

type Props = {
  userCard: Card | null,
  containerWidth?: number,
  containerHeight?: number
}

const USER_CARD_CONFIG = {
  mass: 1,
  tension: 210,
  friction: 20
}

export function useUserCardSpring({ userCard, containerHeight, containerWidth }: Props) {
  const firstAppearance = useRef(!userCard)

  const [userCardSpring, userCardSpringApi] = useSpring(() => {

    return {
      to: {
        opacity: 0,
        x: 0,
        y: 0
      },
      config: USER_CARD_CONFIG
    }

  }, [userCard, containerWidth, containerHeight])

  useEffect(() => {
    if (userCard && firstAppearance.current){
      firstAppearance.current = false
      userCardSpringApi.start(() => ({ ...getUserCardStyle({
        containerHeight,
        containerWidth,
      }),
      config: USER_CARD_CONFIG
      }))
    } else if (userCard && !firstAppearance.current) {

      const style = getUserCardStyle({
        containerHeight,
        containerWidth,
      }).to

      userCardSpringApi.start(() => ({
        from: { ...style },
        to: [
          {
            opacity: 0,
            x: 0,
            y: 600
          },
          {
            ...style,
          }
        ],
        config: USER_CARD_CONFIG
      }))
    }
  }, 
  [userCard, containerHeight, containerWidth])

  return userCardSpring
}
