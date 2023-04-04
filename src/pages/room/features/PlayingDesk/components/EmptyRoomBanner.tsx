import { animated, useSpring } from '@react-spring/web'
import React, { useEffect, useRef, useState } from 'react'

export default function EmptyRoomBanner() {
  const [ref, setRef] = useState<HTMLHeadingElement | null>()

  const [waitForOthersSpring] = useSpring(() => {
    return {
      from: {
        backgroundPositionX: 0
      },
      to: {
        backgroundPositionX: ref ? ref.offsetWidth * 2 : 1 
      },
      config: {
        duration: 1000
      },
      loop: true
    }}, [ref])

  return (
    <animated.h3
      ref={newRef => setRef(newRef)}
      className='relative w-auto text-center bg-200% bg-clip-text -top-40 font-semibold text-grey bg-gradient-to-r from-grey from:20% via-primary-emphasis via:100% to-grey to:80%'
      style={{
        WebkitTextFillColor: 'transparent',
        ...waitForOthersSpring
      }}
    >
              This room is empty
      <br/>
              Wait for others players to join
    </animated.h3>
  )
}
