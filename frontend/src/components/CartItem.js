import React, { useEffect } from 'react'
import { useCart } from '../context/cart'

const CartItem = ({ p }) => {
    const [cartItem,
        setCartItem, handleRemoveFromCart] = useCart();




    return (
        <div className='w-full py-3 px-4 bg-white' key={p._id}>
            {/* top */}
            <div className=' border-b-2 pb-3'>
                <span>Order <span className='text-blue-400'>#{p._id}</span> </span>
                <div className='flex justify-between'>
                    <p className='text-sm text-gray-500'>placed on  10 dec 2023 </p>
                    <p className='text-blue-600 cursor-pointer active:scale-95' onClick={() => handleRemoveFromCart(p._id)} >Manage</p>

                </div>
            </div>
            {/* bottom */}
            <div className='flex justify-between mt-3 items-center '>
                <div className=' flex'>
                    <div className='h-[100px] w-[100px] bg-green-50  flex items-center overflow-hidden '>  <img src={`/api/v1/product/get-product-photo/${p._id}`} alt='product' className='w-full object-contain' /></div>
                    <p className='ml-2 text-[16px]'>{p.name}</p>

                </div>
                <p className='text-gray-400 bg-gray-50'>Qty: <span className='text-black'>1</span></p>
                <p className='bg-gray-100 capitalize px-4 rounded-full text-green-500'>$ {p.price}  </p>


            </div>

        </div>
    )
}

export default CartItem