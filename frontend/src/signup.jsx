import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { context } from './App'
import { useContext } from 'react'
const Signup = () =>{
  const[userDetails,setUserDetails] = useState({email:'',password:''})
   const { setShowSignupPage,showSignupPage , setShowLoginPage} = useContext(context)
   const [isEmailValid,setIsEmailValid] = useState(true)
   const [isPasswordValid,setIsPasswordValid] = useState(true)
   const [exists,setExists] = useState(false)
  const navigate = useNavigate()
  const handleInput = (e) =>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
  }

  const handleSignup = async () =>{
 if(isEmailValid && isPasswordValid){
  const res = await axios.post('https://chanakya-ecom.onrender.com/api/general/signup',userDetails)
  // console.log('res signup',res)
  if(res.data.alert='user exists already'){
    setExists(true)  
  }

 
  
  if(res.data.msg=='user is created successfully'){
         setShowSignupPage(false)
         setShowLoginPage(true)
  }
}
  }

  
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const validateEmail = (email) => {
  const isValid = emailRegex.test(email);
  setIsEmailValid(isValid); 
  return isValid;
};

const validatePassword = (password) => {
  const isValid = password.length >= 6; 
  setIsPasswordValid(isValid); 
  return isValid;
};

    return(
        <>

<div className="login-dialog fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white flex flex-col justify-around rounded-md shadow-md p-6 z-50 h-[400px]">
  <button className="close-btn absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" onClick={() => setShowSignupPage(false)}>
    &times;
  </button>

  <h2 className="text-xl font-medium mb-4 text-center">Signup</h2>

  <div className="flex flex-col gap-[20px] mb-[100px]">
    <input
      type="text"
      className="login-input w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="email"
      onChange={(e) => handleInput(e)}
      placeholder="Email Address"
      onBlur={(e) => validateEmail(e.target.value)} 
    />
    {isEmailValid ? null : (
      <span className="text-red-500 text-sm mb-2">Please enter a valid email address.</span>
    )}

    <input
      type="password"
      className="login-input w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="password"
      onChange={(e) => handleInput(e)}
      placeholder="Password"
      onBlur={(e) => validatePassword(e.target.value)} 
    />
    {isPasswordValid ? null : (
      <span className="text-red-500 text-sm mb-2">Please enter a password (minimum 6 characters).</span>
    )}
   
   {exists ? (
    <span className='text-red-500'>This email exists already</span>
  ):
   null
   }
    <button
      onClick={handleSignup}
      className="login-btn w-full h-10 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      disabled={!isEmailValid || !isPasswordValid} 
    >
      Signup
    </button>

   <button onClick={()=>{setShowLoginPage(true);setShowSignupPage(false)}}><u>Login</u></button>
  </div>
</div>


        </>
    )
}

export default Signup 