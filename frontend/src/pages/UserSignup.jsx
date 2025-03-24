import React, {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios' // read what is the use of axios (i think for share the data of user from frontedn to backend )
import { UserDataContext } from '../context/UserContext'

const UserSingup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('') 
  // const [userData , setUserData] = useState({})

  const navigate = useNavigate()

  const {user , setUser} = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
    }

    // here we are sending the data to the backend and i did not write awiat here 
    const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if(response.status === 201){
      const data = response.data

      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    // console.log(userData)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }
  return (
    <div className='h-screen p-7 flex flex-col justify-between items-center'>
    <div>
    <form onSubmit={(e) => {
        submitHandler(e)
      }}>
    <img className=' h-15 w-20  mb-4 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='uber-logo' />
      <h3 className='text-lg font-medium mb-2'>What's your name</h3>
      <div className='flex justify-between'>
      <input 
        type="text" 
        className='bg-[#eeeee] w-1/2 mb-3 mt-4 text-lg px-2 py-1 rounded '
        required  
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)} 
        placeholder='First name'
        />
        <input 
        type="text" 
        className='bg-[#eeeee] w-1/2 mb-3 mt-4 text-lg px-2 py-1 rounded'
        required  
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Last name'
        />
      </div>
      <h3 className='text-lg font-medium mb-2'>what's your email
        <input 
        type="email" 
        className='bg-[#eeeee] mb-3 mt-4 rounded px-2 py-1 w-full text-lg'
        required  
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email@ex.com'
        />
      </h3>
      <h3 className='text-lg font-medium mb-2'>Enter Password
        <input 
        type="password" 
        className='bg-[#eeeee] mb-3 mt-4 rounded px-2 py-1 w-full text-lg '
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
        />
      </h3>
      <button className='bg-[#111] text-white font-semibold mb-3 mt-4 rounded px-2 py-1 w-full text-lg '>Create new user</button>
      {/* <p className='text-center text-sm'>Don't have an account? <a href='#' className='text-blue-500'>Sign up</a></p> */}
     <p className='text-center text-sm'>Already have an account? <Link className='text-blue-600' to={'/login'}>Login here</Link></p>
    </form>
    </div>
    <div>
      <p className='text-sm'>By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
    </div>
  </div>
  )
}

export default UserSingup