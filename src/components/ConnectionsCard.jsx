import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

// const ConnectionsCard = (props) => {
//   const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
//   const { email,name,userid,mobile,image } = props;
//   const navigate = useNavigate();



//   const handleclick = async (e)=>{
//     e.preventDefault();
//     handleSuccess("its working priya");
//     // const myid = localStorage.getItem('loggedInUserId')
//     // try {
//     //     const result = await fetch(`${API_BASE_URL}/user/react`,{
//     //         method: "POST",
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //             authorization: localStorage.getItem("token"),
//     //         },
//     //         body: JSON.stringify({ myid:myid,rid:userid,email:email})
//     //     })
//     //     if(result.ok){
//     //         handleSuccess("notifications loaded");
//     //     }
//     //     else{
//     //         handleError("not able to add");
//     //     }
//     // } catch (error) {
//         // handleError(error);
//     // }
//   }
 



//   return (
//     // <div className="max-w-full md:max-w-4xl w-full flex flex-col md:flex-row justify-between items-center border border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-lg mx-auto mb-4">
//         <button onClick={(e)=>handleclick(e)}>

//             <div className="flex flex-row items-center bg-white/10 p-2 md:mx-4 mx-2 md:space-x-8 space-x-4 rounded-md border border-blue-200">
//                 {/* <p className="text-white">{userid}</p> */}
//                 {/* <div></div> */}
//                 <span className="border rounded-full bg-white w-12"><img src="/profile-picture.png" className="" alt="" /></span>

//                 <p className="text-white pt-0 pb-2 flex flex-col md:w-full text-sm">
//                     <span>{name}</span>
//                     <span>{email}</span>
//                 </p>
            
//             </div>
//         </button>
//     // </div>
//   );
// };

// export default ConnectionsCard;



// import React from "react";
// import { useNavigate } from "react-router-dom";

const ConnectionsCard = ({ email, name, userid, mobile, image, onClick }) => {
  return (
    <button onClick={onClick} className="w-full text-left">
      <div className="flex flex-row items-center bg-white/10 p-3 md:mx-4 mx-2 md:space-x-6 space-x-4 rounded-md border border-blue-200 hover:bg-white/20 transition duration-200">
        <span className="border rounded-full bg-white w-12 h-12 overflow-hidden flex items-center justify-center">
          <img
            src={image || "/profile-picture.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </span>

        <div className="text-white flex flex-col text-sm">
          <span className="font-medium text-base">{name}</span>
          <span className="text-gray-300">{email}</span>
        </div>
      </div>
    </button>
  );
};

export default ConnectionsCard;
