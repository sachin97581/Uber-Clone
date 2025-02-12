import React from 'react'

const Home = () => {
  return (
    <div>
        <div className='h-screen flex justify-between flex-col w-full bg-red-400'>
            <img className='bg-white' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='uber-logo' />
            <div className='bg-white'>
                <h2>Get Started with Uber</h2>
                <button>Continue</button>
            </div>
        </div>
    </div>
  )
}

export default Home