import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { context } from './App'
import { useContext } from 'react'
const Detail = () => {
    const [product, setProduct] = useState('')
    const { details, setDetails, setShowSignupPage } = useContext(context)
    const [cartBool, setCartBool] = useState('Add To Cart')
    useEffect(() => {

        const getData = async () => {
            // console.log('details', details)
            const res = await axios.get(`https://chanakya-ecom.onrender.com/api/general/getProduct/${details.productId}`)
            // console.log('detail', res)
            setProduct(res.data)
        }

        const checkProductInCart = async () => {
            const res = await axios.post(`https://chanakya-ecom.onrender.com/api/general/checkProductInCart/${details.productId}`, {}, {
                headers: { Authorization: details.token }
            })
            if (res.data.alert == 'jwt expired') {
                setShowSignupPage(true)
                setDetails({ productId: '', userId: '', token: '' })
                setShowLogout(false)
            }
            if (res.data.msg) {
                setCartBool('Added To Cart')
            }
        }
       
        getData()
        checkProductInCart()

    }, [])

    const addToCart = async () => {
        // console.log('details.userId', details)
        if (details.userId != '') {
            const cartData = { productId: details.productId, qty: '1' }

            const res = await axios.post('https://chanakya-ecom.onrender.com/api/general/addToCart', cartData, {
                headers: { Authorization: details.token }
            })
            if (res.data.alert == 'jwt expired') {
                setShowSignupPage(true)
                setDetails({ productId: '', userId: '', token: '' })
                setShowLogout(false)
            }
            // console.log('cart', res.data)
            setCartBool('Added To Cart')
        } else {
            setShowSignupPage(true)
        }

    }

    const purchase = () => {

    }

    return (
        <>

            <div className="product-details px-10">  
                <h1 className="text-3xl font-bold mb-6">Detail</h1>  
                {product !== '' ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
                            <div className="flex flex-col items-center justify-center"> 
                                <div className="w-full overflow-hidden rounded-lg">  
                                    <img
                                        src={product.image}
                                        alt="Product photo"
                                        className="w-full h-full object-cover"
                                    /> 
                                </div>
                                {product.images.length > 0 && (
                                    <div className="mt-4 flex space-x-4">  
                                        {product.images.map((ele) => (
                                            <img
                                                key={ele}
                                                src={ele}
                                                alt="Product image"
                                                className="w-32 h-32 object-cover rounded-lg border border-gray-200 h-full w-full"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col space-y-4 text-[25px]"> 
                                <div>
                                    <h3 className="text-xl font-medium mb-2">Product:</h3>
                                    <p className="text-gray-700">{product.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium mb-2">Description:</h3>
                                    <p className="text-gray-700">{product.dis}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Price:</h3>
                                        <p className="text-gray-700">{product.price}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Category:</h3>
                                        <p className="text-gray-700">{product.cat}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium mb-2">Quantity Available:</h3>
                                    <p className="text-gray-700">{product.qty}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        onClick={addToCart}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {cartBool}
                                    </button>
                                    <button
                                        onClick={purchase}
                                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Purchase
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <h3 className="text-xl font-medium text-gray-500">Loading...</h3> 
  )}
            </div>

        </>
    )
}

export default Detail 