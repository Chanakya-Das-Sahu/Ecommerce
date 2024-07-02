import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { context } from './App'
import { jwtDecode } from 'jwt-decode'
const Login = ({ setShowLogin, setShowLogOut }) => {
  const [userDetails, setUserDetails] = useState({ email: '', password: '' })
  const { details, setDetails } = useContext(context)

  const handleInput = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    const res = await axios.post('http://localhost:3000/api/general/userLogin', userDetails)

    if (res.data.token != '') {
      const decodedToken = jwtDecode(res.data.token)
      setDetails({ ...details,token:res.data.token,userId: decodedToken.userId ,exp:decodedToken.exp})
      setShowLogin(false)
      setShowLogOut(true)
    }

  }

  return (
    <>
      <div className='border border-solid border-black flex flex-col justify-center items-center absolute top-1/2 left-1/2 
        transform -translate-x-1/2 -translate-y-1/2 gap-[50px] w-[300px] h-[400px] px-[25px] py-[50px] bg-[red] '>
        <button className='absolute top-[1%] right-[1%]' onClick={() => { setShowLogin(false) }} >❌</button>
        <div>Login</div>

        <input type='text' className='w-full h-[30px]' name='email' onChange={(e) => { handleInput(e) }} />
        <input type='password' className='w-full h-[30px]' name='password' onChange={(e) => { handleInput(e) }} />
        <button onClick={handleLogin} className='border border-solid border-black bg-[black] w-full h-[30px] '>Login</button>
      </div>

    </>
  )

}
export default Login;