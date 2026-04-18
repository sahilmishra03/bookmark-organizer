import React from 'react'

const LoginHeader = () => {
    return (
        <div className="flex flex-col items-center">
            <div className='text-2xl font-bold flex items-center'>
                <img
                    src="bookmark.png"
                    alt="logo"
                    width={40}
                    height={40}
                />
                Bookmark
            </div>
            <h1 className='text-3xl font-bold'>Sign in to your account</h1>
        </div>
    )
}

export default LoginHeader
