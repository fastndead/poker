import React, { ReactNode, useCallback, useEffect } from 'react'
import CloseModalSvg from 'assets/closeModal.svg'
import { animated, useSpring, useTransition } from '@react-spring/web'
import classNames from 'classnames'

type Props = {
  isVisible: boolean
  children: ReactNode
  title?: string
  className?: string
  onClose?(): void
}

export default function Modal({ className, isVisible, children, title, onClose }: Props) {
  const overlayTransition = useTransition(isVisible ? true : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const modalTransition = useTransition(isVisible, {
    from: { opacity: 0, y: -30 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0 },
    config: {
      tension: 310,
      friction: 20,
      mass: 2,
    },
  })

  return overlayTransition((modalOverlaySpring) => (
    <animated.div
      style={{
        ...modalOverlaySpring,
      }}
      className={classNames(
        'fixed top-0 left-0 w-screen h-screen flex justify-center items-center'
      )}
    >
      {modalTransition((springs) => (
        <animated.div
          className={classNames('absolute bg-white z-50 rounded-3xl p-6 shadow-modal', className)}
          style={{
            ...springs,
          }}
        >
          <div className='w-full h-11 flex justify-between'>
            <h3 className='font-normal text-2xl'>{title || ''}</h3>
            {onClose && <CloseModalSvg onClick={onClose} className='cursor-pointer' />}
          </div>
          {children}
        </animated.div>
      ))}

      <animated.div className='fixed top-0 left-0 opacity-70 w-screen h-screen bg-modal-grey z-40 ' />
    </animated.div>
  ))
}
