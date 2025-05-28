// import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom'
// import { handleError, handleSuccess } from '../utils';
// import { context } from './Context';
// import ConnectionsCard from './ConnectionsCard';

// const Home = () => {
    // const navigate = useNavigate();
//   const [connections, setConnections] = useState([]);
//   const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

//   const fetchConnections = async () => {
    //     try {
//       const response = await fetch(`${API_BASE_URL}/user/connections`,{
    //                     method:"POST",
    //                     headers : {
        //                         'Content-Type': 'application/json',
        //                         authorization : localStorage.getItem("token"),
        //                     },
        //                     body: JSON.stringify({ email:useremail })
        //         });
        
        //       if (response.ok) {
            //         const data = await response.json();
            //         setConnections(data);
            //       } else {
                //         console.error('Failed to fetch connections');
//       }
//     } catch (error) {
    //       console.error('Error fetching connections:', error.message);
//     }
//   };

//   useEffect(() => {
    //     fetchConnections();
    //   }, []);
    
    //   return (
        //     <div className="min-h-screen bg-black text-white p-4">
        //       <h2 className="text-2xl font-bold mb-6">Your Connections</h2>
        //       {connections.length === 0 ?  ( 
            //                 <>
            //                     <Link className='flex mx-auto text-emerald-300 border-b-1' to={'/add'} >Add up some friends bro!👈</Link> 
            //                     <p className='flex mx-auto'>No one to chat...🙄</p>
            //                 </>
            //         ) : (
                //         connections.map((connection) => (
                    //           <ConnectionsCard
                    //             key={connection._id}
                    //             userid={connection._id}
                    //             name={connection.name}
                    //             email={connection.email}
                    //             mobile={connection.mobile}
                    //             onClick={() => navigate(`/message/chat/${connection._id}`)}
                    //           />
                    //         ))
                    //       )}
                    //     </div>
                    //   );
                    // };
                    
                    // export default Home;
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { context } from './Context';
import ConnectionsCard from './ConnectionsCard';

const Home = () => {
        const navigate = useNavigate();
    // const {user} = useContext(context);
    // const name = user.name;
    // const email = user.email;
    const useremail = localStorage.getItem("loggedInUser");

    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    const [Connections ,setConnections] = useState([]);
    
    useEffect(() => {
        const fetchConnections = async ()=>{
            try {
                const response = await fetch(`${API_BASE_URL}/user/connections`,{
                    method:"POST",
                    headers : {
                        'Content-Type': 'application/json',
                        authorization : localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ email:useremail })
                })
                
                
                if(response.ok){
                    const result = await response.json();
                    console.log("data form backend: ",result.data);
                    setConnections(result.data);
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
        <div className='min-h-screen flex flex-col mt-12 text-center pt-4 bg-black text-white'>
        

        <div className="flex flex-col gap-4">
            {Connections.length > 0  ? 
                (
                    Connections.map((Connection) => (
                        <ConnectionsCard
                        userid={Connection._id}
                        key={Connection._id}
                        name={Connection.name}
                        email={Connection.email}
                        mobile={Connection.mobile}
                        onClick={() => navigate(`/chat/${Connection._id}`)}
                        // image={image}
                        // onClick={() => navigate(`/product/${product._id}`)}
                    />
                    ))
                ) : ( 
                <>
                    <Link className='flex mx-auto text-emerald-300 border-b-1' to={'/add'} >Add up some friends bro!👈</Link> 
                    <p className='flex mx-auto'>No one to chat...🙄</p>
                </>
                )
            }
        </div>


    </div>
  )
}

export default Home;