import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { context } from './App'
import { useContext } from 'react'
const Signup = () =>{
  const[userDetails,setUserDetails] = useState({email:'',password:''})
   const { setShowSignupPage,showSignupPage , setShowLoginPage} = useContext(context)
  const navigate = useNavigate()
  const handleInput = (e) =>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
  }

  const handleSignup = async () =>{
  //  console.log(userDetails)
  const res = await axios.post('http://localhost:3000/api/general/signup',userDetails)
  if(res.data.msg=='user created successfully'){
         setShowSignupPage(false)
         setShowLoginPage(true)
  }
  }

    return(
        <>

        {/* <input type='text' name='email'onChange={(e)=>{handleInput(e)}}/>
        <input type='password' name='password' onChange={(e)=>{handleInput(e)}}/>
        <button onClick={handleSignup}>Signup</button> */}
          <div className='border border-solid border-black flex flex-col justify-center items-center absolute top-1/2 left-1/2 
        transform -translate-x-1/2 -translate-y-1/2 gap-[50px] w-[300px] h-[400px] px-[25px] py-[50px] bg-[red] '>
          <button className='absolute top-[1%] right-[1%]' onClick={()=>{setShowSignupPage(false)}} >❌</button>
          <div>Signup</div>
      
          <input type='text' className='w-full h-[30px]' name='email'onChange={(e)=>{handleInput(e)}}/>
        <input type='password' className='w-full h-[30px]' name='password' onChange={(e)=>{handleInput(e)}}/>
        <button onClick={handleSignup} className='border border-solid border-black bg-[black] w-full h-[30px] '>Signup</button>
        <p onClick={()=>{setShowLoginPage(true);setShowSignupPage(false)}}><u>Login</u></p>
         </div>
        </>
    )
}

export default Signup 