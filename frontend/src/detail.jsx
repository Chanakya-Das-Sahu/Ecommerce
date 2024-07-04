import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { context } from './App'
import { useContext } from 'react'
const Detail = () => {
    const [product, setProduct] = useState('')
    const { details, setDetails , setShowSignupPage} = useContext(context)
    useEffect(() => {

        const getData = async () => {
            console.log('details', details)
            const res = await axios.get(`http://localhost:3000/api/general/getProduct/${details.productId}`)
            console.log('detail', res)
            setProduct(res.data)
        }

        getData()
    }, [])

    const addToCart = async () => {
        console.log('details.userId',details)
        if(details.userId!=''){
          const cartData = {productId:details.productId,qty:'1'}
    
        const res =  await axios.post('http://localhost:3000/api/general/addToCart',cartData,{
            headers:{ Authorization : details.token }
        })
        console.log('cart',res.data)
        }else{
          setShowSignupPage(true)
        }
       
      }

    const purchase = () =>{

    }

    return (
        <>
            <div className='px-[30px] charu'>
                <h1>Detail</h1>
                {product != '' ?
                    <>
                        <div className='gap-[10px] flex flex-row border justify-around text-[3rem]'>

                            <div className='charu flex flex-col gap-[20px] items-center justify-center flex-wrap'>
                                <div className='charu flex flex-row px-[100px]'>
                                    <img src={product.image} width='500px' height='20px' alt='photo' className='charu' />
                                </div>

                                <div className='charu flex flex-row'>
                                    {product.images.length > 0 ?
                                        <>
                                            
                                            {product.images.map((ele)=>(
                                           <img src={ele} width='300px'/>
                                         ))
                                        }
                                        </>
                                        :
                                        <>

                                        </>
                                    }
                                </div>
                            </div>



                            <div className='border border-solid border-black'>
                                <div><b>Product :    </b>{product.name}</div>
                                <div><b>Discription : </b>{product.dis}</div>
                                <div><b>Price : </b>{product.price}</div>
                                <div><b>Category :</b>{product.cat}</div>
                                <div><b>Quantity Available : </b>{product.qty}</div>
                                <button onClick={addToCart} class='charu mx-[20px] px-[10px]'>Add To Cart</button>
                                <buton onClick={purchase} class='charu px-[10px]'>Purchase</buton>
                            </div>

                        </div>
                        {/* <div className='flex flex-row'>
                        {product.images.length > 0 ?
                            <>
                         { product.images.map((ele,ind)=>(
                            <>
                             {ind!=0 &&
                            <img src={ele} width='200px' alt='photos'/>
                             }
                            </>
                         ))

                         }
                           
                            </>
                            :
                            <>

                            </>
                        }
                    </div> */}
                    </>
                    :
                    <>
                        <h3>Loading...</h3>
                    </>

                }

            </div>
        </>
    )
}

export default Detail 