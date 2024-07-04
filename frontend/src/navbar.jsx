import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { context } from './App.jsx'
import Login from './login'
import Signup from './signup'
const Navbar = () => {
    const { showLoginPage ,setShowLoginPage, showSignupPage , setShowSignupPage, setShowLogout, showLogout ,details ,setDetails } = useContext(context)
    useEffect(()=>{
        if(details.userId==undefined || details.userId==''){
            setShowLogout(false)
        }else{
            setShowLogout(true)
        }
        console.log('details',details)
    },[])

    const handleLogout = () =>{
        setDetails({userId:'',productId:'',token:'',exp:''})
        setShowLogout(false)
    }
    return (
        <nav className='border border-solid border-black flex justify-around items-center'>
            <div className='charu'><Link to='/'>Home</Link></div>
            <div className='charu'><Link to='/Cart'>Cart</Link></div>
            <div className='charu'><Link to='/Orders'>Orders</Link></div>
            <div className='charu'><Link to='/adminConsole'>adminConsole</Link></div>
            {showLogout ?
                <button onClick={handleLogout }>Log Out</button>
                :
                <>
                    <button onClick={() => { setShowLoginPage(true) }}>Login</button>
                    <button onClick={() => { setShowSignupPage(true)}}>Signup</button>
                </>
            }
{showLoginPage && <Login/>}
{showSignupPage && <Signup/>}
        </nav>
    )
}

export default Navbar;