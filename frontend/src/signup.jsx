import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { context } from './App'
import { useContext } from 'react'
import Loading from './loading.gif'
import * as yup from 'yup'
const Signup = () =>{
  const[userDetails,setUserDetails] = useState({email:'',password:'',otp:''})
   const { setShowSignupPage,showSignupPage , setShowLoginPage} = useContext(context)
  const[otpSent,setOtpSent] = useState(false)
   const [exists,setExists] = useState(false)
   const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
 const[errors,setErrors] = useState()
const[otpAlert,setOtpAlert] = useState(false)
  const handleInput = (e) =>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
  }

  const schema = yup.object({
    email:yup.string().email('Invalid Email Formate ').required('Email Required'),
    password:yup.string().required('Password Required')
    .min('8')
  })

  const handleSendOTP = async () =>{
    try{
    await schema.validate(userDetails,{abortEarly:false})
    // console.log('submitted')
    setLoading(true)
    setErrors({email:'',password:''})
    const res =  await axios.post('https://ecommerce-ashy-ten.vercel.app/api/general/otpSending',{email:userDetails.email})
    // console.log('jl',res)
    if(res.data){
      setLoading(false)
      // console.log('hi')
    }
    if(res.data.msg=='otp sent'){
      setExists(false)
      setOtpSent(true)
    }
    if(res.data.alert){
      setExists(true)
    }
    }catch(err){
 const errorObject = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(errorObject);
      // console.log('charu',errorObject)
     
    }
  }

  const handleSignup = async () =>{
    // console.log('handleSignup')
  setLoading(true)
  const res = await axios.post('https://ecommerce-ashy-ten.vercel.app/api/general/signup',userDetails)
  // console.log('res signup',res)
  if(res.data){
    setLoading(false)
  }
  if(res.data.msg=='user is created successfully'){
     setShowSignupPage(false)
  setShowLoginPage(true)
  }
  if(res.data.alert){
 setOtpAlert(res.data.alert)
  }
 
}
 
  
//   if(res.data.msg=='user is created successfully'){
//          setShowSignupPage(false)
//          setShowLoginPage(true)
//   }
// }
//   }

  

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
      className="text-black login-input w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="email"
      onChange={(e) => handleInput(e)}
      value={userDetails.email}
      placeholder="Email Address"
      disabled={otpSent}
        />
   {errors?.email && <div className="text-red-500 text-[10px] mb-2" >{errors.email }</div> } 

    <input
      type="password"
      className="text-black login-input w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="password"
      onChange={(e) => handleInput(e)}
      value={userDetails.password}
      placeholder="Password"
      disabled={otpSent}
    />
   {errors?.password && <div className="text-red-500 text-[10px] mb-2" >{errors.password }</div> } 
   
   {exists ? (
    <span className='text-red-500'>This email exists already</span>
  ):
   null
   }

<div className="flex flex-col gap-[20px] mb-[100px]">
    



   {!otpSent ?
   (loading?
     <img src={Loading} width='100px' className='mx-auto' />:
    <button
      onClick={handleSendOTP}
      // className="text-center  w-full h-10 bg-blue-500 font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      className='text-center text-white bg-blue-700 hover:bg-blue-500 rounded-md'
    >
      Send OTP
    </button>
   )
    

   :
   <>
   <input
      type="text"
      className="text-black login-input w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="otp"
      onChange={(e) => handleInput(e)}
      value={userDetails.otp}
      placeholder="OTP"
      // onBlur={(e) => validateEmail(e.target.value)} 
    />
    {loading ?
    <img src={Loading} width='100px' className='mx-auto'/>
    :
    <>
      <button
      onClick={handleSignup}
      // className="text-center  w-full h-10 bg-blue-500 font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      className='text-center text-white bg-blue-700 hover:bg-blue-500 rounded-md'
    >
     Signup
    </button>
    {otpAlert && <div className="text-red-500 text-[10px] mb-2" >{otpAlert}</div>}
    </>
    }
 
    </>
   }
   

   <button onClick={()=>{setShowLoginPage(true);setShowSignupPage(false)}} className='text-black'><u>Login</u></button>
  </div>
</div>

  </div>
  </>
  )
  }

export default Signup 