import React from 'react'
import { IconBrandGithub } from '@tabler/icons-react'

const SocialLogins = () => {
    return (
        <div className='mt-5 flex gap-4'>
            <div className='text-md flex gap-2 cursor-pointer items-center bg-white border-2 border-neutral-200 py-3 px-10 rounded-md transition-all hover:bg-neutral-50 shadow-[0_0_2px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-neutral-800 dark:border-neutral-600 dark:text-shadow-2xs dark:text-shadow-neutral-700 dark:shadow-[0_0_2px_gray,inset_0_2px_4px_rgba(0,0,0,0.8)] dark:hover:bg-neutral-700'>
                <img src="/google.png" alt="" className='size-5' />
                Login With Google
            </div>
            <div className='text-md flex gap-2 cursor-pointer items-center bg-white border-2 border-neutral-200 py-3 px-11 rounded-md transition-all hover:bg-neutral-50 shadow-[0_0_2px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-neutral-800 dark:border-neutral-600 dark:text-shadow-2xs dark:text-shadow-neutral-700 dark:shadow-[0_0_2px_gray,inset_0_2px_4px_rgba(0,0,0,0.8)] dark:hover:bg-neutral-700'>
                <IconBrandGithub />
                Login With Github
            </div>
        </div>
    )
}

export default SocialLogins
