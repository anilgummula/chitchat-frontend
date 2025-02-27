import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { context } from './Context';

const Register = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

    const {setUser,setLoggedIn}= useContext(context);
    const [userInfo,setUserInfo] = useState({});
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [password,setPassword] = useState("");

    const [button,setButton] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setButton(false);

        if(!name ||!email  || !mobile || !password){
            handleError("Fill the form properly bro!");
            setButton(true);
            return 
        }
        try {
            const url = `${API_BASE_URL}/auth/register`;
            const response = await fetch(url,{
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({name,email,mobile,password})
            });
            const result = await response.json();
            const {success ,message ,error,jwtToken } = result;
            if(success){
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', email);
                
                setLoggedIn(true);
                setUserInfo(
                    {
                        "name":name,
                        "email":email,
                        "mobile":mobile,
                    }
                )
                setUser(userInfo);
                
                handleSuccess(message);

                setTimeout(() => {
                    navigate("/home")
                }, 1000);
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
                setButton(true);
            }
            else if(!success){
                handleError(message);
                setButton(true);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
            setButton(true);
        }
          

    }

  return (
    <>
        <div className='min-h-screen w-full bg-black flex justify-center text-center px-6'>
            <form onSubmit={handleSubmit} className=' m-auto border-2 border-gray-400 rounded-lg text-gray-300 md:p-10 p-8 mt-12 md:mt-24  items-center space-y-8  '>
                <h1>Register now!</h1>
                <label htmlFor="name">Name</label>
                <input className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text"
                    required 
                    value={name}
                    onChange={(e)=> {setName(e.target.value)}} 
                />
                <br />
                <label htmlFor="name">Mobile</label>
                <input  className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text" 
                    required 
                    value={mobile}
                    onChange={(e)=> {setMobile(e.target.value)}}
                />
                <br />
                <label htmlFor="email">Email</label>
                <input className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text" 
                    required 
                    value={email}
                    onChange={(e)=> {setEmail(e.target.value)}}
                />   
                <br />
                <label htmlFor="name">Password</label>
                <input className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text" 
                    required 
                    value={password}
                    onChange={(e)=> {setPassword(e.target.value)}}
                />
                <br />

                <p>already have a account? <Link className='text-yellow-200'  to={'/'}>Login</Link> </p>

                <input className={`border bg-white/70 hover:bg-white/60 text-black font-semibold p-1 px-2 rounded-md ${!button ? 'opacity-50 cursor-not-allowed' : ''} flex  mx-auto `}
                    type="submit" 
                    value={button ? "Register" : "Please wait...."} 
                    // onClick={(e)=> setButton(false)} 
                    disabled={!button}  
                />   

            </form>
        </div>
    </>
  )
}

export default Register