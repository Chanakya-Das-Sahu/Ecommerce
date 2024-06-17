import react from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux' 
import axios from 'axios'
import cross from './delete.png' 
import { addProductId } from './slice'
import { store } from './store'
import UpdateProduct from './updateProduct'
const adminConsole = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product,setProduct] = useState()
    const [products, setProducts] = useState([])
    
    useEffect(() => {

        const getData = async () => {
            const res = await axios.get('http://localhost:3000/api/general/getProducts')
            console.log(res)
            setProducts(res.data.products)
           
        }

        getData()
        
    }, [])

   const updateProductDetails = (id) =>{
     dispatch(addProductId(id))
     navigate('/updateProduct')
   
   }
  
 const deleteProduct = async (id) =>{
    console.log("IDDD",id)
   const res =  await axios.delete(`http://localhost:3000/api/admin/deleteProduct/${id}`)
   if(res.data.msg=='deleted'){
    const res = await axios.get('http://localhost:3000/api/general/getProducts')
            console.log(res)
            setProducts(res.data.products)
   } 
}

    return (
        <>
            <h1>Admin Console</h1>
            {products.length > 0 ?
                (
                    products.map((ele) => (
                        <div className='border border-solid border-black w-auto h-[160px] flex flex-row items-center justify-around m-[10px]'>
                            <div className='charu h-[150px] w-[150px]'><img src={ele.image} style={{ width: '100%', height: '100%' }} /></div>
                            {/* <img src={cross} style={{width:'20px',position:'relative',bottom:'1px',right:'0px'}}/> */}
                            <div className='charu h-[150px] w-[340px] flex flex-row items-center overflow-x-auto overflow-y-hidden'>
                                {products.length > 0 ?
                                    ele.images.map((link) => (
                                        // console.log(link)
                                        <>
                                        <img src={link} style={{width:'140px' , height:'140px' , margin:'5px'}} />
                                        {/* <img src={cross} style={{width:'20px',position:'relative',bottom:'1px',right:'0px'}}/> */}
                                      </>
                                    ))
                                    :
                                    <h1>No Images</h1>
                                }
                            </div>
                            <input className='charu h-[150px] w-[150px]' name="name" onChange={(e)=>{ changeProductDetails(e,index) }} value={ele.name}></input>
                            <input className='charu h-[150px] w-[150px]' name="dis" value={ele.dis}></input>
                            <input className='charu h-[20px] w-[60px]'  name="price" value={ele.price}></input>
                            <input className='charu h-[20px] w-[60px]'  name="cat" value={ele.cat}></input>
                            <input className='charu h-[20px] w-[60px]' name="qty" value={ele.qty}></input>
                            <button onClick={()=>{updateProductDetails(ele._id)}}>Update</button>
                            <button onClick={()=>{deleteProduct(ele._id)}}>delete</button>
                        </div>
                    ))

                ) :
                (
                    <h1>No Products</h1>
                )
            }
            <button onClick={() => { navigate('/uploadPage') }}>+</button>
        </>
    )
}

export default adminConsole 
