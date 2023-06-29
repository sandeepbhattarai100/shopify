import React from 'react'
import { useAuth } from '../context/auth';
import { NavLink } from 'react-router-dom';
const AdminMenu = () => {
    const [auth] = useAuth();
    return (
        <>



            <h1 className='font-thin text-[22px] text-center  border-b-2 pb-2 uppercase '>Creative {auth?.user?.name}</h1>

            <ul className='mt-5 ' >
                <NavLink to='/dashboard/admin/create-product'> <li className='px-3 py-2 cursor-pointer hover:bg-slate-50 mt-1 capitalize hover:scale-105 font-sans border-b-2'>create product</li></NavLink>
                <NavLink to='/dashboard/admin/create-category'> <li className='px-3 py-2 cursor-pointer hover:bg-slate-50 mt-1 capitalize hover:scale-105 font-sans border-b-2'>create Category</li></NavLink>
                <NavLink to='/dashboard/admin/user'> <li className='px-3 py-2 cursor-pointer hover:bg-slate-50 mt-1 capitalize hover:scale-105 font-sans border-b-2'>users</li></NavLink>
                <NavLink to='/dashboard/admin/analytics'> <li className='px-3 py-2 cursor-pointer hover:bg-slate-50 mt-1 capitalize hover:scale-105 font-sans border-b-2'>analytics</li></NavLink>

            </ul>






        </>
    )
}

export default AdminMenu