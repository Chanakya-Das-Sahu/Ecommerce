import React from 'react'
import Navbar from './navbar.jsx'
import Home from './home.jsx'
import Cart from './cart.jsx'
import Orders from './orders.jsx'
import UploadPage from './uploadPage.jsx'
import AdminConsole from './adminConsole.jsx'
import UpdateProduct from './updateProduct.jsx'
import Detail from './detail.jsx'
import { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext } from 'react'
const context = createContext()
const App = () => {
  const[details,setDetails] = useState(()=>{
   const retrievedDetails = localStorage.getItem('details')
   if(retrievedDetails=='undefined'){
    console.log('retrievedDetails something ',retrievedDetails)
    return {userId:'',productId:'',token:'',exp:''}
   }else{
    console.log('retrievedDetails undefined',retrievedDetails)
      return JSON.parse(retrievedDetails)
   }
  })

   useEffect(()=>{
    console.log('details useFfect',details)
      localStorage.setItem('details',JSON.stringify(details))
   },[details])

  const [showLoginPage, setShowLoginPage] = useState(false)
  const [showSignupPage, setShowSignupPage] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

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
          setShowLogout
        }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Orders' element={<Orders />} />
            <Route path='/adminConsole' element={<AdminConsole />} />
            <Route path='/uploadPage' element={<UploadPage />} />
            <Route path='/UpdateProduct' element={<UpdateProduct />} />
            <Route path='/detailPage' element={<Detail/>} />
          </Routes>
        </context.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;
export { context }