import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [userInfo,setUserInfo] = useState({});
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [button,setButton] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        setButton(false);

        if (!email || !password) {
            handleError('Email and password should not be empty');
            setButton(true);
            return;
        }

        setUserInfo({ "email":email,"password": password });
        handleSuccess('Logged In successfully');
        setTimeout(() => {
            navigate("/chat");
        }, 1000);

    }

    useEffect(() => {
      console.log(userInfo);
      
    }, [userInfo])
    

  return (
    <>
        <div className='min-h-screen w-full bg-black flex justify-center text-center px-6'>
            <form onSubmit={handleSubmit} className=' m-auto border-2 border-gray-500 rounded-lg text-gray-300 md:p-10 p-8  items-center space-y-8 '>
                <h1>Hi welcome back!</h1>
                <label htmlFor="email">Email</label>
                <input className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10 '
                    type="text" 
                    required 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)}
                 />   
                <br />
                <label htmlFor="name">Password</label>
                <input className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text" 
                    required value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <br />

                <p>Don't have an account? <Link className='text-yellow-200'  to={'/register'}>register</Link> </p>

                <input className={`border bg-white/70 hover:bg-white/60 text-black font-semibold p-1 px-2 rounded-md ${!button ? 'opacity-50 cursor-not-allowed' : ''} flex  mx-auto `}
                    type="submit" 
                    value={button ? "Login" : "Please wait...."}  
                    disabled={!button}  
                />   

            </form>
        </div>
    </>
  )
}

export default Login