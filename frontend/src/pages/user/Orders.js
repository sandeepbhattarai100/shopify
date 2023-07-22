import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'

import Wrapper from '../../components/Wrapper'

import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();


    //get orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/order');

            setOrders(data);
            console.log(data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <Layouts>
            {/* <wrapper>san</wrapper>
             */}
            <Wrapper>

                {orders.map((o, i) => (
                    <>
                        <table className='md:w-full w-[200px] '>

                            <tr>
                                <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse'>#</th>
                                <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse '>status</th>
                                <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse'>Product Id</th>
                                <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse '>date</th>
                                <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse'>payment</th>
                                {/* <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse'>Quantity</th> */}


                            </tr>

                            <tbody>

                                <tr>
                                    <td className='p-3 border '>{i + 1}</td>
                                    <td className='p-3 border '>{o?.status}</td>
                                    <td className='p-3 border '>{o?.products[i]._id}</td>
                                    <td className='p-3 border '>{moment(o?.createdAt).fromNow()}</td>
                                    <td className='p-3 border '>{o?.payment?.success ? "success" : "Not Success"}</td>
                                    {/* <td className='p-3 border '>{o?.products?.length}</td> */}



                                </tr>
                            </tbody>


                        </table>

                    </>
                ))}

            </Wrapper>
        </Layouts >
    )
}

export default Orders