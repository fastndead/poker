import { animated, useSpring } from '@react-spring/web'
import React, { useState } from 'react'

export default function EmptyRoomBanner() {
  const [ref, setRef] = useState<HTMLHeadingElement | null>()

  const [waitForOthersSpring] = useSpring(() => {
    return {
      from: {
        backgroundPositionX: 0,
      },
      to: {
        backgroundPositionX: ref ? ref.offsetWidth * 2 : 1,
      },
      config: {
        duration: 1000,
      },
      loop: true,
    }
  }, [ref])

  return (
    <animated.h3
      ref={(newRef) => setRef(newRef)}
      className='from:20% via:100% to:80% relative -top-40 w-auto bg-gradient-to-r from-grey via-primary-emphasis to-grey bg-200% bg-clip-text text-center font-semibold text-grey'
      style={{
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        ...waitForOthersSpring,
      }}
    >
      This room is empty
      <br />
      Wait for others players to join
    </animated.h3>
  )
}
