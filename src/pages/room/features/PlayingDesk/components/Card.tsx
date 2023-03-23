import React from 'react'

type Props = {
  isRevealed?: boolean
  value?: string
  style?: React.HTMLAttributes<HTMLDivElement>['style']
}

function Card({ isRevealed, value, style }: Props) {
  return (
    <div
      className='absolute card'
      style={{
        ...style
      }}
    >
    </div>
  )
}

export default Card
