import Reac from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { context } from './App.jsx'
import { useContext } from 'react';
import Loading from './loading.gif'
import Cross from './cross.png'
const Home = () => {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ price_filter: 'All', category_filter: 'All' })
  const { details, setDetails ,showFilter , setShowFilter } = useContext(context)
  const navigate = useNavigate()
  useEffect(() => {

    const getData = async () => {
      const res = await axios.get('https://ecommerce-ashy-ten.vercel.app/api/general/getProducts')
      if (res) {
        setProducts(res.data.products)
      }
    }

    getData()

  }, [])

  const handleFilter = (e) => {

    setFilters({ ...filters, [e.target.name]: e.target.value })
  }



  const addToCart = () => {

  }

  const discoverDetails = (pid) => {
    setDetails({ ...details, productId: pid })
    navigate('/detailPage')
  }

  return (
    <>

      <div className="w-full h-[100vh] py-[-10px] flex justify-around items-center bg-[#f9abaf]">
        <div className="range:hidden flex flex-col justify-center items-center border-r-[1px] border-solid border-white w-[230px] h-[500px]">
          <div className='text-[18px] font-bold'>Price Filter</div>
          <div className='flex justify-around'>
            <div className='price-container flex flex-col pt-[10px]'>
            <div ><input type='radio' name='price_filter' value='All' onChange={(e) => { handleFilter(e) }} /><div>All</div></div>
              <div ><input type='radio' name='price_filter' value='1-100' onChange={(e) => { handleFilter(e) }} /><div>1-100 ₹</div></div>
              <div><input type='radio' name='price_filter' value='100-500' onChange={(e) => { handleFilter(e) }} /><div>100-500 ₹</div></div>
              <div><input type='radio' name='price_filter' value='500-1000' onChange={(e) => { handleFilter(e) }} /><div>500-1000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='1000-5000' onChange={(e) => { handleFilter(e) }} /><div>1000-5000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='5000-10000' onChange={(e) => { handleFilter(e) }} /> <div>5000-10000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='10000-50000' onChange={(e) => { handleFilter(e) }} /><div>10000-50000 ₹</div></div>
            </div>
        
          </div>
          <div className='h-[30px]'></div>
          <div className='text-[18px] font-bold'>Category Filter</div>
        
            <div className='price-container flex flex-col pt-[10px]'>
            <div ><input type='radio' name='category_filter' value='All' onChange={(e) => { handleFilter(e) }} /><div>All</div></div>
              <div ><input type='radio' name='category_filter' value='Health' onChange={(e) => { handleFilter(e) }} /><div>Health ₹</div></div>
              <div><input type='radio' name='category_filter' value='Clothes' onChange={(e) => { handleFilter(e) }} /><div>Clothes ₹</div></div>
              <div><input type='radio' name='category_filter' value='Accessaries' onChange={(e) => { handleFilter(e) }} /><div>Accessaries ₹</div></div>
              <div><input type='radio' name='category_filter' value='Sports' onChange={(e) => { handleFilter(e) }} /><div>Sports ₹</div></div>
              <div><input type='radio' name='category_filter' value='Cosmatics' onChange={(e) => { handleFilter(e) }} /> <div>Cosmatics ₹</div></div>
            </div>
        </div>
<h1>{showFilter}</h1>
        {showFilter &&

        <div className="absolute rounded-[6px] bg-[#2e4964] z-10 left-[0px] top-[0px] px-[20px] py-[20px] flex flex-col" style={{boxShadow:'1px 1px 30px 1px gray'}}>
            <div className='self-end border ' onClick={()=>{setShowFilter(false)}}><img src={Cross} width='30px' className='border-r-[5px] border-white'/></div>
          <div className='text-[18px] text-white font-bold'>Price Filter</div>
          <div className='flex justify-around'>
            <div className='price-container-menu flex flex-col pt-[10px]'>
            <div ><input type='radio' name='price_filter' value='All' onChange={(e) => { handleFilter(e) }} /><div>All</div></div>
              <div ><input type='radio' name='price_filter' value='1-100' onChange={(e) => { handleFilter(e) }} /><div>1-100 ₹</div></div>
              <div><input type='radio' name='price_filter' value='100-500' onChange={(e) => { handleFilter(e) }} /><div>100-500 ₹</div></div>
              <div><input type='radio' name='price_filter' value='500-1000' onChange={(e) => { handleFilter(e) }} /><div>500-1000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='1000-5000' onChange={(e) => { handleFilter(e) }} /><div>1000-5000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='5000-10000' onChange={(e) => { handleFilter(e) }} /> <div>5000-10000 ₹</div></div>
              <div><input type='radio' name='price_filter' value='10000-50000' onChange={(e) => { handleFilter(e) }} /><div>10000-50000 ₹</div></div>
            </div>
        
          </div>
          <div className='h-[30px]'></div>
          <div className='text-[18px] text-white font-bold'>Category Filter</div>
        
            <div className='price-container-menu flex flex-col pt-[10px]'>
            <div ><input type='radio' name='category_filter' value='All' onChange={(e) => { handleFilter(e) }} /><div>All</div></div>
              <div ><input type='radio' name='category_filter' value='Health' onChange={(e) => { handleFilter(e) }} /><div>Health ₹</div></div>
              <div><input type='radio' name='category_filter' value='Clothes' onChange={(e) => { handleFilter(e) }} /><div>Clothes ₹</div></div>
              <div><input type='radio' name='category_filter' value='Accessaries' onChange={(e) => { handleFilter(e) }} /><div>Accessaries ₹</div></div>
              <div><input type='radio' name='category_filter' value='Sports' onChange={(e) => { handleFilter(e) }} /><div>Sports ₹</div></div>
              <div><input type='radio' name='category_filter' value='Cosmatics' onChange={(e) => { handleFilter(e) }} /> <div>Cosmatics ₹</div></div>
            </div>
        </div>
}
{/* w-[900px] h-[500px] */}
        <div className="charu h-[100vh] w-full flex flex-row flex-wrap justify-around justify-first overflow-auto scroll px-[20px]">


          {products.length > 0 ?
            (
              products.map((ele,ind) => (

                (
                  (filters.category_filter == 'All' || ele.cat == filters.category_filter) &&
                  (filters.price_filter == 'All' || (
                    Number(filters.price_filter.split('-')[0]) <= ele.price &&
                    ele.price <= Number(filters.price_filter.split('-')[1])
                  )
                  )
                )
                && (

                  <div key={ind} className=" rounded-[10px] text-[20px] product-card bg-[#f9abaf] shadow-md rounded cursor-pointer transform transition-transform duration:300 hover:scale-110 w-[200px] h-[270px] p-[20px] my-[10px] flexRow" onClick={() => discoverDetails(ele._id)}>
                    <img src={ele.image} alt="image" className="w-[150px] h-[150px]" />
                    <div>
                      <div className="max-h-[30px] justify-content-center overflow-hidden text-font-medium text-gray-900 ">{ele.name}</div>
                      <div className="text-gray-700">
                        <span className="font-bold">₹{ele.price}</span>
                      </div>
                      <div className='flex flex-row'>
 <span className="max-h-[30px] flex flex-row justify-content-center max-w-[220px] overflow-hidden text-gray-600">{ele.dis}</span>
                        </div>
                     
                    </div>
                  </div>
                )



              ))
            ) :
            (
              <img src={Loading} width='300px' className='m-auto'/>
            )
          }

        </div>


      </div>
    </>
  )
}

export default Home;