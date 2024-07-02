import React from 'react'
import {useState} from 'react'
import axios from 'axios'
const AdminSignup = () =>{
  const[userDetails,setUserDetails] = useState({email:'',password:''})

  const handleInput = (e) =>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
  }

  const handleSignup = () =>{
   console.log(userDetails)
  }

    return(
        <>
        <input type='text' name='email'onChange={(e)=>{handleInput(e)}}/>
        <input type='password' name='password' onChange={(e)=>{handleInput(e)}}/>
        <button onClick={handleSignup}>Signup</button>
        </>
    )
}

export default AdminSignup 