import React from 'react'
import Layouts from '../../components/Layouts'
import { useState } from 'react'
import Wrapper from '../../components/Wrapper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/forgot-password', {
        email, answer, newPassword
      });
      if (res && res.data.success) {
        window.alert(res.data.message);
        toast.success(res.data.message);
        navigate('/login');
      }
      else {
        window.alert(res.data.message);
      }


    } catch (error) {
      console.log(error);
      window.alert(error);

    }


  };

  return (
    <Layouts>
      <div className='bg-slate-50 h-[85vh]'>
        <Wrapper className='flex justify-center items-start' >

          <div className=' py-5 flex justify-center items-center flex-col bg-white w-[500px]'>
            <h1 className='text-[32px] capitalize text-yellow-500'>forgot password</h1>
            <form className='flex flex-col gap-3 w-full py-2 px-5' onSubmit={handleSubmit}>

              <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
              <input value={answer} onChange={(e) => setAnswer(e.target.value)} type='text' placeholder='Answer' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
              <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type='password' placeholder='New Password' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />




              <button type='submit' className='bg-yellow-500 text-[22px] text-white rounded-full py-2 hover:bg-yellow-500/[0.8] active:scale-95'>Change Password</button>
            </form>
          </div>
        </Wrapper>
      </div>
    </Layouts>
  )
}

export default ForgotPassword