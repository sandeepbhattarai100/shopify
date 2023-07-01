import React from 'react'

import Layouts from '../../components/Layouts';
import AdminMenu from '../../components/AdminMenu';

const AdminDashboard = () => {

    return (
        <Layouts>
            <div className=' w-[100vw] flex justify-around'>
                <div className='flex-[0.2] h-full shadow-lg'>
                    <AdminMenu />

                </div>
                <div className='flex-[0.8] px-3 h-auto'>right</div>
            </div>



        </Layouts>
    )
}

export default AdminDashboard