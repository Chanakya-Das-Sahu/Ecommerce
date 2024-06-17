import React from 'react'
import Navbar from './navbar.jsx'
import Home from './home.jsx'
import Cart from './cart.jsx'
import Orders from './orders.jsx'
import UploadPage from './uploadPage.jsx'
import AdminConsole from './adminConsole.jsx'
import UpdateProduct from './updateProduct.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <>
   
    <BrowserRouter> 
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Orders' element={<Orders/>}/>
      <Route path='/adminConsole' element={<AdminConsole/>} />
      <Route path='/uploadPage' element={<UploadPage/>}/>
      <Route path='/UpdateProduct' element={<UpdateProduct/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;