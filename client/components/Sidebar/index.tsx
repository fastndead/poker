import IconButton from 'components/IconButton'
import React, { useCallback } from 'react'
import HomeIcon from 'assets/home.svg'
import HomeHoverIcon from 'assets/homeHover.svg'
import LinkIcon from 'assets/copyLink.svg'
import LinkHoverIcon from 'assets/copyLinkHover.svg'
import SettingsIcon from 'assets/settings.svg'
import SettingsHoverIcon from 'assets/settingsHover.svg'
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
    <div className='inset-0 left-0 top-0 z-50 h-screen w-20 overflow-hidden bg-primary-idle'>
      <div className='mt-20 flex w-full flex-col items-center'>
        <Link to='/'>
          <IconButton
            icon={<HomeIcon />}
            hoverIcon={<HomeHoverIcon />}
            label='home'
          />
        </Link>
        {areSettingsImplemented && (
          <IconButton
            icon={<SettingsIcon />}
            hoverIcon={<SettingsHoverIcon />}
            className='mt-3.5'
            label='settings'
          />
        )}
        <IconButton
          icon={<LinkIcon />}
          onClick={copyToClipboard}
          hoverIcon={<LinkHoverIcon />}
          className='mt-3.5'
          label='copy link'
        />
      </div>
    </div>
  )
}
