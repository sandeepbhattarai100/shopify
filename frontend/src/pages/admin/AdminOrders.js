import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../context/auth';

const AdminOrders = () => {
    const [orders, setOrders] = useState();
    const { auth } = useAuth();

    //get all orders
    const getAllOrders = async () => {

        try {
            const { data } = await axios.get('/api/v1/auth/all-orders');

            setOrders(data);
            console.log(orders);
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        getAllOrders();
    }, [auth?.token]);

    return (
        <Layouts>
            <div className=' w-[100vw] flex justify-around'>
                <div className='flex-[0.2] h-full shadow-lg'>
                    <AdminMenu />

                </div>
                <div className='flex-[0.8] px-3 h-auto'>
                    {/* {
                        orders.map((o,i) => {
                            console.log(o)
                        })
                    } */}


                </div>
            </div>

        </Layouts>
    )
}

export default AdminOrders