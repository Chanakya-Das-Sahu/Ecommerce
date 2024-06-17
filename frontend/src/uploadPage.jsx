import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import image from './world.jpg'

const uploadPage = () => {
    const [details, setDetails] = useState({ name: '', image: '', dis: '', images: [], price: '' , cat :'', qty : '' })
    const [images, setImages] = useState([])
    const navigate = useNavigate() ;
    
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'chanakya-sahu')
        const res = await axios.post('https://api.cloudinary.com/v1_1/dn4trwbmw/image/upload', formData)
        // console.log(res)
        setDetails({ ...details, image: res.data.secure_url })
    }

    const handleFileUploads = (e) => {

        const files = e.target.files


        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i])
            formData.append('upload_preset', 'chanakya-sahu')
            const getData = async () => {
                const res = await axios.post('https://api.cloudinary.com/v1_1/dn4trwbmw/image/upload', formData)
                // setImages([...images,res.data.secure_url])
                // details.images.push(res.data.secure_url)
                setDetails((prev)=>({...prev,images:[...prev.images,res.data.secure_url]}))
                // details.images.push(res.data.secure_url) 
                // console.log(details)
            }
            getData()
        }
    }

    const upload = async () =>{
      console.log(details)
     const res = await axios.post('http://localhost:3000/api/admin/uploadProduct',details)
     
     if(res.data.msg){
     navigate('/adminConsole')
     }
    }

    return (
        <>
            {details.image ?
                <img src={details.image} alt="image" width="300px" />
                :
                <input className='charu' type='file' name='image' onChange={(e) => { handleFileUpload(e) }} />

            }

            {details.images.length > 0 ?
                details.images.map((link) => (
                    <img src={link} alt="" width="300px" />
                ))
                :
                <input className='charu' type='file' multiple name='images' onChange={(e) => { handleFileUploads(e) }} />
            }
            {/* {console.log("length", details.images.length)} */}
            <input className='charu' type='text' name='name' value={details.name} onChange={(e) => { setDetails({ ...details, [e.target.name]: e.target.value }) }} />
            <input className='charu' type='text' name='dis' value={details.dis} onChange={(e) => { setDetails({ ...details, [e.target.name]: e.target.value }) }} />
            <input className='charu' type='text' name='price' value={details.price} onChange={(e) => { setDetails({ ...details, [e.target.name]: e.target.value }) }} />
            <input className='charu' type='text' name='cat' value={details.cat} onChange={(e) => { setDetails({ ...details, [e.target.name]: e.target.value }) }} />
             <input className='charu' type='text' name='qty' value={details.qty} onChange={(e) => { setDetails({ ...details, [e.target.name]: e.target.value }) }} />
            <button onClick={upload} className='border border-solid border-black'>Submit</button>
        </>
    )
}

export default uploadPage;