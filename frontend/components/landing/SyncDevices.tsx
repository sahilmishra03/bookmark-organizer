import React from 'react'
import { Macbook, Phone, IPad } from './Devices'
import { SyncLine } from './SyncLine'

const SyncDevices = () => {
  return (
    <div className='mt-60 flex flex-col gap-10 max-w-7xl mx-auto px-4 md:px-8 w-full'>
      <h1 className='text-3xl md:text-4xl font-bold tracking-tight self-center'>
        Sync Across Devices
      </h1>

      <div className='hidden md:block mx-auto w-[80%]'>
        <SyncLine />
      </div>

      {/* Reduced the extreme gap-30 to gap-8 and ensured the container spans full width */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-16 md:gap-8 w-full'>
        
        {/* Phone Column */}
        <div className="flex flex-col items-center gap-6 flex-1">
          {/* Added a fixed height container so all devices align perfectly regardless of their individual heights */}
          <div className="h-[220px] flex items-end justify-center">
            <Phone />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='font-semibold text-center'>Save on the go</p>
            {/* Removed max-w-[60%] and replaced it with px-4 for fluid wrapping */}
            <p className='text-center text-neutral-500 text-sm px-4 md:px-8'>
              Bookmark any link from your mobile browser in one tap.
            </p>
          </div>
        </div>

        {/* Macbook Column */}
        <div className="flex flex-col items-center gap-6 flex-1">
          <div className="h-[220px] flex items-end justify-center">
            <Macbook />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='font-semibold text-center'>Your full library, always in sync</p>
            <p className='text-center text-neutral-500 text-sm px-4 md:px-8'>
              Access, search, and organize every bookmark you've ever saved — right from your desktop.
            </p>
          </div>
        </div>

        {/* iPad Column */}
        <div className="flex flex-col items-center gap-6 flex-1">
          <div className="h-[220px] flex items-end justify-center">
            <IPad />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='font-semibold text-center'>Browse & organize</p>
            <p className='text-center text-neutral-500 text-sm px-4 md:px-8'>
              Curate collections and explore your saved links with a bigger, clearer view.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SyncDevices