import IconButton from 'components/IconButton'
import React, { useCallback } from 'react'
import { ReactComponent as HomeIcon } from 'assets/home.svg'
import { ReactComponent as HomeHoverIcon } from 'assets/homeHover.svg'
import { ReactComponent as LinkIcon } from 'assets/copyLink.svg'
import { ReactComponent as LinkHoverIcon } from 'assets/copyLinkHover.svg'
import { ReactComponent as SettingsIcon } from 'assets/settings.svg'
import { ReactComponent as SettingsHoverIcon } from 'assets/settingsHover.svg'
import { Link } from 'react-router-dom'
import { useNotifications } from 'hooks/useNotifications'

export default function Sidebar() {
  const { addNotification } = useNotifications()
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
    addNotification({ type: 'success', text: 'Link has been successfuly copied' })
  }, [addNotification])

  const areSettingsImplemented = false

  return (
    <div
      className='fixed top-0 left-0 z-50 h-screen w-20 inset-0 bg-primary-idle overflow-hidden'
    >
      <div
        className='mt-20 w-full flex flex-col items-center'
      >
        <Link
          to='/'
        >
          <IconButton
            icon={<HomeIcon/>}
            hoverIcon={<HomeHoverIcon/>}
            label='home'
          />
        </Link>
        {
          areSettingsImplemented && (
            <IconButton
              icon={<SettingsIcon/>}
              hoverIcon={<SettingsHoverIcon/>}
              className='mt-3.5'
              label='settings'
            />
          )
        }
        <IconButton
          icon={<LinkIcon/>}
          onClick={copyToClipboard}
          hoverIcon={<LinkHoverIcon/>}
          className='mt-3.5'
          label='copy link'
        />
      </div>
    </div>
  )
}
