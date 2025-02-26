import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    const [userInfo,setUserInfo] = useState({});
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [mobile,setMobile] = useState(null);
    const [password,setPassword] = useState(null);

    const [button,setButton] = useState(true);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(userInfo){
            setUserInfo(
                {
                    "name":name,
                    "email":email,
                    "mobile":mobile,
                    "password":password
                }
            )
        }
    }

  return (
    <>
        <div className='min-h-screen w-full bg-black flex justify-center text-center'>
            <form action={(e)=>{handleSubmit(e)}} className=' m-auto border-2 border-gray-400 rounded-lg text-gray-300 p-10  items-center space-y-8  '>
                <h1>Register now!</h1>
                <label htmlFor="name">Name</label>
                <input className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text"
                    required 
                    onChange={(e)=> {setName(e.target.value)}} 
                />
                <br />
                <label htmlFor="name">Mobile</label>
                <input  className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text" 
                    required 
                    onChange={(e)=> {setMobile(e.target.value)}}
                />
                <br />
                <label htmlFor="email">Email</label>
                <input className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text" 
                    required 
                    onChange={(e)=> {setEmail(e.target.value)}}
                />   
                <br />
                <label htmlFor="name">Password</label>
                <input className='border mx-4 rounded-md h-[32px] px-2 text-slate-400 outline-none border-none bg-white/10'
                    type="text" 
                    required 
                    onChange={(e)=> {setPassword(e.target.value)}}
                />
                <br />

                <p>already have a account? <Link className='text-yellow-200'  to={'/'}>Login</Link> </p>

                <input className={`border bg-white/70 hover:bg-white/60 text-black font-semibold p-1 px-2 rounded-md ${!button ? 'opacity-50 cursor-not-allowed' : ''} flex  mx-auto `}
                    type="submit" 
                    value={button ? "Register" : "Please wait...."} 
                    onClick={(e)=> setButton(false)} 
                    disabled={!button}  
                />   

            </form>
        </div>
    </>
  )
}

export default Register