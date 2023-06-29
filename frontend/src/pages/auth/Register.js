import React, { useState } from 'react'
import axios from 'axios';

import Layouts from '../../components/Layouts'
import Wrapper from '../../components/Wrapper'
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', {
                name, email, password, phone, address, answer
            });
            if (res && res.data.success) {
                toast.success("this is nice");
                navigate('/login');

            }
            else {
                toast.error('toast is not working');
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div><Layouts>
            <div className='bg-slate-50 h-auto'>
                <Wrapper className='flex justify-center items-start' >
                    <toast
                        position="bottom-right"
                        reverseOrder={false}
                    />
                    <div className=' py-5 flex justify-center items-center flex-col bg-white w-[500px]'>
                        <h1 className='text-[32px] capitalize text-yellow-500'>register</h1>
                        <form className='flex flex-col gap-3 w-full py-2 px-5' onSubmit={handleSubmit}>
                            <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' placeholder='Phone' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
                            <input value={address} onChange={(e) => setAddress(e.target.value)} type='text' placeholder='Address' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
                            <p className='text-lg -mb-3 text-gray-500'>which is the country you recently visited ?</p>
                            <input value={answer} onChange={(e) => setAnswer(e.target.value)} type='text' placeholder='Answer' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
                            <button type='submit' className='bg-yellow-500 text-[22px] text-white rounded-full py-2 hover:bg-yellow-500/[0.8] active:scale-95'>Register</button>
                        </form>
                    </div>
                </Wrapper>
            </div>
        </Layouts></div>
    )
}
export default Register