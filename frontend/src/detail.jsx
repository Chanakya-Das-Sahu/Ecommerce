import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { context } from './App'
import { useContext } from 'react'
import Loading from './loading.gif'
const Detail = () => {
    const [product, setProduct] = useState('')
    const { details, setDetails, setShowSignupPage } = useContext(context)
    const [cartBool, setCartBool] = useState('Add To Cart')
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        const getData = async () => {

            const res = await axios.get(`https://ecommerce-ashy-ten.vercel.app/api/general/getProduct/${details.productId}`)
            console.log('detail', res)
            setProduct(res.data)
            if (details.userId === '') {
                setLoading(false)
            }

        }

        const checkProductInCart = async () => {
            console.log('checkProductInCart')
            const res = await axios.post(`https://ecommerce-ashy-ten.vercel.app/api/general/checkProductInCart/${details.productId}`, {}, {
                headers: { Authorization: details.token }
            })
            console.log('check', res)

            if (res.data) {
                setLoading(false)
            }

            if (res.data.msg) {
                setCartBool('Added To Cart')
                setLoading(false)
            }

        }

        getData()
        if (details.userId) {
            checkProductInCart()
        }



    }, [])

    const addToCart = async () => {
        if (details.userId !== '') {
            const cartData = { productId: details.productId, qty: '1' }
            setCartBool('Added To Cart')
            const res = await axios.post('https://ecommerce-ashy-ten.vercel.app/api/general/addToCart', cartData, {
                headers: { Authorization: details.token }
            })



        } else {
            setShowSignupPage(true)
        }

    }

    const purchase = () => {

    }

    return (
        <>
            <div className="  product-details px-10 py-[30px] bg-[#f9abaf] range:flex range:justify-center range">
                {loading ?
                    (
                        <img src={Loading} width='200px' className='m-auto my-[200px]' />
                    ) :
                    (
                        <>
                            <div className="">
                                <div className=" flex items-center justify-center flex-wrap gap-[50px]">
                                    <div className="overflow-hidden rounded-lg">
                                        <img
                                            src={product.image}
                                            alt="Product photo"
                                            width='450rem'
                                            className="object-cover"
                                        />
                                    </div>


                                    <div className="flex flex-col text-[3rem]">
                                        <div>
                                            <h3 className="">Product:</h3>
                                            <p className="text-gray-700">{product.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="">Description:</h3>
                                            <p className="text-gray-700">{product.dis}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="">Price:</h3>
                                                <p className="text-gray-700">{product.price}</p>
                                            </div>
                                            <div>
                                                <h3 className="">Category:</h3>
                                                <p className="text-gray-700">{product.cat}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="">Quantity Available:</h3>
                                            <p className="text-gray-700">{product.qty}</p>
                                        </div>
                                        <div className="flex gap-[10px] justify-between">

                                            <button
                                                onClick={addToCart}
                                                className="h-auto text-center px-[10px] bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >{cartBool}
                                            </button>



                                            <button
                                                onClick={purchase}
                                                className="h-[50px] text-center bg-green-500 text-white  px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                Purchase
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                                     <br/>                   

                                     {product.images && (
                                        <div className=' h-[400px] w-full flex justify-start gap-[20px] p-[20px] overflow-x-auto scroll'>
                                        {product.images.map((ele) => (
                                            <img
                                                key={ele}
                                                src={ele}
                                                alt="Product image"
                                                width='300px'
                                                className=""
                                            />
                                        ))}
                                       </div>
                                )}
                               
                            </div>
                        </>
                    )}
            </div>

        </>
    )
}

export default Detail 