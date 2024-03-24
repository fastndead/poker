import { animated, useSpring } from '@react-spring/web'
import React, { HTMLAttributes } from 'react'

const getShadow = (offset: number, angle: number) => {
  const shadowX = Math.round(Math.sin(angle * (Math.PI / 180)) * offset)
  const shadowY = Math.round(Math.cos(angle * (Math.PI / 180)) * offset)
  return `${shadowX}px ${shadowY}px 2px rgba(0, 0, 0, 0.25)`
}

export default function CardWhite(props: HTMLAttributes<HTMLDivElement>) {
  const angle = parseInt(props.style?.rotate || '')
  const [springs, api] = useSpring(() => ({
    from: { boxShadow: getShadow(4, angle) },
  }))

  const handleMouseEnter = () => {
    api.start({
      from: { boxShadow: getShadow(4, angle) },
      to: { boxShadow: getShadow(10, angle) },
    })
  }

  const handleMouseLeave = () => {
    api.start({
      from: { boxShadow: getShadow(10, angle) },
      to: { boxShadow: getShadow(4, angle) },
    })
  }

  return (
    <animated.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='card-secondary-background absolute rounded-lg border border-primary-emphasis bg-secondary-emphasis shadow-card'
      style={{
        height: 108,
        width: 67,
        backgroundColor: 'white',
        ...props.style,
        ...springs,
      }}
    />
  )
}
