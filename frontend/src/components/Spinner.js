import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const Spinner = ({ path = 'login' }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((count) => count - 1);
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        });
        return () => clearInterval(interval);
    }, [count, navigate, location]);
    return (
        <div className='flex justify-center items-center h-[100vh] flex-col font-bold text-[32px] capitalize '>
            <p>Loading...</p>

            {`you will be redirected in ${count} second`}
        </div>
    )
}

export default Spinner