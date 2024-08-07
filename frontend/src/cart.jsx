import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { context } from './App'
import Loading from './loading.gif'
const Cart = () => {
    const { details, setDetails, setShowSignupPage , setShowLogout   } = useContext(context)
    const [products, setProducts] = useState([])
    const [qty, setQty] = useState()
    const[loading,setLoading] = useState(true)
    const getData = async () => {
        // console.log('details cart ', details.token)
        setLoading(true)
        const res = await axios.post('https://ecommerce-ashy-ten.vercel.app/api/general/getCart', {}, {
            headers: { Authorization: details.token }
        })

        console.log('res getData', res)

        if(res.data){
         setLoading(false)
         console.log('setLoading(false)')
        }

        if (res.data.msg == 'available') {
            setProducts(res.data.products)
            setQty(res.data.quantities)
        }
        if (res.data.alert == 'jwt expired') {
            setShowSignupPage(true)
            setDetails({ productId: '', userId: '', token: '' })
            setShowLogout(false)
        }
    }

    useEffect(() => {
        if (details.userId != '') {
            getData()
        } else {
            setShowSignupPage(true)
        }

    }, [])

    const removeProductCart = async (ind) => {
        setLoading(true)
        const res = await axios.post(`https://ecommerce-ashy-ten.vercel.app/api/general/removeProductCart/${ind}`, {}, {
            headers: { Authorization: details.token }
        })
        
        if (res.data.alert == 'jwt expired') {
            setShowSignupPage(true)
            setDetails({ productId: '', userId: '', token: '' })
            setShowLogout(false)
        }
        getData()
    }


    const INC = async (ind) => {
        qty[ind].quantity = Number(qty[ind].quantity) + 1
        const res = await axios.post('https://ecommerce-ashy-ten.vercel.app/api/general/updateQuantityCart', { ind, qty: qty[ind].quantity }, {
            headers: { Authorization: details.token }
        })
        if (res.data.alert == 'jwt expired') {
            setShowSignupPage(true)
            setDetails({ productId: '', userId: '', token: '' })
            setShowLogout(false)
        }
        setQty({ ...qty })
    }

    const DEC = async (ind) => {
        if (qty[ind].quantity >= 1) {
            qty[ind].quantity = Number(qty[ind].quantity) - 1
            const res = await axios.post('https://ecommerce-ashy-ten.vercel.app/api/general/updateQuantityCart', { ind, qty: qty[ind].quantity }, {
                headers: { Authorization: details.token }
            })
            if (res.data.alert == 'jwt expired') {
                setShowSignupPage(true)
                setDetails({ productId: '', userId: '', token: '' })
                setShowLogout(false)
            }
            setQty({ ...qty })
        }
    }

    const orderProduct = async (productId) =>{
        // console.log('productId',productId)
        const res = await axios.post(`https://ecommerce-ashy-ten.vercel.app/api/general/orderProduct`,{productId},{
            headers:{Authorization:details.token}
        })
        if (res.data.alert == 'jwt expired') {
            setShowSignupPage(true)
            setDetails({ productId: '', userId: '', token: '' })
            setShowLogout(false)
        }
        // console.log('orderProduct res',res)
    }

    return (
        <>
        <div className='bg-[#f9abaf] h-[100vh] charu overflow-auto scroll py-[10px]'>

            {!loading?
              
                (products.length>0 ?
                (
                    products.map((ele, ind) =>(
                        <div key={ind} className='text-[15px] w-auto flex flex-row items-center justify-around m-[10px] rounded-[10px] py-[10px]' style={{ boxShadow: 'gray 2px 2px 7px 1px' }}>
                            {/* <div className='border border-solid border-gray rounded-[10px] w-[15rem] py-[10px]'><img src={ele.image}  style={{ width: '100%', height: '100%' }} /></div> */}
                            <img src={ele.image} width='140px' className='border border-solid border-[gray] rounded-[10px]' style={{ boxShadow: 'gray 2px 2px 7px 1px' }}/>
                            {/* <div className=' h-[150px] w-[340px] flex flex-row items-center overflow-x-auto overflow-y-hidden'>
                                {products[ind].images.length > 0 &&

                                    products[ind].images.map((link) => (
                                        <>
                                            <img src={link} style={{ width: '140px', height: '140px', margin: '5px' }} />
                                        </>
                                    ))

                                }
                            </div> */}
                            <div className='h-[150px] w-[50px] flex flex-col gap-[20px] justify-center' name="name" ><div>{ele.name}</div><div>₹ {ele.price}</div><div className='flex flex-row   '>
                                <button className=' px-[4px]' onClick={() => { DEC(ind) }}>-</button>
                                <div className=' h-[20px] w-[20px] flex justify-center items-center' name="qty" >{qty[ind].quantity}</div>
                                <button className=' px-[4px]' onClick={() => INC(ind)}>+</button>
                            </div></div>
                            {/* <div className=' h-[150px] w-[150px]' name="dis" >{ele.dis}</div> */}
                            {/* <div className='charu  h-[20px] w-[50px]' name="price" ></div> */}
                            {/* <div className='charu h-[20px] w-[50px]' name="cat" >{ele.cat}</div> */}
                            
                            <button onClick={() => { orderProduct(ele._id) }} className='bg-[#13b754] px-[10px] py-[5px] text-white rounded-[10px]'>Purchase</button>
                            <button onClick={() => { removeProductCart(ind) }} className='bg-[#de3163] px-[10px] py-[5px] text-white rounded-[10px]'>delete</button>
                        </div>

                    )
                    )
                ):
               <h1 className='text-[20px] flex justify-center items-center h-[100vh]'>No Item in Cart</h1> 
                ) :
                ( details.userId ?
                <img src={Loading} width='300px' className='mx-auto'/>
                :
                <div className='text-center text-white text-[30px]'>Please Signup or Login<br/> To Continue to Cart</div>
                )
            }
            </div> 
        </>
    )
}

export default Cart;
