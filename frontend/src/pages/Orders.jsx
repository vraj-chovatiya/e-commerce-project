import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from '../components/Tittle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

  const { backendUrl, token, currancy } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = []

        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['Date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse());
        // console.log("ads",setOrderData);
      }

    } catch (error) {

    }

  }
  useEffect(() => {
    loadOrderData();
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-9'>
        <Tittle text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} alt={item.name} className='w-16 sm:w-20' />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>{currancy}{item.price}</p>
                    <p>Quantity:  {item.quantity}</p> {/* Assuming item has a quantity property */}
                    <p>Size:{item.size}</p> {/* Assuming item has a size property */}
                  </div>
                  <p className='mt-3'>
                    Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span> {/* Dynamic order date */}
                  </p>
                  <p className='mt-3'>
                    paymentMethod: <span className='text-gray-500'>{item.paymentMethod}</span> {/* Dynamic order date */}
                  </p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button  
                  className='border py-2 px-4 text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors'
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
