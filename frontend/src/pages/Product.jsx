import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';


const Product = () => {

  const { productId } = useParams();
  const {products,currancy,addToCart} = useContext(ShopContext);
  const [productData,setProductData]=useState(false);
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')

  const fetchProductData = async () => {
   
    
    products.forEach(item => { 
      
      
      if (item._id === productId) {
        setProductData(item);
        
        setImage(item.image[0]);
 
     
        
        return null; 
      }
    });
  };
  

  useEffect(()=>{
    fetchProductData();
  },[productId])
  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
       <div className='flex-1  flex flex-col-reverse gap-3 sm:flex-row'>
        <div className=' flex  sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
        {
          productData.image.map((item,index)=>(
            <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0  cursor-pointer'  alt="" />
          ))
        }
        </div>
        <div className='w-full sm:[80%]'>
          <img className='w-[80%] h-auto cursor-pointer' src={image} alt="" />
        </div>
       </div>
       <div className='flex-1'>
         <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
         <div className='flex items-center gap-2 mt-2'>
           <img src={assets.star_icon} alt="" className="w-3" />
           <img src={assets.star_icon} alt="" className="w-3" />
           <img src={assets.star_icon} alt="" className="w-3" />
           <img src={assets.star_icon} alt="" className="w-3" />
           <img src={assets.star_dull_icon} alt="" className="w-3" />
           <p className='pl-2'>(122)</p>
         </div>
         <p className='font-medium mt-5 text-5xl'>{currancy}{productData.price}</p>
         <p className='mt-10 text-gray-500 md:w-4/5'>{productData.description}</p>
         <div className='flex flex-col gap-10 my-8'>
          <p>SELECT SIZE</p>
          <div className='flex gap-2'>
           {
            productData.sizes.map((item,index)=>(
              <button onClick={()=>setSize(item)} className={`border px-4 py-2 bg-gray-100 ${item === size ? 'bg-orange-500' : '' }`} key={index}>{item} </button>
              
            ))
           }
          </div>
       

         </div>
         <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
         <hr className='mt-8 sm:w-4/5'/>
         <div className='text-sm text-gray-600 mt-2 flex flex-col gap-1'>
             <p>100% Orignal Product .</p>
             <p>Cash On Delivery Is Avalable On This Products. </p>
             <p>Easy Return And Exachange Policy Within 7 Days. </p>
         </div>
       </div>
  
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Descripshion</b>
          <p className='border px-5 py-3 text-sm'>Revies(122)</p>

        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
           <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>

       </div>
       <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ): <div className='opacity-0'></div>
}

export default Product
