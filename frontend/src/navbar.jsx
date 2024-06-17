import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='border border-solid border-black flex justify-around items-center'>
           <div className='charu'><Link to='/'>Home</Link></div>
           <div className='charu'><Link to='/Cart'>Cart</Link></div>
           <div className='charu'><Link to='/Orders'>Orders</Link></div>
           <div className='charu'><Link to='/adminConsole'>adminConsole</Link></div>
        </nav>
    )
}

export default Navbar;