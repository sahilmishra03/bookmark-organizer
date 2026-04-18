import React from 'react'

const EmailLoginForm = () => {
    return (
        <>
            <span className='w-full border-1 border-dashed dark:border-neutral-800 mt-3'></span>
            <div className="flex flex-col w-full">
                <input
                    type="text"
                    className='bg-neutral-800 h-12 w-128 pl-2 mt-4 rounded text-white focus:outline-none focus:ring-1 focus:ring-neutral-700'
                    placeholder='Enter your email'
                />
                <button
                    className='h-10 w-128 bg-white hover:bg-neutral-200 cursor-pointer transition-colors duration-150 ease-in-out text-black leading-3 text-sm rounded mt-2 font-medium'
                >
                    Continue with Email
                </button>
            </div>
        </>
    )
}

export default EmailLoginForm
