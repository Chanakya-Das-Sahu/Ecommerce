import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { store } from './store';
import cross from './delete.png'
const UpdateProduct = () => {
    const [product, setProduct] = useState('')
   const navigate = useNavigate();
    const id = store.getState().product.product.productId
    console.log(id)
    //    useEffect(()=>{
    //  setId(store.getState().product.product.productId)
    //    console.log("outer",id)
    //    },[])
    useEffect(() => {

        const getData = async () => {


            const res = await axios.get(`http://localhost:3000/api/general/getProduct/${id}`)
            console.log(res)
            setProduct(res.data)
        }

        getData()

    }, [])

    const changeProductDetail = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const updateProductDetails = async () => {
        const res = await axios.post('http://localhost:3000/api/admin/updateProduct', product)
    }

    const updateImage = () => {
        
        
    //    updateProductDetails()
    }

    const deleteImages = async (index) => {
        console.log('index', index)
        const imgs = product.images.filter((num, ind) => {
            return ind !== index
        })


        setProduct((prev) => ({ ...prev, images: [...imgs] }))
        //  console.log(product.images)
        //  updateProductDetails()
        //  const res = await axios.get(`http://localhost:3000/api/general/getProduct/${id}`)
        // //  console.log(res)
        //  setProduct(res.data)
    }

    const imageUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'chanakya-sahu')
        const res = await axios.post('https://api.cloudinary.com/v1_1/dn4trwbmw/image/upload', formData)
        setProduct({ ...product, image: res.data.secure_url })
    }

    const imageUploads = async (e)=>{
        
        const formData = new FormData() 
        const files = e.target.files
        console.log('files',files)
        
        for(let i=0 ; i<files.length ; i++){
           formData.append('file',files[i])
           formData.append('upload_preset','chanakya-sahu')
           const res = await axios.post('https://api.cloudinary.com/v1_1/dn4trwbmw/image/upload', formData)
           setProduct((prev)=>({...prev,images:[...prev.images,res.data.secure_url]}))
        }
        
        // formData.append('file',files[0])
        // formData.append('upload_present','chanakya-sahu')
        // const res = await axios.post('https://api.cloudinary.com/v1_1/dn4trwbmw/image/upload', formData)
    
    }

    useEffect(() => {
        const apiFire = async () => {
            updateProductDetails()
            console.log('product.image',product.image)
        }
        apiFire()
    }, [product])

    return (
        <>
            {product == '' ?
                <>
                    <p>Loading</p>
                </> :
                <>
                    <div className='border border-solid border-black w-auto h-[160px] flex flex-row items-center justify-around m-[10px]'>
                       
                              
                                <div className='charu h-[150px] w-[150px]'><img src={product.image} style={{ width: '100%', height: '100%' }} /></div>
                                {/* <img src={cross} style={{ width: '20px', position: 'relative', bottom: '1px', right: '0px' }} onClick={updateImage} /> */}
                         
                        <div className='charu h-[150px] w-[340px] flex flex-row items-center overflow-x-auto overflow-y-hidden'>
                            {product.images.length > 0 ?
                                product.images.map((link, index) => (
                                    // console.log(link)
                                    <>
                                        <img src={link} style={{ width: '140px', height: '140px', margin: '5px' }} />
                                        <img src={cross} style={{ width: '20px', position: 'relative', bottom: '1px', right: '0px' }} onClick={() => { deleteImages(index) }} />
                                    </>
                                ))
                                :
                                <h1>No Images</h1>
                            }

                        </div>
                        <input className='charu h-[150px] w-[150px]' name="name" onChange={(e) => { changeProductDetail(e) }} value={product.name}></input>
                        <input className='charu h-[150px] w-[150px]' name="dis" onChange={(e) => { changeProductDetail(e) }} value={product.dis}></input>
                        <input className='charu h-[20px] w-[60px]' name="price" onChange={(e) => { changeProductDetail(e) }} value={product.price}></input>
                       <input className='charu h-[20px] w-[60px]' name="cat" onChange={(e) => { changeProductDetail(e) }} value={product.cat}></input>
                        <input className='charu h-[20px] w-[60px]' name="qty" onChange={(e) => { changeProductDetail(e) }} value={product.qty}></input>
                        
                        <button onClick={() => { navigate('/adminConsole')}}>Update</button>
                    </div>

                    <input type='file' name='image' className='border border-solid border-black ' onChange={(e)=>{imageUpload(e)}} />
                    <input type='file' name='images' className='border border-solid border-black ' multiple onChange={(e)=>{imageUploads(e)}} />

                </>
            }
        </>
    )
}

export default UpdateProduct;