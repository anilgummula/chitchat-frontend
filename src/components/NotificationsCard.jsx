import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

const NotificationsCard = (props) => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { email,name,userid,mobile,image } = props;
  const navigate = useNavigate();



  const handleclick = async (e)=>{
    e.preventDefault();
    const myid = localStorage.getItem('loggedInUserId')
    try {
        const result = await fetch(`${API_BASE_URL}/user/react`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({ myid:myid,rid:userid,email:email})
        })
        if(result.ok){
            handleSuccess("connection build!");
        }
        else{
            handleError("not able to add");
        }
    } catch (error) {
        handleError(error);
    }
  }
 



  return (
    // <div className="max-w-full md:max-w-4xl w-full flex flex-col md:flex-row justify-between items-center border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-lg mx-auto mb-4">
        <div className="flex flex-row items-center bg-white/10 p-2 md:mx-4 mx-2 md:space-x-8 space-x-4 rounded-md">
            {/* <p className="text-white">{userid}</p> */}
            {/* <div></div> */}
            <span className="border rounded-full bg-white w-12"><img src="/profile-picture.png" className="" alt="" /></span>

            <p className="text-white pt-0 pb-2 flex flex-col md:w-full text-sm">
                <span>{name}</span>
                <span>{email}</span>
            </p>
            <div className="flex mx-auto mr-0">
                <button className="text-white text-sm p-1 border border-green-300 md:w-full w-20  rounded-lg hover:bg-white/10" onClick={(e)=>handleclick(e)}>accept</button>
                {/* <button className="text-white text-sm p-1 border border-red-300 md:w-full w-20  rounded-lg hover:bg-white/10" onClick={(e)=>handleclick(e)}>reject</button> */}
            </div>
        </div>
    // </div>
  );
};

export default NotificationsCard;
