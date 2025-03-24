import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url("https://cdn.pixabay.com/photo/2024/04/10/07/02/man-8687405_1280.jpg")] h-screen pt-10 flex justify-between flex-col w-full'>
            <img className=' h-15 w-20 ml-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='uber-logo' />
            <div className='bg-white py-5 px10'>
                <h2 className='text-2xl font-bold ml-10'>Get Started with Uber</h2>
                <Link to={'/login'} className='flex justify-center w-full bg-black text-white py-2 rounded mt-5 '>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start