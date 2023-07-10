import React, { useState } from 'react'
import Wrapper from '../Wrapper'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'




import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../../context/cart'




const Header = () => {
  const [cartItem] = useCart();
  const [showDash, setShowDash] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      user: null,
      token: ''
    })
    navigate('/');

  }

  return (
    <div className='w-full h-[80px] bg-white flex items-center justify-between z-10 sticky top-0  border-b shadow-sm mb-2'>
      <Wrapper className='flex justify-between items-center'>
        <Link to='/'>  <div className='text-[28px] font-semibold text-yellow-500 cursor-pointer hover:scale-105'><span>Shopify<span className='text-green-500'>...</span></span></div></Link>
        <div className='flex gap-5 relative '>
          <span className='text-gray-500 hover:text-yellow-black hover:scale-105 cursor-pointer '>Home</span>
          {!auth.user ? (<><Link to='/login'><span className='text-gray-500 hover:text-yellow-black hover:scale-105 cursor-pointer'>Login</span></Link>
            <Link to='/register'><span className='text-gray-500 hover:text-yellow-black hover:scale-105 cursor-pointer'>Register</span></Link>
          </>) :
            (<>
              <li className='list-none cursor-pointer text-gray-500 '
                onMouseOver={() => setShowDash(true)}
                onMouseLeave={() => setShowDash(false)}

              >
                {auth?.user?.name}
                {showDash && (
                  <ul className='bg-white  absolute h-auto w-[200px] flex justify-start start flex-col gap-2 py-2  px-3 top-[25px] right-[20px] rounded-sm shadow-md '>
                    <li className='text-gray-500 hover:text-yellow-black hover:scale-105 cursor-pointer hover:bg-gray-50 py-2 hover:text-gray-500 ' onClick={() => navigate(`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`)} >Dashboard</li>
                    <li className='text-gray-500 hover:text-yellow-black hover:scale-105 cursor-pointer hover:bg-gray-50 py-2 hover:text-gray-500' onClick={handleLogout}>logout</li>
                  </ul>
                )}
              </li>
            </>
            )
          }
          <NavLink to='/dashboard/user/cart'> <span className=' cursor-pointer'><span className='relative'><AddShoppingCartIcon />
            <span className='absolute -top-2 left-3 text-xs bg-red-500 text-white rounded-full h-[18px] w-auto  px-[4px]'>{cartItem.length}</span>
          </span></span></NavLink>

        </div>
      </Wrapper >

    </div >
  )
}

export default Header