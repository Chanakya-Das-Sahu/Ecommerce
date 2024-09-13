import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { context } from './App.jsx'
import Login from './login'
import Signup from './signup'
import menu from './menu.png'
const Navbar = () => {
    const { showLoginPage ,setShowLoginPage, showSignupPage , setShowSignupPage, setShowLogout, showLogout ,details ,setDetails , showFilter , setShowFilter } = useContext(context)
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
        <nav className='border border-solid border-black flex justify-around items-center h-[50px] text-[20px] text-white text-bold bg-[#2e4964]'>
            <div className='filter:hidden' onClick={()=>{setShowFilter(true)}}><img src={menu} width='30px'/></div> 
            <div className='hover:text-[#f9abaf]'><Link to='/'>Home</Link></div>
            <div className='hover:text-[#f9abaf]'><Link to='/Cart'>Cart</Link></div>
            {/* <div className=''><Link to='/Orders'>Orders</Link></div> */}
            {showLogout ?
                <>
                <div className='hover:text-[#f9abaf]'><Link to='/account'>Account</Link></div> 
                 <button className='hover:text-[#f9abaf]' onClick={handleLogout}>Log Out</button>
                
                </>
                :
                <>
                    <button onClick={() => { setShowLoginPage(true);setShowSignupPage(false)}} className='hover:text-[#f9abaf]'>Login</button>
                    <button onClick={() => { setShowSignupPage(true);setShowLoginPage(false)}} className='hover:text-[#f9abaf]'>Signup</button>
                </>
            }
{showLoginPage && <Login/>}
{showSignupPage && <Signup/>}
        </nav>
    )
}

export default Navbar;