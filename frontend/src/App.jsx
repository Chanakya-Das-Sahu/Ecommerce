import React from 'react'
import Navbar from './navbar.jsx'
import Account from './account.jsx'
import Home from './home.jsx'
import Cart from './cart.jsx'
import Orders from './orders.jsx'
import Detail from './detail.jsx'
import { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext } from 'react'
const context = createContext()
const App = () => {
  // retrievedData is being got as undefined 
  const[details,setDetails] = useState(()=>{
   const retrievedDetails = localStorage.getItem('details')
  //  console.log('retrievedDetails:',retrievedDetails)
   if(retrievedDetails==='undefined' || retrievedDetails==='null' || retrievedDetails===null || retrievedDetails===undefined ){
    // console.log('retrievedDetails something ',retrievedDetails)
    return {userId:'',productId:'',token:'',exp:''}

   }else{
    // console.log('retrievedDetails undefined',retrievedDetails)
// return {userId:'',productId:'',token:'',exp:''}
    return JSON.parse(retrievedDetails)
   }
  })

   useEffect(()=>{
    // console.log('details useFfect',details)
      localStorage.setItem('details',JSON.stringify(details))
   },[details])

  const [showLoginPage, setShowLoginPage] = useState(false)
  const [showSignupPage, setShowSignupPage] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showFilter,setShowFilter] = useState(false)
  return (
    <>
      <BrowserRouter>
        <context.Provider value={{
          details,
          setDetails,
          showLoginPage,
          setShowLoginPage,
          showSignupPage,
          setShowSignupPage,
          showLogout,
          setShowLogout,
          showFilter,
          setShowFilter
        }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account' element={<Account/>}/>
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Orders' element={<Orders />} />
            <Route path='/detailPage' element={<Detail/>} />
          </Routes>
        </context.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;
export { context }
