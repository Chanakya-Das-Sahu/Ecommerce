// import React, { useContext, useEffect, useState } from 'react'
// import { context } from './App'
// import axios from 'axios'
// const Account = () => {
//     const [userDetails, setUserDetails] = useState('')
//     const { details , setDetails ,setShowSignupPage } = useContext(context)

//     useEffect(() => {

//         const getDetails = async () => {
//             const res = await axios.post(`https://ecommerce-ashy-ten.vercel.app/api/general/getUserDetails`, {}, {
//                 headers: { Authorization: details.token }
//             })
//             if(res.data.User){
//  setUserDetails(res.data.User)
//             }
//             if (res.data.alert == 'jwt expired') {
//                 setDetails({ productId: '', userId: '', token: '' })
//                 setShowLogout(false)
//                 setShowSignupPage(true)
//            }
//         }

//          if(details.userId){
// getDetails()
//       }


//     }, [])

//     const handleInput = (e) => {
//         setUserDetails({...userDetails,[e.target.name]:e.target.value})
//     }

//     const updateDetails = async () =>{
//         const notEmpty = Object.values(userDetails).every(value=>value!=='')
//        if(notEmpty){
//        const res = await axios.put('https://ecommerce-ashy-ten.vercel.app/api/general/updateUserDetails',userDetails,{
//         headers:{Authorization:details.token}
//        })
//        }
//     }

//     return (
//         <>
//             <div className='container p-[20px] '>
//                 {userDetails!='' ?
//                 <>
//                   <div className='charu w-[400px] h-[500px] flex flex-col gap-[20px] mx-auto px-[50px]'>
//                     <span className='text-center'><b>Details</b></span>
//                     <input className='charu' onChange={handleInput} placeholder='Enter You Name : ' name='name' value={userDetails.name} />
//                     <input className='charu' onChange={handleInput} placeholder='Enter You Email : ' name='email' value={userDetails.email} />
//                     <input className='charu' onChange={handleInput} placeholder='Enter You Number : ' name='mnumber' value={userDetails.mnumber} />

//                     <input className='charu h-[100px] flex flex-row justify:start ' onChange={handleInput} placeholder='Enter You Address : ' name='address' value={userDetails.address} />

//                    <button onClick={updateDetails} className='charu' >Update Details</button>
//                 </div>
//                 </>:
//                 <>
//                 <h1>Please Login </h1>
//                 </>

//                 }


//             </div>

//         </>
//     )
// }

// export default Account 

import React, { useContext, useEffect, useState } from 'react';
import { context } from './App';
import axios from 'axios';
import Loading from './loading.gif'
const Account = () => {
    // const [userDetails, setUserDetails] = useState({
    //     name: '',
    //     email: '',
    //     mnumber: '',
    //     address: '',
    // });
    const [userDetails,setUserDetails] = useState('')
    const { details, setDetails, setShowSignupPage } = useContext(context);

    const [errors, setErrors] = useState({}); 

    useEffect(() => {
        const getDetails = async () => {
            const res = await axios.post(
                `https://ecommerce-ashy-ten.vercel.app/api/general/getUserDetails`,
                {},
                {
                    headers: { Authorization: details.token },
                }
            );
              console.log('res',res)
            if (res.data.User) {
                setUserDetails(res.data.User);
            }

            if (res.data.alert === 'jwt expired') {
                setDetails({ productId: '', userId: '', token: '' });
                setShowLogout(false);
                setShowSignupPage(true);
            }
        };

        if (details.userId) {
            getDetails();
        }
    }, []);

    const handleInput = (e) => {
        const error = validateInput(e.target.name, e.target.value); 
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: error });
    };

    const validateInput = (field, value) => {
        let error = '';
        switch (field) {
            case 'name':
                error = validateName(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'mnumber':
                error = validateMobileNumber(value);
                break;
            case 'address':
                error = validateAddress(value);
                break;
            default:
                break;
        }
        return error;
    };

    const validateName = (value) => {
            
        if (value.trim() === '') {
          return 'Name is required.';
        } else if (value.length < 3) {
          return 'Name must be at least 3 characters long.';
        }
        return '';  
      };
    
      const validateEmail = (value) => {
       
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(value)) {
          return 'Invalid email format.';
        }
        return '';  
      };
    
      const validateMobileNumber = (value) => {
       
        if (value.trim() === '') {
          return 'Mobile number is required.';
        } else if (isNaN(value) || value.length < 10 || value.length>10) {
          return 'Invalid mobile number.';
        }
        return '';  
      };
    
      const validateAddress = (value) => {
      
        if (value.trim() === '') {
          return 'Address is required.';
        } else if (value.length < 10) {
          return 'Address must be at least 10 characters long.';
        }
        return ''; 
      };

      
    const updateDetails = async () => {
        console.log('errors',errors)
         if( (errors.name==='' || userDetails.name!=='') && (errors.mnumber==='' || userDetails.mnumber!=='') && (errors.address==='' || userDetails.address!=='') &&  (errors.email==='' ||  userDetails!=='') ){
            const res = await axios.put('https://ecommerce-ashy-ten.vercel.app/api/general/updateUserDetails',userDetails,{
                headers:{Authorization:details.token}
            })
            console.log('updateDetails res : ',res)
         }else{
            console.log('updateDetails : not ')
         }
        // const notEmpty = Object.values(userDetails).every((value) => value !== '');

        // if (notEmpty) {

        //     if (Object.keys(errors).length === 0) { // Check if there are no errors
        //         const res = await axios.put(
        //             'https://ecommerce-ashy-ten.vercel.app/api/general/updateUserDetails',
        //             userDetails,
        //             {
        //                 headers: { Authorization: details.token },
        //             }
        //         );
        //     } else {
        //         console.error('Error: Update failed due to validation errors.');
        //     }
        // }
    };

    return (
        <>
            <div className='flex justify-center bg-[#f9abaf] h-[100vh]'>
              
                {userDetails !== '' ? (
                    <>
                        <div className='max-w-full mx-auto my-[20px] text-black text-[20px] px-[50px] py-[10px] flex flex-col gap-[15px] bg-[#2e4964]'>
                            <span className='text-center'><b>Details</b></span>
                            <lable className='text-white'>Name : </lable>
                            <input
                                className='charu px-[10px]'
                                onChange={handleInput}
                                placeholder='Enter Your Name : '
                                name='name'
                                value={userDetails.name}
                                aria-describedby="name-error"  
                            />
                            {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}   
                            <lable className='text-white'>Email : </lable>
                            <input
                                className='charu px-[10px]'
                                onChange={handleInput}
                                placeholder='Enter You Email : '
                                name='email'
                                value={userDetails.email}
                                aria-describedby="email-error"  
                            />
                            {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}  
                            <lable className='text-white'>Mobile Number : </lable>
                            <input
                                className='charu px-[10px]'
                                onChange={handleInput}
                                placeholder='Enter You Number : '
                                name='mnumber'
                                value={userDetails.mnumber}
                                aria-describedby="mnumber-error"  
                            />
                            {errors.mnumber && <span id="mnumber-error" className="error-message">{errors.mnumber}</span>} 
                            <lable className='text-white'>Address : </lable>
                            <input
                                className='charu  px-[10px] h-[100px] flex flex-row justify:start '
                                onChange={handleInput}
                                placeholder='Enter You Address : '
                                name='address'
                                value={userDetails.address}
                                aria-describedby="address-error"  
                            />
                            {errors.address && <span id="address-error" className="error-message">{errors.address}</span>} 
                            <button onClick={updateDetails} className='charu bg-[#f9abaf]'>
                                Update Details
                            </button>
                        </div>
        

          </>
        ) : (
       <img src={Loading} width='300px' height='200px' className='m-auto'/>
)}

  
      </div>
    </>
  );
};

export default Account;
