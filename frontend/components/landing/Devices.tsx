"use client"

import Image from "next/image"
import React from "react"

export const Macbook = () => {
    return (
        // Replaced invalid h-50, w-80, and perspective-distant with precise arbitrary values
        <div className='h-[200px] w-[320px] [perspective:1000px] group flex flex-col justify-center items-center shrink-0'>
            
            {/* Screen Lid */}
            <div className='h-[92%] w-[94%] dark:bg-[#101010] flex items-center justify-center rounded-t-xl border-t-[3px] border-x-[3px] border-b-2 border-neutral-300 dark:border-neutral-700 [transform:rotateX(-60deg)] group-hover:[transform:rotateX(0deg)] origin-bottom transition-all ease-[cubic-bezier(0.85,0,0.15,1)] duration-[600ms] overflow-hidden'>
                <Image
                    // Removed invalid 'object-fit', kept 'object-cover'
                    className="opacity-0 group-hover:opacity-100 object-cover transition-opacity duration-[600ms] ease-[cubic-bezier(0.85,0,0.15,1)] h-full w-full"
                    height={1000}
                    width={1000}
                    src="/dashboard.png"
                    alt="Macbook view"
                />
            </div>

            {/* Base */}
            <div className='h-[8%] w-full relative bg-neutral-200 dark:bg-[#111] rounded-b-xl rounded-t-sm border-x-2 border-b-2 border-neutral-300 dark:border-neutral-700 z-10'>
                {/* Trackpad - Replaced invalid w-18 and rounded-b-4xl */}
                <div className='h-[60%] w-[72px] mx-auto bg-neutral-300 dark:bg-neutral-800 shadow-[0px_1px_0_0px_#e5e5e5,inset_0_2px_4px_rgba(0,0,0,0.2)] dark:shadow-[0px_1px_0_0px_#0000,inset_0_2px_4px_rgba(0,0,0,0.5)] rounded-b-2xl'></div>
            </div>
        </div>
    )
}

export const Phone = () => {
    return (
        <div className="relative w-[100px] h-[200px] rounded-[1.4rem] border-[3px] border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shadow-xl group shrink-0">
            {/* Hardware Buttons - Adjusted widths to standard arbitrary pixels so they don't break */}
            <div className="absolute top-8 -left-[4px] w-[3px] h-3 bg-neutral-400 dark:bg-neutral-600 rounded-l-md"></div>
            <div className="absolute top-[53px] -left-[4px] w-[3px] h-5 bg-neutral-400 dark:bg-neutral-600 rounded-l-md"></div>
            <div className="absolute top-20 -left-[4px] w-[3px] h-5 bg-neutral-400 dark:bg-neutral-600 rounded-l-md"></div>
            <div className="absolute top-16 -right-[4px] w-[3px] h-7 bg-neutral-400 dark:bg-neutral-600 rounded-r-md"></div>
            
            {/* Screen */}
            <div className="w-full h-full rounded-[1.1rem] overflow-hidden bg-white dark:bg-[#101010]">
                <Image
                    className="opacity-0 group-hover:opacity-100 object-cover transition-opacity duration-500 h-full w-full"
                    height={500}
                    width={250}
                    src="/dashboard-phone.png"
                    alt="Phone App view"
                />
            </div>
            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-neutral-500 rounded-full z-10 pointer-events-none"></div>
        </div>
    )
}

export const IPad = () => {
    return (
        <div className="relative w-[240px] h-[175px] rounded-[1.4rem] border-[3px] border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shadow-xl group shrink-0">
            {/* Hardware buttons */}
            <div className="absolute top-[50px] -right-[4px] w-[3px] h-10 bg-neutral-400 dark:bg-neutral-600 rounded-r-md"></div>
            <div className="absolute -top-[4px] left-20 h-[3px] w-6 bg-neutral-400 dark:bg-neutral-600 rounded-t-md"></div>
            <div className="absolute -top-[4px] left-28 h-[3px] w-6 bg-neutral-400 dark:bg-neutral-600 rounded-t-md"></div>
            
            {/* Screen */}
            <div className="w-full h-full rounded-[1.1rem] overflow-hidden bg-white dark:bg-[#101010]">
                <Image
                    className="opacity-0 group-hover:opacity-100 object-cover transition-opacity duration-500 h-full w-full"
                    height={750}
                    width={1000}
                    src="/dashboard-copy.png"
                    alt="iPad view"
                />
            </div>
            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-neutral-500 rounded-full z-10 pointer-events-none"></div>
        </div>
    )
}