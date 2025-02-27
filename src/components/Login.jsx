import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { context } from './Context';

const Login = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;


    const {setLoggedIn,setUser} = useContext(context);
    const [userInfo,setUserInfo] = useState({});
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [button,setButton] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setButton(false);

        if (!email || !password) {
            handleError('Email and password should not be empty');
            setButton(true);
            return;
        }

        try {
            const url = `${API_BASE_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            const { success, message, jwtToken, name,mobile, error } = result;
            
            // setLoading(false);
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', email);
                
                setLoggedIn(true);
                setUserInfo({"name":name, "email":email,"mobile":mobile });
                setUser(userInfo);

                setTimeout(() => {
                    navigate("/home");
                }, 1000);
                
            } else if (error) {
                const details = error?.details[0]?.message || 'An error occurred';
                handleError(details);
                setButton(true);
            } else {
                handleError(message);
                setButton(true)
            }
        } catch (error) {
            setButton(true);
            handleError('An unexpected error occurred');
        }

    }

    useEffect(() => {
      console.log(userInfo);
      
    }, [userInfo])
    

  return (
    <>
        <div className='min-h-screen w-full bg-black flex justify-center text-center px-6 '>
            <form onSubmit={handleSubmit} className=' m-auto mt-20 border-2 border-gray-500 rounded-lg text-gray-300 md:p-10 p-8  items-center space-y-8 '>
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