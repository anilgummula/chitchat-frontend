import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { context } from './Context';

const Home = () => {
    const {user} = useContext(context);
    const name = user.name;
    const email = user.email;

    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    const [Connections ,setConnections] = useState([]);

    useEffect(() => {
        const fetchConnections = async ()=>{
            try {
                const response = await fetch(`${API_BASE_URL}/user/connections`,{
                    headers : {
                        authorization : localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ email, name })
                })

                const data = response.json();
                if(response.ok){
                    setConnections(data);
                    // handleSuccess("chats loaded...");
                    console.log("connections: ",Connections);
                }
                else{
                    handleError("failed to fetch chats");
                }
            } catch (error) {
                handleError(error.message);
            }
        }

        fetchConnections();
    }, [])
    


  return (
    <div className='min-h-screen flex flex-col justify-center text-center pt-4 bg-black text-white'>
        <p className='flex mx-auto text-yellow-300'>No one to chat...🙄</p>
        <Link className='flex mx-auto text-emerald-300 border-b-1' to={'/add'} >Add up some friends bro!👈</Link>




    </div>
  )
}

export default Home;