    import React, { useContext, useEffect } from 'react'
    import { useState } from 'react'
    import axios from 'axios'
    import { context } from './App'
    import { jwtDecode } from 'jwt-decode'
    import { useNavigate } from 'react-router-dom'
    import Loading from './loading.gif'
    // import * as yup from 'yup'
    import * as yup from 'yup'
    const Login = () => {
      const[loading,setLoading] = useState(false)
      const [userDetails, setUserDetails] = useState({ email: '', password: '' })
      const { setShowLoginPage , setShowLogout ,details , setDetails} = useContext(context)
      const [incorrectCredential,setIncorrectCredentials] = useState(false)
      const[errors,setErrors] = useState()
      const navigate = useNavigate()
      
      const schema = yup.object({
        email:yup.string().email('Invalid Email Formate : ').required('Email Is Required : '),
        password:yup.string().required('Password is required')
        // .min(8,'Password must be at least 8 characters')
      })

      const handleInput = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
      }
    

      const handleLogin = async () =>{
    
        try{

         await schema.validate(userDetails,{abortEarly:false})
         console.log('Submitted')
         setErrors({email:'',password:''})
     
   
      
      
     setLoading(true)
        const res = await axios.post('https://ecommerce-ashy-ten.vercel.app/api/general/login', userDetails)
      console.log('res login',res)
      if(res.data.alert=='incorrect credentials'){
        setIncorrectCredentials(true)
        setLoading(false)
      }
      if (res.data.token != '') {
        const decodedToken = jwtDecode(res.data.token)
        setDetails({ ...details,token:res.data.token,userId: decodedToken.userId ,exp:decodedToken.exp})
        setShowLoginPage(false)
        setShowLogout(true) 
        navigate('/')
      }

      if(res.data){
        setLoading(false)
      }

    }catch(err){
      const errorObject = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(errorObject);
      console.log('charu',errorObject)
    }
      }
  return (
    <>

<div className="w-[300px] max-w-full login-dialog fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col justify-around rounded-md shadow-md p-6 z-50 h-[400px]">
  <button className="close-btn absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" onClick={() => setShowLoginPage(false)}>
    &times;
  </button>

  <h2 className="text-xl font-medium mb-4 text-center">Login</h2>

  <div className="flex flex-col gap-[20px] mb-[100px]">
    <input
      type="text"
      className="text-black login-input w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="email"
      onChange={(e) => {handleInput(e)}}
      placeholder="Email Address"
     />
    {errors?.email && <div className="text-red-500 text-[10px] mb-2" >{errors.email }</div> } 
    <input
      type="password"
      className="text-black login-input w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="password"
      onChange={(e) =>{ handleInput(e)}}
      placeholder="Password"
      // onBlur={(e) => validatePassword(e.target.value)} 
    />
    {/* {isPasswordValid ? null : (
      <span className="text-red-500 text-sm mb-2">Please enter a password (minimum 6 characters).</span>
    )} */}
 {errors?.password && <div className="text-red-500 text-[10px] mb-2" >{errors.password}</div> } 
   {incorrectCredential ? (
    <span className='text-red-500'>Incorrect Credentials</span>
   ):null
   }
    
{loading ?
<img src={Loading} width='100px' className='mx-auto'/>
:
   <button
      onClick={handleLogin}
      // className="login-btn w-full h-10 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      className='text-white text-center rounded-md bg-blue-700 hover:bg-blue-500'
 
    >
      Login
    </button>

}
   


  </div>
</div>





    </>
  )

    }
export default Login;