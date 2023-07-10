import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart';




const Product = ({ p }) => {
    const navigate = useNavigate();
    const [cartItem, setCartItem, handleAddToCart] = useCart();
    let date = new Date().toLocaleDateString();

    return (
        <div className='hover:scale-105 cursor-pointer flex flex-col gap-2 shadow-md ' key={p._id}>
            <img src={`/api/v1/product/get-product-photo/${p._id}`} alt='product-img' className='h-[250px] w-full  object-scale-down ' onClick={() => navigate(`/product/${p.slug}`)} />
            <h4 className='font-semibold text-[18px] capitalize text-black mx-1 '>{p.name}</h4>
            <div className='flex justify-between px-1'>
                <span className='flex items-center gap-2'><h4 className='text-[18px] font-semibold'>$ {p.price}</h4>
                    <h3 className=' text-gray-500 line-through text-sm '>$. 225</h3>
                </span>
                <span className='text-green-500 text-md'>20% off</span>

            </div>
            <button className=' mb-2 py-4 border bg-orange-500  text-white font-semibold rounded-full mx-2  active:scale-95 ' onClick={() => {
                setCartItem([...cartItem, p])
                localStorage.setItem('cart', JSON.stringify([...cartItem, p]))
            }}>Add to Cart</button>
        </div>
    )
}

export default Product