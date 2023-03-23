import React from 'react'

type Props = {
  name: string
  style?: React.HTMLAttributes<HTMLDivElement>['style']
}

export default function PlayerName({ name, style }: Props) {
  return (
    <div
      className='absolute rounded-full bg-light-grey py-4 px-8 flex items-center justify-center'
      style={style || {}}
    >
      <span >
        {name}
      </span>
    </div>
  )
}
