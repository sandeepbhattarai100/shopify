import React from 'react'

const Error = () => {
    return (
        <div className='bg-black/[0.8] h-[100vh] text-white flex flex-col justify-center items-center '>
            <h1 className='text-[120px] font-bold'>404</h1>
            <p className='text-[30px] -mt-3 font-semibold'>Not Found</p>
            <p className='capitalize text-[18px] font-medium'>the requested page could not be found on server</p>
        </div>
    )
}

export default Error