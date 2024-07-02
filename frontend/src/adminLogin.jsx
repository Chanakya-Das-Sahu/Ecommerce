import React from 'react'
import {useState} from 'react'
import axios from 'axios'
const AdminLogin = () =>{
  const[userDetails,setUserDetails] = useState({email:'',password:''})

  const handleInput = (e) =>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
  }

  const handleLogin = () =>{
   console.log(userDetails)
  }

    return(
        <>
        <input type='text' name='email'onChange={(e)=>{handleInput(e)}}/>
        <input type='password' name='password' onChange={(e)=>{handleInput(e)}}/>
        <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default AdminLogin 