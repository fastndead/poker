import useWindowDimensions from 'hooks/useWindowDimentions'
import React, { useMemo } from 'react'
import { FloatingProvider } from '../context/FloatingContext'
import CardWhite from './CardWhite'

export default function CardsDecorations() {
  const { width } = useWindowDimensions()

  const isMobile = useMemo(() => width < 1145, [width])

  return (
    <FloatingProvider>
      <div className='z-0'>
        <CardWhite
          style={{
            position: 'absolute',
            top: 50,
            left: 60,
            rotate: '115deg',
            scale: 4,
            zIndex: 0,
          }}
        />
        <CardWhite
          style={{
            position: 'absolute',
            top: 50,
            right: 60,
            rotate: '15deg',
            scale: 4,
            zIndex: 0,
          }}
        />
        <CardWhite
          style={{
            position: 'absolute',
            top: 980,
            left: 80,
            rotate: '-25deg',
            scale: 4,
            zIndex: 0,
          }}
        />
        <CardWhite
          style={{
            position: 'absolute',
            top: 950,
            left: 350,
            rotate: '-55deg',
            scale: 3.4,
            zIndex: 0,
          }}
        />
        <CardWhite
          style={{
            position: 'absolute',
            top: 950,
            right: 0,
            rotate: '55deg',
            scale: 4,
            zIndex: 0,
          }}
        />
        {!isMobile && (
          <>
            <CardWhite
              style={{
                position: 'absolute',
                top: 300,
                right: 90,
                rotate: '-40deg',
                scale: 3.5,
                zIndex: 0,
              }}
            />
            <CardWhite
              style={{
                position: 'absolute',
                top: 300,
                left: 60,
                rotate: '-10deg',
                scale: 3,
                zIndex: 0,
              }}
            />
            <CardWhite
              style={{
                position: 'absolute',
                top: 530,
                right: 300,
                rotate: '-20deg',
                scale: 1.5,
                zIndex: 0,
              }}
            />
            <CardWhite
              style={{
                position: 'absolute',
                top: 650,
                right: 150,
                rotate: '18deg',
                scale: 1.4,
                zIndex: 0,
              }}
            />
            <CardWhite
              style={{
                position: 'absolute',
                top: 400,
                left: 350,
                rotate: '100deg',
                scale: 1.2,
                zIndex: 0,
              }}
            />
            <CardWhite
              style={{
                position: 'absolute',
                bottom: 0,
                right: 650,
                rotate: '70deg',
                scale: 2,
                zIndex: 0,
              }}
            />
          </>
        )}
      </div>
    </FloatingProvider>
  )
}
