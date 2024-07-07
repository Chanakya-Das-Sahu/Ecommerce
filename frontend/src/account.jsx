import React, { useContext, useEffect, useState } from 'react'
import { context } from './App'
import axios from 'axios'
const Account = () => {
    const [userDetails, setUserDetails] = useState('')
    const { details , setDetails ,setShowSignupPage } = useContext(context)

    useEffect(() => {
     
        const getDetails = async () => {
            const res = await axios.post(`http://localhost:3000/api/general/getUserDetails`, {}, {
                headers: { Authorization: details.token }
            })
            console.log('res account : ',res)
            if(res.data.User){
 setUserDetails(res.data.User)
            }
            if (res.data.alert == 'jwt expired') {
                setDetails({ productId: '', userId: '', token: '' })
                setShowLogout(false)
                setShowSignupPage(true)
           }
        }

         if(details.userId){
getDetails()
      }

      console.log('UserDetails',userDetails)
        
    }, [])

    const handleInput = (e) => {
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
    }

    const updateDetails = async () =>{
        const notEmpty = Object.values(userDetails).every(value=>value!=='')
       if(notEmpty){
       const res = await axios.put('http://localhost:3000/api/general/updateUserDetails',userDetails,{
        headers:{Authorization:details.token}
       })
       }
    }

    return (
        <>
            <div className='container p-[20px] '>
                {userDetails!='' ?
                <>
                  <div className='charu w-[400px] h-[500px] flex flex-col gap-[20px] mx-auto px-[50px]'>
                    <span className='text-center'><b>Details</b></span>
                    <input className='charu' onChange={handleInput} placeholder='Enter You Name : ' name='name' value={userDetails.name} />
                    <input className='charu' onChange={handleInput} placeholder='Enter You Email : ' name='email' value={userDetails.email} />
                    <input className='charu' onChange={handleInput} placeholder='Enter You Number : ' name='mnumber' value={userDetails.mnumber} />

                    <input className='charu h-[100px] flex flex-row justify:start ' onChange={handleInput} placeholder='Enter You Address : ' name='address' value={userDetails.address} />
                   
                   <button onClick={updateDetails} className='charu' >Update Details</button>
                </div>
                </>:
                <>
                <h1>Please Login </h1>
                </>

                }
               
              
            </div>

        </>
    )
}

export default Account 