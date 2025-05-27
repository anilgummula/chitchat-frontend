import React, { useContext, useEffect, useState } from 'react'
import {context} from './Context';
import { handleError } from '../utils';
import NetworkCard from './NetworkCard';
import NotificationsCard from './NotificationsCard';

const image= '/profile-picture';

const Notification = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    // const {user} = useContext(context);
    // const name = user.name;
    // const email = user.email;

    const [notifications ,setNotifications] = useState([]);
    const [loading,setLoading] = useState(true);
    const [search,setSearch] = useState("");
    const [filteredNotifications,setFilteredNotifications] = useState([])



    useEffect(() => {
        const fetchNotifications = async ()=>{
            try {
                const myid = localStorage.getItem('loggedInUserId');
                console.log("myid123 :   ",myid);
                
                const response = await fetch(`${API_BASE_URL}/user/notifications`,{
                    method:"POST",
                    headers : {
                        'Content-Type': 'application/json',
                        authorization : localStorage.getItem("token")
                    },
                    
                    body: JSON.stringify({ id : myid })
                })

                const {data} = await response.json();
                if(response.ok){
                    // const initial = data.filter((i)=>
                    //     i.email!=localStorage.getItem('loggedInUser')
                    // )
                    setNotifications(data);
                    setLoading(false);
                    setFilteredNotifications(data);

                    // handleSuccess("chats loaded...");
                    // console.log("networks:  ",data);
                }
                else{
                    handleError("failed to load networks");
                }
            } catch (error) {
                handleError(error.message);
            }
        }

        fetchNotifications();
    }, [])

    // const filteredNetworks = networks;

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
        console.log(localStorage.getItem('loggedInUser'));
        

        const filtered = notifications.filter((notifications)=>
            notifications.name.toLowerCase().includes(query) 

        );

        setFilteredNotifications(filtered);

    }

    


    return (
        <div className='bg-black text-white min-h-screen mt-12 p-4 '>  
            <h2 className=" flex justify-center text-center mx-auto mt-4 mb-6 font-bold text-xl">Requests</h2>  
            <div className='flex justify-center pb-8 '>
                <input 
                    className='border rounded-md text-white md:w-[340px] w-[240px] h-[30px] px-2 focus:outline-none p-4' 
                    placeholder='Enter the name to find...' 
                    type="text" 
                    value={search}
                    onChange={handleSearch}
                />
            </div>


            <div className=''>
            {
                loading? (
                    <div className='flex flex-col mx-auto justify-center items-center p-4 '>
                        <p className='text-yellow-200'> 
                        It's Loading bro..! 👀
                        </p>
                    </div>

                ) : (
                    <div className="flex flex-col gap-4">
                    {filteredNotifications.length > 0  ? 
                        (
                            filteredNotifications.map((notification) => (
                            <NotificationsCard
                                userid={notification.rid}
                                key={notification._id}
                                name={notification.name}
                                email={notification.email}
                                mobile={notification.mobile}
                                image={image}
                                // onClick={() => navigate(`/product/${product._id}`)}
                            />
                            ))
                        ) : ( <p className="text-center text-sky-300">No Notifications...😞</p> )
                    }
                    </div>
                ) 
            }
            </div>
        </div>
    )
}

export default Notification;