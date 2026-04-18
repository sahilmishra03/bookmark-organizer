import React from 'react'
import { Macbook, Phone, IPad } from './Devices'
import { SyncLine } from './SyncLine'

const SyncDevices = () => {
  return (
    <div className='mt-60 flex flex-col gap-10 max-w-6xl mx-auto px-4 md:px-0'>
      <h1 className='text-3xl md:text-4xl font-bold tracking-tight self-center'>Sync Across Devices</h1>

      <div className='hidden md:block ml-30 w-[80%]'>
        <SyncLine />
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-30'>
        <div className="flex flex-col items-center gap-5">
          <Phone />
          <div className="flex flex-col items-center gap-2">
            <p className='font-semibold'>Save on the go</p>
            <p className='max-w-[60%] text-center text-neutral-500 text-sm'>Bookmark any link from your mobile browser in one tap.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <Macbook />
          <div className="flex flex-col items-center gap-2">
            <p className='font-semibold'>Your full library, always in sync</p>
            <p className='max-w-[60%] text-center text-neutral-500 text-sm'>Access, search, and organize every bookmark you've ever saved — right from your desktop.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <IPad />
          <div className="flex flex-col items-center gap-2">
            <p className='font-semibold'>Browse & organize</p>
            <p className='max-w-[60%] text-center text-neutral-500 text-sm'>Curate collections and explore your saved links with a bigger, clearer view.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SyncDevices
