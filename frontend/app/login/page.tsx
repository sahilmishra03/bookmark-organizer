import React from 'react'
import LoginHeader from '../../components/login/LoginHeader'
import SocialLogins from '../../components/login/SocialLogins'
import EmailLoginForm from '../../components/login/EmailLoginForm'

const page = () => {
    return (
        <div className='max-w-[1200px] min-h-[calc(100vh-50px)] mx-auto flex justify-center items-center'>
            <div className='h-120 w-fit flex flex-col justify-center items-center'>
                <LoginHeader />
                <SocialLogins />
                <EmailLoginForm />
            </div>
        </div>
    )
}

export default page