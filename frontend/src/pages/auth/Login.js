import React, { useState } from 'react'
import axios from 'axios';

import Layouts from '../../components/Layouts'
import Wrapper from '../../components/Wrapper'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [auth, setAuth] = useAuth();


    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (e) => {
        // console.log(auth);
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', {
                email, password
            });

            if (res && res.data.success) {
                window.alert(res.data.message)
                // navigate('/login');
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                window.localStorage.setItem('auth', JSON.stringify(res.data), 'true');
                navigate(location.state || '/');
                console.log(`user is ${auth.user}`);
            }
            else {
                window.alert("wrong email or password entered");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div><Layouts>
            <div className='bg-slate-50 h-[85vh]'>
                <Wrapper className='flex justify-center items-start' >

                    <div className=' py-5 flex justify-center items-center flex-col bg-white w-[500px] shadow-lg rounded-lg'>
                        <h1 className='text-[32px] capitalize text-yellow-500'>login</h1>
                        <form className='flex flex-col gap-3 w-full py-2 px-5' onSubmit={handleSubmit}>

                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required className='text-[18px] text-gray-500 py-3  outline-none bg-transparent  border-b-2 px-2' />
                            <p className='text-blue-600 text-[14px] font-semibold underline cursor-pointer text-center' onClick={() => navigate('/forgot-password')}>Forgot Password ?</p>



                            <button type='submit' className='bg-yellow-500 text-[22px] text-white rounded-full py-2 hover:bg-yellow-500/[0.8] active:scale-95'>Login</button>
                        </form>
                    </div>
                </Wrapper>
            </div>
        </Layouts></div>
    )
}
export default Login