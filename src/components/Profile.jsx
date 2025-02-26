import React from 'react'
import {Link} from 'react-router-dom'

const Profile = () => {
  return (
    <div className='bg-black text-white min-h-screen flex flex-col mx-auto justify-center items-center p-4'>
        <p className='p-4 text-red-300'>Profile not found!</p>
        <Link to={'/'} className='text-yellow-300 border p-2 rounded-lg hover:cursor-pointer'>Logout</Link>
    </div>
  )
}

export default Profile;