import React, { useState , userContext } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const Userlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [userData , setUserData] = useState({})

  const navigate = useNavigate()
  const {user , setUser} = React.useContext(UserDataContext)

  const submitHandler =async (e) => {
    e.preventDefault()
    // console.log(email, password)
    const userData = {
      email: email,
       password:password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      if(response.status === 200){
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }

      // console.log(userData)
    setEmail('')
    setPassword('')
  }
  return (
    <div className='h-screen p-7 flex flex-col justify-between items-center'>
      <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
      <img className=' h-15 w-20  mb-8 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='uber-logo' />
        <h3 className='text-lg font-medium mb-2'>what's your email
          <input 
          type="text" 
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
        <button className='bg-[#111] text-white font-semibold mb-3 mt-4 rounded px-2 py-1 w-full text-lg '>Login</button>
        {/* <p className='text-center text-sm'>Don't have an account? <a href='#' className='text-blue-500'>Sign up</a></p> */}
       <p className='text-center text-sm'>New here? <Link className='text-blue-600' to={'/signup'}>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link to={'/captain-login '}  className='w-full bg-[#10b461] text-white flex justify-center items-center font-semibold mb-3 mt-4 rounded px-2 py-1  text-lg '>Sing in as Captain</Link>
      </div>
    </div>
  )
}

export default Userlogin