"use client"

import React from 'react'
import { useTheme } from '@/components/layout/ThemeProvider'

const LoginHeader = () => {
    const { theme } = useTheme()

    return (
        <div className="flex flex-col items-center">
            <div className='text-2xl font-bold flex items-center text-neutral-900 dark:text-white'>
                <img
                    src={theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg"}
                    alt="logo"
                    width={40}
                    height={40}
                />
                Ghostmark
            </div>
            <h1 className='text-3xl font-bold text-neutral-900 dark:text-white'>Sign in to your account</h1>
        </div>
    )
}

export default LoginHeader
