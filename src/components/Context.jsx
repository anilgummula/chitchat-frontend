import React, { createContext, useEffect, useState } from 'react'
import { handleSuccess } from '../utils';


export const context = createContext();

const Context = ({children}) => {
    const [loggedIn,setLoggedIn]=useState(false);
    const [user ,setUser] = useState([]);

    // useEffect(() => {
    //     const data = localStorage.getItem("user");
    //     if(data){
    //         setLoggedIn(true);
    //         setUser(user);
    //     }

    // }, []);

    const logout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setLoggedIn(false);
        setUser(false);
        handleSuccess("Logged out");
        window.location.href = "/";
    }

  return (


    <context.Provider value={{user,setUser,loggedIn,setLoggedIn}}>
        {children}
    </context.Provider>
  )
}

export default Context;