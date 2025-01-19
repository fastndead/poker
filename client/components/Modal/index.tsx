import React, { ReactNode } from 'react'
import CloseModalSvg from 'assets/closeModal.svg'
import { animated, useTransition } from '@react-spring/web'
import classNames from 'classnames'

import styles from './Modal.module.css'
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
        'fixed left-0 top-0 flex h-screen w-screen items-center justify-center',
        styles.Modal
      )}
    >
      {modalTransition((springs) => (
        <animated.div
          className={classNames('absolute z-50 rounded-3xl bg-white p-6 shadow-modal', className)}
          style={{
            ...springs,
          }}
        >
          <div className='flex h-11 w-full justify-between'>
            <h3 className='text-2xl font-normal'>{title || ''}</h3>
            {onClose && (
              <CloseModalSvg
                onClick={onClose}
                className='cursor-pointer'
              />
            )}
          </div>
          {children}
        </animated.div>
      ))}

      <animated.div className='fixed left-0 top-0 z-40 h-screen w-screen bg-modal-grey opacity-70 ' />
    </animated.div>
  ))
}
