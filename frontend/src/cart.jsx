import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { context } from './App'
const Cart = () => {
    const { details, setDetails, setShowSignupPage , setShowLogout   } = useContext(context)
    const [products, setProducts] = useState([])
    const [qty, setQty] = useState()
    const getData = async () => {
        // console.log('details cart ', details.token)
        const res = await axios.post('https://ecommerce-ashy-ten.vercel.app/api/general/getCart', {}, {
            headers: { Authorization: details.token }
        })

        // console.log('res getData', res)
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
            {products.length>0?
                (
                    products.map((ele, ind) => (
                        <div key={ind} className='w-auto h-[160px] flex flex-row items-center justify-around m-[10px] rounded-[10px]' style={{ boxShadow: 'gray 2px 2px 7px 1px' }}>
                            <div className=' h-[150px] w-[150px]'><img src={ele.image} style={{ width: '100%', height: '100%' }} /></div>
                            <div className=' h-[150px] w-[340px] flex flex-row items-center overflow-x-auto overflow-y-hidden'>
                                {products[ind].images.length > 0 &&

                                    products[ind].images.map((link) => (
                                        <>
                                            <img src={link} style={{ width: '140px', height: '140px', margin: '5px' }} />
                                        </>
                                    ))

                                }
                            </div>
                            <div className=' h-[150px] w-[150px]' name="name" >{ele.name}</div>
                            <div className=' h-[150px] w-[150px]' name="dis" >{ele.dis}</div>
                            <div className=' h-[20px] w-[60px]' name="price" >₹ {ele.price}</div>
                            <div className=' h-[20px] w-[60px]' name="cat" >{ele.cat}</div>
                            <div className='flex flex-row '>
                                <button className=' px-[4px]' onClick={() => { DEC(ind) }}>-</button>
                                <div className=' h-[20px] w-[20px] flex justify-center items-center' name="qty" >{qty[ind].quantity}</div>
                                <button className=' px-[4px]' onClick={() => INC(ind)}>+</button>
                            </div>
                            <button onClick={() => { orderProduct(ele._id) }}>Purchase</button>
                            <button onClick={() => { removeProductCart(ind) }}>delete</button>
                        </div>

                    )
                    )

                ) :
                ( details.userId!==''?
                <h1>Loading...</h1>
                 :
                <h1>Please ! get into your account to explore Cart.</h1>
                )
            }
        </>
    )
}

export default Cart;
