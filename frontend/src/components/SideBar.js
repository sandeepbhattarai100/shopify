import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const SideBar = ({ setSideMenu, category, checked, setCehcked, handleFilter, range, setRange }) => {



    console.log(range);

    return (
        <div className='px-3 py-4 bg-gray-500/[0.1]  h-[90vh]'>
            <div className='w-full flex justify-between items-center'>
                <span className='font-semibold text-gray-600 text-[28px] '>Filter Products</span>
                <span className='cursor-pointer text-gray-600' onClick={() => setSideMenu(false)}><CloseIcon /></span>
            </div>
            <div className=' flex flex-col mt-5'>
                <button className='text-left bg-black/[0.3] w-16 font-semibold text-gray-700 flex items-center justify-center rounded-md px-2 cursor-pointer hover:bg-black duration-200  hover:text-white'
                    onClick={()=>window.location.reload()}
                >Clear</button>
                <div className='flex flex-col gap-5 mt-8'>
                    <p className='text-[24px] capitalize -mb-2'>price range</p>
                    <input type='range' min={100} max={10000} className='' value={range} onChange={(e) => setRange(e.target.value)} />
                    <div className='flex justify-between font-bold text-gray-600'>
                        <span>0</span>
                        <span>5000</span>
                        <span>10000</span>
                    </div>
                </div>
                <div className='mt-6'>
                    <h3 className='text-[24px] text-gray-700'>Categories</h3>
                    <div className='flex flex-col gap-4 ml-10 mt-3'>
                        {
                            category?.map((c) => (
                                <span className='flex gap-2 cursor-pointer'>
                                    <input type='checkbox' className=' w-[16px]' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} />
                                    <span className='capitalize text-[16px] font-semibold text-gray-600'>{c.name}</span>
                                </span>
                            ))
                        }
                    </div>
                </div>



            </div>
        </div>
    )
}

export default SideBar