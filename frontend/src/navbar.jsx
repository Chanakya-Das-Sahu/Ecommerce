import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { context } from './App.jsx'
import Login from './login'
import Signup from './signup'
const Navbar = () => {
    const { showLoginPage ,setShowLoginPage, showSignupPage , setShowSignupPage, setShowLogout, showLogout ,details ,setDetails } = useContext(context)
    const navigate = useNavigate()
    useEffect(()=>{
        if(details.userId==undefined || details.userId==''){
            setShowLogout(false)
        }else{
            setShowLogout(true)
        }
        // console.log('details',details)
    },[])

    const handleLogout = () =>{
        setDetails({userId:'',productId:'',token:'',exp:''})
        setShowLogout(false)
        navigate('/')
    }
    return (
        <nav className='border border-solid border-black flex justify-around items-center h-[50px] text-[15px] text-bold'>
            <div className=''><Link to='/'>Home</Link></div>
            <div className=''><Link to='/Cart'>Cart</Link></div>
            <div className=''><Link to='/Orders'>Orders</Link></div>
            {showLogout ?
                <>
                <div className=''><Link to='/account'>Account</Link></div> 
                 <button onClick={handleLogout}>Log Out</button>
                
                </>
                :
                <>
                    <button onClick={() => { setShowLoginPage(true);setShowSignupPage(false)}}>Login</button>
                    <button onClick={() => { setShowSignupPage(true);setShowLoginPage(false)}}>Signup</button>
                </>
            }
{showLoginPage && <Login/>}
{showSignupPage && <Signup/>}
        </nav>
    )
}

export default Navbar;