import IconButton from 'components/IconButton'
import React from 'react'
import { ReactComponent as HomeIcon } from 'assets/home.svg'
import { ReactComponent as HomeHoverIcon } from 'assets/homeHover.svg'
import { ReactComponent as LinkIcon } from 'assets/copyLink.svg'
import { ReactComponent as LinkHoverIcon } from 'assets/copyLinkHover.svg'
import { ReactComponent as SettingsIcon } from 'assets/settings.svg'
import { ReactComponent as SettingsHoverIcon } from 'assets/settingsHover.svg'

export default function Sidebar() {
  return (
    <div
      className='h-screen w-20 inset-0 bg-primary-idle overflow-hidden'
    >
      <div
        className='mt-20 w-full flex flex-col items-center'
      >
        <IconButton
          icon={<HomeIcon/>}
          hoverIcon={<HomeHoverIcon/>}
          label='home'
        />
        <IconButton
          icon={<SettingsIcon/>}
          hoverIcon={<SettingsHoverIcon/>}
          className='mt-3.5'
          label='settings'
        />
        <IconButton
          icon={<LinkIcon/>}
          hoverIcon={<LinkHoverIcon/>}
          className='mt-3.5'
          label='copy link'
        />
      </div>
    </div>
  )
}
