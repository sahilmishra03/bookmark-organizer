"use client"
import { useState } from 'react'

const EmailLoginForm = () => {
     const [email,setEmail] = useState("")
     
    return (
        <>
            <span className='w-full border-1 border-dashed dark:border-neutral-800 mt-3'></span>
            <div className="flex flex-col w-full jutify-center items-center">
                <div className='border-2 p-[2px] rounded-xl mt-3'>
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        className='bg-neutral-100 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-800 dark:placeholder:text-neutral-200 dark:bg-neutral-800 h-12 w-84 md:w-128 pl-2 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700'
                        placeholder='Enter your email'
                    />
                </div>
                <button
                onClick={()=>console.log(email)}
                    className='h-10 w-85  md:w-130 bg-[#111] text-neutral-200 dark:text-neutral-800 dark:bg-white hover:bg-[#111]/90 dark:hover:bg-neutral-300 cursor-pointer transition-colors duration-150 ease-in-out text-black leading-3 text-sm rounded-lg mt-2 font-medium'
                >
                    Continue with Email
                </button>
            </div>
        </>
    )
}

export default EmailLoginForm
