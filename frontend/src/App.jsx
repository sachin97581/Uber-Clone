import React from 'react'
import {Route , Routes} from 'react-router-dom'  // this is for routing in react
import Start from './pages/Start'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import UserSingup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<Userlogin/>} />
        <Route path='/Signup' element={<UserSingup/>} />
        <Route path='/captain-login' element={<Captainlogin/>} />
        <Route path='/Captain-Signup' element={<CaptainSignup/>}/>
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>

        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
        }/>

      </Routes>
    </div>
  )
}

export default App