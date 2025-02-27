import React, { useContext, useEffect, useState } from 'react'
import {context} from './Context';
import { handleError } from '../utils';
import NetworkCard from './NetworkCard';

const image= '/profile-picture';

const AddFriend = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    // const {user} = useContext(context);
    // const name = user.name;
    // const email = user.email;

    const [networks ,setNetworks] = useState([]);
    const [loading,setLoading] = useState(true);
    const [search,setSearch] = useState("");
    const [filteredNetworks,setFilteredNetworks] = useState([])



    useEffect(() => {
        const fetchNetworks = async ()=>{
            try {
                const response = await fetch(`${API_BASE_URL}/user/networks`,{
                    headers : {
                        authorization : localStorage.getItem("token"),
                    },
                })

                const data = await response.json();
                if(response.ok){
                    setNetworks(data);
                    setLoading(false);
                    setFilteredNetworks(data);

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

        fetchNetworks();
    }, [])

    // const filteredNetworks = networks;

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);

        const filtered = networks.filter((network)=>
            network.name.toLowerCase().includes(query)
        );

        setFilteredNetworks(filtered);

    }

    


    return (
        <div className='bg-black text-white min-h-screen mt-12 p-4 '>  
            <h2 className="text-teal-300 flex justify-center text-center mx-auto mt-4 mb-6 font-bold">Search & send request for connection...🤍</h2>  
            <div className='flex justify-center pb-8 '>
                <input 
                    className='border rounded-md text-white md:w-[340px] w-[240px] h-[30px] px-2 focus:outline-none' 
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
                        Loading ithundi wait cheyi bro..! 👀
                        </p>
                    </div>

                ) : (
                    <div className="flex flex-col gap-4">
                    {filteredNetworks.length > 0 ? 
                        (
                            filteredNetworks.map((network) => (
                            <NetworkCard
                                userid={network._id}
                                key={network._id}
                                name={network.name}
                                email={network.email}
                                mobile={network.mobile}
                                image={image}
                                // onClick={() => navigate(`/product/${product._id}`)}
                            />
                            ))
                        ) : ( <p className="text-center text-sky-300">Yevaru leru bro ah peeru tho...😞</p> )
                    }
                    </div>
                ) 
            }
            </div>
        </div>
    )
}

export default AddFriend;