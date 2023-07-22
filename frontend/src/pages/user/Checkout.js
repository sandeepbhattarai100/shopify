import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import Wrapper from '../../components/Wrapper'
import CartItem from '../../components/CartItem'
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/cart'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
    const [auth, setAuth] = useAuth();
    const [cartItem, setCartItem] = useCart();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState('');
    const navigate = useNavigate();

    const totalPrice = () => {
        let total = 0;
        cartItem.map((item) => total = total + item.price)
        return total;
    };
    //payment gateway Token
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken)

        } catch (error) {
            console.log(error);

        };
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);
    //handlePayment

    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product//braintree/payment', {
                nonce, cartItem
            });
            localStorage.removeItem('cart');
            setCartItem([]);
            navigate('/dashboard/user/orders');
            window.alert('payment success');

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Layouts>
            <div className='bg-slate-100 -mt-3 py-4 mr-2'>
                <Wrapper >
                    <div className=' my-3 md:flex shrink-0'>
                        {/* left */}
                        <div className='flex-[0.6] '>
                            <div className='bg-white my-2  mx-2 px-3 py-4 shadow-md rounded-md'>
                                <p className='capitalize'>deliver to {auth?.user?.name}</p>
                                <span className='flex gap-2 capitalize '>
                                    <span className='text-blue-400 bg-blue-50 px-2 rounded-md'>Home</span>
                                    {/* Mulpani,Gokarneshwor- kathmandu-outside ringroad,bagmati province
                                 */}
                                    {
                                        auth?.user?.address
                                    }
                                    <span className='text-blue-500'>change</span>
                                </span>
                                <div className='border my-1 text-sm px-4 py-3 mt-3 capitalize'>
                                    <p>bill to the same address</p>
                                    <p >Email to:  <span className='text-blue-400'>{auth?.user?.email}</span> </p>
                                </div>


                            </div>
                            <div className='bg-slate-200 mx-2 my-3'>
                                {
                                    cartItem.map((p) => (
                                        <CartItem p={p} key={p._id} />
                                    ))
                                }
                            </div>



                        </div>
                        {/* right */}
                        <div className='flex-[0.5] my-3 mx-2 text-[14px]   '>
                            <div className='bg-white rounded-md shadow-md px-4 py-5 w-full capitalize '>
                                <p className='mb-6'>discount and payment</p>
                                <span className='flex justify-between border-b-2 pb-6'><span>Shopify vouchers</span><span>no applicable vouchers</span></span>

                                {/* order detailes */}
                                <div className='mt-5  '>
                                    <p className='font-semibold'> Order Details</p>
                                    <div className='flex flex-col gap-1  mt-2 '>
                                        <div className='flex justify-between '>
                                            <span className='font-bold text-[14px] text-gray-600'>Item Total</span>
                                            <span className='text-[14px] text-gray-600 font-medium'>{cartItem.length}</span>
                                        </div>
                                        <div className='flex justify-between '>
                                            <span className='font-bold text-[14px] text-gray-600'> Total Price</span>
                                            <span className='text-[14px] text-gray-600 font-medium'>$ {totalPrice()}</span>
                                        </div>
                                        <div className='flex justify-between '>
                                            <span className='font-bold text-[14px] text-gray-600'>Delivery Price</span>
                                            <span className='text-[14px] text-gray-600 font-medium'>$ 0</span>
                                        </div>
                                        <div className='flex justify-between mb-4'>
                                            <span className='font-bold text-[14px] text-gray-600'> Total payment</span>
                                            <span className='text-[14px] text-gray-600 font-medium'>${totalPrice()}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    !clientToken || !cartItem?.length ? ('') : (
                                        <>
                                            <DropIn options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                },

                                            }}
                                                onInstance={instance => setInstance(instance)} />
                                            <button className='text-white mt-4 bg-orange-500 w-full px-3 py-4 rounded-lg text-[18px] font-semibold active:scale-95'
                                                onClick={handlePayment} disabled={!auth?.user?.address}
                                            >Place Order</button></>
                                    )
                                }

                            </div>

                        </div>

                    </div>
                </Wrapper>
            </div>
        </Layouts>
    )
}

export default Checkout