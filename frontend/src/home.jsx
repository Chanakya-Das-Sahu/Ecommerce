import Reac from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
// import Navbar from './navbar.jsx'
const Home = () => {
  const [products, setProducts] = useState([])
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

  const addToCart = () =>{

  }
  return (
    <>
      {/* <Navbar/> */}
      <div className=" w-full h-[600px] flex justify-around items-center">
        <div className="flex flex-col items-center border  border-solid border-black w-[230px] h-[500px]">
          <div className='text-[18px] font-bold'>Price Filter</div>
          <div className=' flex flex-rows  justify-around w-[120px]'>
            <div className='flex flex-col justify-around  w-[20px] h-[100px]'>
              <input type='radio' name='price-filter' value='' />
              <input type='radio' name='price-filter' value='' />
              <input type='radio' name='price-filter' value='' />
              <input type='radio' name='price-filter' value='' />
              <input type='radio' name='price-filter' value='' />
              <input type='radio' name='price-filter' value='' />
            </div>
            <div className='flex flex-col justify-around  w-[80px] h-[100px]'>
              <div>All</div>
              <div>1-100 $</div>
              <div>1-500 $</div>
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
              <input type='radio' name='category-filter' value='Clothes' />
              <input type='radio' name='category-filter' value='Clothes' />
              <input type='radio' name='category-filter' value='Cosmatics' />
              <input type='radio' name='category-filter' value='Sports' />
              <input type='radio' name='category-filter' value='Accessaries' />
              <input type='radio' name='category-filter' value='Home' />
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
        <div className="border border-solid border-black w-[680px] h-[500px] flex flex-row ">


          {products.length > 0 ?
            (
              products.map((ele) => (
                <div className='border border-solid border-black
            w-[200px] h-[200px] m-[10px]'>
                 <img src={ele.image} style={{width:'80%' , height:'80%'}} alt='image' className='mx-auto border border-solid border-black'/>
                 <div>{ele.name}</div>
                 <div>{ele.amt}</div>
                 <div>{ele.dis}</div>
                 <button onClick={addToCart}>Add To Cart</button>
                </div>
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