import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import AddFriend from './components/AddFriend'
import Home from './components/Home'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chat } from './components/Chat'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Messages from './components/Messages'

const App = () => {
    const router = createBrowserRouter([
        {
            path : "/",
            element : <>
                {/* <NavBar/> */}
                <Login/>
            </>
        },
        {
            path : "/register",
            element : <>

                <Register/>
            </>
        },
        {
            path : "/home",
            element : <>
                <NavBar/>
                <Home/>
            </>
        },
        {
            path : "/chat",
            element : <>
                <NavBar/>
                <Chat/>
            </>
        },
        {
            path : "/profile",
            element : <>
                <NavBar/>
                <Profile/>
            </>
        },
        {
            path : "/add",
            element : <>
                <NavBar/>
                <AddFriend/>
            </>
        },
        {
            path : "/notification",
            element : <>
                <NavBar/>
                <Notification/>
            </>
        },
        {
            path : "/messages",
            element : <>
                <NavBar/>
                <Messages/>
            </>
        },
    ])


  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer/>
    </>
  )
}

export default App