import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Tittle';

import ProductIteam from './ProductIteam';

const RelatedProduct = ({category, subCategory}) => {
    const {products}=useContext(ShopContext);
    const [releted, setReleted]=useState([]);

    useEffect(() => {
        if (products.length > 0) {

            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> category === item.category);
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory);
            setReleted(productsCopy.slice(0,5));
            
        }
    }, [products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
         <Tittle text1={'RELATED'} text2={'PRODUCT'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
         {
            releted.map((item,index)=>(
                <ProductIteam key={index} id={item.id} name={item.name} price={item.price} image={item.image} />
            ))
         }
        </div>
      
    </div>
  )
}

export default RelatedProduct


