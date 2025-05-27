import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
        <nav className='w-full h-[38px] flex flex-row mx-auto bg-white/10 justify-center p-2 md:space-x-40 space-x-20 text-white fixed top-0  z-40 backdrop-blur'>
                <NavLink to={'/home'} className={({ isActive }) => (isActive ? "active-link" : "")}  >Home</NavLink>
                <NavLink to={'/add'}  className={({ isActive }) => (isActive ? "active-link" : "")} >Find</NavLink>
                <NavLink to={'/profile'}  className={({ isActive }) => (isActive ? "active-link" : "")} >Profile</NavLink>
                <NavLink to={'/notification'}  className={({ isActive }) => (isActive ? "active-link" : "")} >Notifications</NavLink>
        </nav>
    </>
  )
}

export default NavBar;