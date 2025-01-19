import { animated, useSpring } from '@react-spring/web'
import { useIsMobile } from 'hooks/useIsMobile'
import React, { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import { useFloating } from '../context/FloatingContext'

const getShadow = (offset: number, angle: number) => {
  const shadowX = Math.round(Math.sin(angle * (Math.PI / 180)) * offset)
  const shadowY = Math.round(Math.cos(angle * (Math.PI / 180)) * offset)
  return `${shadowX}px ${shadowY}px 6px rgba(0, 0, 0, 0.25)`
}

export default function CardWhite(props: HTMLAttributes<HTMLDivElement>) {
  const angle = parseInt(props.style?.rotate || '')
  const divRef = useRef<HTMLDivElement>(null)

  const [springs, api] = useSpring(() => ({
    from: {
      boxShadow: getShadow(4, angle),
    },
    config: {
      mass: 1,
      friction: 50,
      tension: 200,
    },
  }))

  const [initialTranslateYSpring] = useSpring(() => ({
    from: { transform: 'translateY(600px)' },
    to: { transform: 'translateY(0px)' },
    config: {
      mass: 10,
      tension: 170,
      friction: 120,
    },
  }))

  const [translateYSpring, translateYApi] = useSpring(() => ({
    from: { transform: 'translateY(0px)' },
    config: {
      mass: 30,
      friction: 50,
      tension: 200,
    },
  }))

  const [isFloating, setFloating] = useState(false)

  const shadowFrom = useMemo(
    () => ({ boxShadow: getShadow(4, angle), transform: 'translateY(0px)' }),
    []
  )
  const shadowTo = useMemo(
    () => ({ boxShadow: getShadow(20, angle), transform: 'translateY(-20px)' }),
    []
  )

  const [position, setPosition] = useState({ left: 0, right: 0 })

  const { currentlyFloating, interval } = useFloating()

  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect()
      setPosition({ left: rect.left, right: rect.right })
    }
  }, [])

  useEffect(() => {
    if (!currentlyFloating || initialTranslateYSpring.transform.isAnimating) {
      return
    }

    if (currentlyFloating > position.left && currentlyFloating < position.right && !isFloating) {
      api.start({
        from: { boxShadow: shadowFrom.boxShadow },
        to: { boxShadow: shadowTo.boxShadow },
      })
      translateYApi.start({
        from: { transform: shadowFrom.transform },
        to: { transform: shadowTo.transform },
      })
      setFloating(true)
      setTimeout(() => {
        api.start({
          from: { boxShadow: springs.boxShadow },
          to: { boxShadow: shadowFrom.boxShadow },
        })
        translateYApi.start({
          from: { transform: translateYSpring.transform },
          to: { transform: shadowFrom.transform },
          config: {
            mass: 20,
            friction: 70,
            tension: 200,
          },
        })

        setFloating(false)
      }, interval / 2)
    }
  }, [currentlyFloating, interval, isFloating])

  const translateYStyles = initialTranslateYSpring.transform.isAnimating
    ? initialTranslateYSpring
    : translateYSpring

  const isMobile = useIsMobile()

  const scale = useMemo(() => {
    const initialScale = props.style?.scale || 1
    if (isMobile) {
      return String(Number(initialScale) / 2)
    }
    return initialScale
  }, [props.style?.scale, isMobile])

  return (
    <animated.div style={{ ...translateYStyles }}>
      <animated.div
        ref={divRef}
        className='card-secondary-background absolute rounded-lg border border-primary-emphasis bg-secondary-emphasis shadow-card'
        style={{
          height: 108,
          width: 67,
          backgroundColor: 'white',
          ...props.style,
          ...springs,
          scale,
          zIndex: 10,
        }}
      />
    </animated.div>
  )
}
