import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token,setToken, navigate, backendUrl } = useContext(ShopContext); // Destructure correctly

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === 'Sign up') {
        // Sign up API call
        response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
      
        
      } else {
        // Login API call
        response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        console.log(response.data);
      }

      // Handle response
      if (response.data.success) {
        setToken(response.data.token); // Set the token in context
        localStorage.setItem('token', response.data.token); // Store the token in localStorage
        toast.success(currentState === 'Sign up' ? 'Registration successful!' : 'Login successful!');
        navigate('/'); // Navigate after successful login/registration
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.error(error);
      toast.error(error.response ? error.response.data.message : error.message); // Improved error handling
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     navigate('/')
  //   }
  // },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] cursor-pointer sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
      />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget your Password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        )}
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState}</button>
    </form>
  );
};

export default Login;
