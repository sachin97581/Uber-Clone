import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import UserSingup from './pages/UserSingup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/Captainlogin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Userlogin/>} />
        <Route path='/Signup' element={<UserSingup/>} />
        <Route path='/captain-login' element={<Captainlogin/>} />
        <Route path='/Captain-Signup' element={<CaptainSignup/>}/> 

      </Routes>
    </div>
  )
}

export default App