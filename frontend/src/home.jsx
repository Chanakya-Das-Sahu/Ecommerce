import Reac from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {context} from './App.jsx'
import { useContext } from 'react';
const Home = () => {
  const [products, setProducts] = useState([])
  const [filters , setFilters] = useState({price_filter:'All',category_filter:'All'})
  const{details,setDetails} = useContext(context)
  const navigate = useNavigate()
  useEffect(() => {

    const getData = async () => {
      const res = await axios.get('http://localhost:3000/api/general/getProducts')
      console.log('res', res)
      if (res) {
        setProducts(res.data.products)
      }
    }

    getData()

  }, [])

  const handleFilter = (e) =>{
   
    setFilters({...filters,[e.target.name]:e.target.value})
  }


 
  const addToCart = () =>{

  }

  const discoverDetails = (pid) =>{
     setDetails({...details,productId:pid})
     navigate('/detailPage')
  }
  
  return (
    <>  
    
      {/* <Navbar/> */}
      <div className=" w-full h-[600px] flex justify-around items-center">
        <div className="flex flex-col items-center border  border-solid border-black w-[230px] h-[500px]">
          <div className='text-[18px] font-bold'>Price Filter</div>
          <div className=' flex flex-rows  justify-around w-[120px]'>
            <div className='w-[20px] h-[100px]'>
              <input type='radio' name='price_filter' value='All' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='price_filter' value='1-100' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='price_filter' value='100-500'onChange={(e)=>{handleFilter(e)}} />
              <input type='radio' name='price_filter' value='500-1000' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='price_filter' value='1000-5000'onChange={(e)=>{handleFilter(e)}} />
              <input type='radio' name='price_filter' value='5000-10000' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='price_filter' value='10000-50000'onChange={(e)=>{handleFilter(e)}} />
            </div>
            <div className='flex flex-col justify-around  w-[80px] h-[100px] gap-[1.5px]'>
              <div>All</div>
              <div>1-100 $</div>
              <div>100-500 $</div>
              <div>500-1000 $</div>
              <div>1000-5000 $</div>
              <div>5000-10000 $</div>
              <div>10000-50000 $</div>
            </div> 
          </div>
          <div className='h-[30px]'></div>
          <div className='text-[18px] font-bold'>Category Filter</div>
          <div className=' flex flex-rows  justify-around w-[120px]'>
            <div className='flex flex-col justify-around  w-[20px] h-[110px]'>
              <input type='radio' name='category_filter' value='All' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='category_filter' value='Health' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='category_filter' value='Clothes' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='category_filter' value='Accessaries' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='category_filter' value='Sports' onChange={(e)=>{handleFilter(e)}}/>
              <input type='radio' name='category_filter' value='Cosmatics' onChange={(e)=>{handleFilter(e)}}/>
            </div>
            <div>
              <div>All</div>
              <div>Health</div>
              <div>Clothes</div>
              <div>Accessaries</div>
              <div>Grocessary</div>
              <div>Sports</div>
              <div>Cosmatics</div>
            </div>
          </div>
        </div>
        <div className="border border-solid border-black w-[680px] h-[500px] flex flex-row flex-wrap overflow-auto ">


          {products.length > 0 ?
            (
              products.map((ele) => (

( 
  (filters.category_filter=='All' || ele.cat==filters.category_filter) && 
  (filters.price_filter=='All' ||  (
    Number(filters.price_filter.split('-')[0])<=ele.price &&
    ele.price<=Number(filters.price_filter.split('-')[1])
  )  
)
)
&& (
  
                <div className='border border-solid border-black w-[200px] h-[200px] m-[10px]' onClick={()=>{discoverDetails(ele._id)}}>
                  {/* {console.log('filter',filters.price_filter,filters.price_filter.split('-')[0],Number(filters.price_filter.split('-')[0])<=ele.price)} */}
                 <img src={ele.image} style={{width:'80%' , height:'80%'}} alt='image' className='mx-auto border border-solid border-black'/>
                 <div>{ele.name}</div>
                 <div>{ele.amt}</div>
                 <div>{ele.dis}</div>
                 <button onClick={addToCart}>Add To Cart</button>
                </div>
              )



              ))
            ) :
            (
              <h2>Hello</h2>
            )
          }

        </div>

      </div>
    </>
  )
}

export default Home;