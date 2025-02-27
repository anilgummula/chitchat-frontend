import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

const NetworkCard = (props) => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { email,name,userid,mobile,image } = props;
  const navigate = useNavigate();




  return (
    // <div className="max-w-full md:max-w-4xl w-full flex flex-col md:flex-row justify-between items-center border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-lg mx-auto mb-4">
        <div className="flex flex-row items-center bg-white/10 p-2 md:mx-4 mx-2 md:space-x-8 space-x-4 rounded-md">
            {/* <p className="text-white">{userid}</p> */}
            {/* <div></div> */}
            <span className="border rounded-full bg-white w-12"><img src="/profile-picture.png" className="" alt="" /></span>

            <p className="text-white pt-0 pb-2 flex flex-col text-sm">
                <span>{name}</span>
                <span>{email}</span>
            </p>
            <div className="flex mx-auto mr-0">
                <button className="text-white text-sm p-1 border rounded-lg hover:bg-white/10">send request</button>
            </div>
        </div>
    // </div>
  );
};

export default NetworkCard;
