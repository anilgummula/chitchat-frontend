import React from 'react'
import { Link } from 'react-router-dom'

export const Chat = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center text-center pt-4 bg-black text-white'>
        <p className='flex mx-auto text-purple-300'>No one to chat!</p>
        <Link className='flex mx-auto text-blue-300 border-b-1' to={'/add'} >Add up some friends bro!</Link>
    </div>
  )
}
