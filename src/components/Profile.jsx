import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {context} from './Context';
import { handleError } from '../utils';

const Profile = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

    const {logout} = useContext(context);
    const [userInfo,setUserInfo] = useState([])
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {
        const usermail = localStorage.getItem('loggedInUser');
        // console.log(usermail);
        

        const fetchUser = async ()=>{
            try {
                const response = await fetch(`${API_BASE_URL}/user/details`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ usermail })  // Ensure usermail is properly sent
                });

                const result = await response.json();
                if(response.ok){
                    // console.log(userInfo);
                    setUserInfo(result);
                    setLoading(false);
                    // console.log("result: ",result);
                }
            } catch (error) {
                handleError(error);
            }
        }

        fetchUser();
    }, [])
    

  return (
    <div className='bg-black text-white min-h-screen flex flex-col mx-auto items-center space-y-6 mt-24'>
        {/* <p className='p-4 text-red-300'>Profile not found!</p> */}
        <div className='flex flex-col mx-auto justify-center text-center space-y-4'>

        {
            loading? (
                <div className='flex justify-center m-20 text-green-300 '>
                    Loooooooding!..😴
                </div>
            ) : (
                <>
                    <img src="/profile-picture.png" className='flex mx-auto h-20 w-20' alt="" />
                    <p>{userInfo.name}</p>
                    <p>{userInfo.email}</p>
                    <p>{userInfo.mobile}</p>
                </>
            )
        }
        </div>

        <Link to={'/'} onClick={()=>setTimeout(3000,logout())} className='text-yellow-300 border-2 font-semibold p-2 rounded-lg hover:cursor-pointer mt-12'>Logout</Link>
    </div>
  )
}

export default Profile;