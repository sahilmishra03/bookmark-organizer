"use client"

import Image from "next/image"

export const Macbook = () => {
    return (
        <div className='h-50 w-80 perspective-distant group flex flex-col justify-center'>
            <div className='h-[92%] w-[94%] self-center  dark:bg-[#101010] flex items-center justify-center rounded-t-xl border-t-3 border-x-3 border-b-2 border-neutral-300 dark:border-neutral-700 -rotate-x-60 group-hover:rotate-x-0 origin-bottom transition-all ease-[cubic-bezier(0.85, 0, 0.15, 1)] duration-600'>
                <Image
                    className="opacity-0 group-hover:opacity-100 object-fit transition-all duration-600 ease-[cubic-bezier(0.85, 0, 0.15, 1)] h-full w-full object-contain"
                    height={1000}
                    width={10000}
                    src="https://assets.aceternity.com/agenforce-demo-1.jpg"
                    alt=""
                />
            </div>
            <div className='h-[8%] relative bg-neutral-200 dark:bg-[#111] rounded-b-2xl rounded-t-sm border-x-2 border-b-2 border-neutral-300 dark:border-neutral-700'>
                <div className='h-[60%] w-18 mx-auto bg-neutral-300 dark:bg-neutral-800 shadow-[0px_1px_0_0px_#e5e5e5,inset_0_2px_4px_rgba(0,0,0,0.2)] dark:shadow-[0px_1px_0_0px_#0000,inset_0_2px_4px_rgba(0,0,0,0.5)] rounded-b-4xl'></div>
            </div>
        </div>
    )
}

export const Phone = () => {
    return (
        <div className="relative w-[100px] h-[200px] rounded-[1.4rem] border-[3px] border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shadow-xl group shrink-0">
            <div className="absolute top-8 -left-[4px] w-px h-3 bg-neutral-400 dark:bg-neutral-600 rounded-l-md"></div>
            <div className="absolute top-[53px] -left-[4px] w-px h-5 bg-neutral-400 dark:bg-neutral-600 rounded-l-md"></div>
            <div className="absolute top-20 -left-[4px] w-px h-5 bg-neutral-400 dark:bg-neutral-600 rounded-l-md"></div>
            <div className="absolute top-16 -right-[4px] w-px h-7 bg-neutral-400 dark:bg-neutral-600 rounded-r-md"></div>
            <div className="w-full h-full rounded-[1.1rem] overflow-hidden bg-white dark:bg-[#101010]">
                <Image
                    className="opacity-0 group-hover:opacity-100 object-cover transition-opacity duration-500 h-full w-full"
                    height={1000}
                    width={500}
                    src="https://assets.aceternity.com/agenforce-demo-1.jpg"
                    alt="App view"
                />
            </div>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-neutral-500 rounded-full z-10 pointer-events-none"></div>
        </div>
    )
}

export const IPad = () => {
    return (
        <div className="relative w-[240px] h-[175px] rounded-[1.4rem] border-[3px] border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shadow-xl group shrink-0">
            <div className="absolute top-[50px] -right-[4px] w-px h-10 bg-neutral-400 dark:bg-neutral-600 rounded-r-md"></div>
            <div className="absolute -top-[4px] left-20 h-px w-6 bg-neutral-400 dark:bg-neutral-600 rounded-t-md"></div>
            <div className="absolute -top-[4px] left-28 h-px w-6 bg-neutral-400 dark:bg-neutral-600 rounded-t-md"></div>
            <div className="w-full h-full rounded-[1.1rem] overflow-hidden bg-white dark:bg-[#101010]">
                <Image
                    className="opacity-0 group-hover:opacity-100 object-cover transition-opacity duration-500 h-full w-full"
                    height={750}
                    width={1000}
                    src="https://assets.aceternity.com/agenforce-demo-1.jpg"
                    alt="iPad view"
                />
            </div>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-neutral-500 rounded-full z-10 pointer-events-none"></div>
        </div>
    )
}
