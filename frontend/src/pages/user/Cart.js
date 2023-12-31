import React from 'react'
import Layouts from '../../components/Layouts'
import Wrapper from '../../components/Wrapper'
import CartItem from '../../components/CartItem'
import { useCart } from '../../context/cart'
import Empty from '../../utils/empty.jpg';
import { NavLink } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'




const Cart = () => {
    const [cartItem] = useCart();
    // const navigate = useNavigate();

    const totalPrice = () => {
        let total = 0;
        cartItem.map((item) => total = total + item.price)
        return total;
    }
    return (
        <Layouts>

            {cartItem.length > 0 ? (
                <Wrapper className='bg-slate-100 mb-10  '>
                    {/* <h1>Order Details</h1> */}
                    <div className=' flex flex-col gap-2 '>
                        {
                            cartItem.map((p) => (
                                <CartItem p={p} />
                            ))
                        }

                    </div>
                    <div className='flex flex-col md:justify-between my-5 items-center'>
                        <p className='text-[24px] capitalize text-gray-700'>total price</p>
                        <span className='text-lg text-green-700 font-semibold'>${totalPrice()}</span>
                        <NavLink to='/dashboard/user/checkout' ><button className='p-2 bg-orange-500 rounded-lg font-semibold text-white ' > Proceed To CheckOut</button>
                        </NavLink>

                    </div>
                </Wrapper>
            ) : (
                <div className='flex justify-center items-center h-auto flex-col'>
                    <img src={Empty} alt='empty-cart' className='w-[40%]' />
                    <h3 className='text-[32px] capitalize text-gray-500 my-7'>the cart is empty ...</h3>

                </div>
            )}


        </Layouts>
    )
}

export default Cart