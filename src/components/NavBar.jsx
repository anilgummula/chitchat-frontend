// import React from 'react'
// import { NavLink } from 'react-router-dom';

// const NavBar = () => {
//   return (
//     <>
//         <nav className='w-full h-[38px] flex flex-row mx-auto bg-white/10 justify-center p-2 md:space-x-40 space-x-20 text-white fixed top-0  z-40 backdrop-blur'>
//                 <NavLink to={'/home'} className={({ isActive }) => (isActive ? "active-link" : "")}  >Home</NavLink>
//                 <NavLink to={'/add'}  className={({ isActive }) => (isActive ? "active-link" : "")} >Find</NavLink>
//                 <NavLink to={'/profile'}  className={({ isActive }) => (isActive ? "active-link" : "")} >Profile</NavLink>
//                 <NavLink to={'/notification'}  className={({ isActive }) => (isActive ? "active-link" : "")} >Notifications</NavLink>
//         </nav>
//     </>
//   )
// }

// export default NavBar;
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // You can install lucide-react or use any icon set

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white/10 text-white fixed top-0 z-40 backdrop-blur p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold">NetVork</h1>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav links (Desktop) */}
        <div className="hidden md:flex justify-center mx-auto space-x-12 text-sm font-medium">
          <NavLink to="/home" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Home</NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Find</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Profile</NavLink>
          <NavLink to="/notification" className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Notifications</NavLink>
        </div>
      </div>

      {/* Nav links (Mobile) */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 px-4 text-sm font-medium">
          <NavLink to="/home" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Home</NavLink>
          <NavLink to="/add" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Find</NavLink>
          <NavLink to="/profile" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Profile</NavLink>
          <NavLink to="/notification" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-yellow-400" : ""}>Notifications</NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
