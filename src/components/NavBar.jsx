import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
        <nav className='w-full h-[38px] flex flex-row mx-auto bg-white/30 justify-center p-2 md:space-x-40 space-x-20 text-white fixed top-0 '>
                <NavLink to={'/chat'} className={({ isActive }) => (isActive ? "active-link" : "")}  >Chat</NavLink>
                <NavLink to={'/add'}  className={({ isActive }) => (isActive ? "active-link" : "")} >Add</NavLink>
                <NavLink to={'/profile'}  className={({ isActive }) => (isActive ? "active-link" : "")} >Profile</NavLink>
        </nav>
    </>
  )
}

export default NavBar;