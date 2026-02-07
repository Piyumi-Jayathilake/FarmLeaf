import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaUser, FaUserPlus } from 'react-icons/fa';
import { iconClass, inputBase } from '../../assets/dummydata';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:4000';
const Login = ({onLoginSuccess, onclose}) => {
  const [showToast, setShowToast] = useState({visible:false, message:'',isError: false});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({username:'',password:'',rememberMe: false});

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) || {};
        setFormData(prev => ({
          ...prev,
          username: parsed.username ?? '',
          password: parsed.password ?? '',
          rememberMe: !!parsed.rememberMe
        }));
      } catch (e) {
        console.warn('Invalid loginData in localStorage');
      }
    }
  },[]);

  const handleSubmit = async e =>{
    e.preventDefault();
   try{
   const res = await axios.post(`${url}/api/user/login`, {
  identifier: formData.username,
  password: formData.password
});

    console.log('Axios Response:', res);
    if(res.status === 200 && res.data.success && res.data.token){
        localStorage.setItem('authToken', res.data.token);
        //REMEMBER ME FUNCTIONALITY
        formData.rememberMe ? localStorage.setItem('loginData', JSON.stringify(formData))
        : localStorage.removeItem('loginData');
        setShowToast({visible:true, message:'Login Successful!', isError:false});
        setTimeout(() => {
          setShowToast({visible:false, message:'', isError:false});
          onLoginSuccess(res.data.token);
        }, 1500)
        
    }
    else{
      console.warn('Unexpected response:', res.data)
      throw new Error(res.data.message || 'Login Failed');
    }

   }catch(err){
    console.error('Login Error:', err);
    if(err.response){
      console.error('Server Response:', err.response.data);
    }
    const msg = err.response?.data?.message || err.message || 'Login Failed';
    setShowToast({visible:true, message: msg, isError:true});  
    setTimeout(() => {
      setShowToast({visible:false, message:'', isError:false});
    }, 2000)

   }
  }
  const handleChange = ({target: { name,value,type,checked}}) =>
    setFormData(prev => ({...prev,[name]:type === 'checkbox' ? checked : value}));
  const toggleShowPassword = ()=> setShowPassword(prev => !prev);

  return (
    <div className='space-y-6 relative font-[Playfair_Display]'>
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300
        ${showToast.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
          <div className={`px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm ${showToast.isError ? 'bg-red-600 text-[#f6c4c4]' : 'bg-green-600 text-[#d6f6c4]'}`}>
            <FaCheckCircle className='flex-shrink-0'/>
            <span className='font-[Playfair_Display]'>{showToast.message}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='relative font-[Playfair_Display]'>
            <FaUser className={iconClass}/>
            <input type='text' id='username' name='username' placeholder='Username' value={formData.username}
            onChange={handleChange} className={`${inputBase} pl-10 pr-4 py-3`} autoComplete='username' required />
          </div>
          <div className='relative font-[Playfair_Display] '>
            <FaLock className={iconClass}/>

            <input 
            type={showPassword ? 'text' : 'password'} 
            required 
            id='password' 
            name='password' 
            placeholder='Password' 
            value={formData.password}
            onChange={handleChange} 
            className={`${inputBase} pl-10 pr-4 py-3`} 
            autoComplete='current-password'/>
            <button type='button' onClick={toggleShowPassword} className='absolute right-3
            top-1/2 transform -translate-y-1/2 text-[#d6f6c4] font-[Playfair_Display] '>
              {showPassword ? <FaEyeSlash /> : <FaEye/>}
            </button>
          </div>
          <div className='flex items-center'>
            <label htmlFor='rememberMe' className='flex items-center'>
              <input type='checkbox' id='rememberMe' name='rememberMe' checked={formData.rememberMe} onChange={handleChange}
              className='form-checkbox h-5 w-5 text-[#d6f6c4]  bg-[#024406] border-[#014a06] rounded
              focus:ring-[#048b0b]'/>
              <span className='ml-2 text-[#d6f6c4] font-[Playfair_Display]'>Remember Me</span>
            </label>
          </div>
          <button className='w-full py-3 bg-gradient-to-r from-[#048b0b] to-[#04720b] text-[#d6f6c4] font-bold
          rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform font-[Playfair_Display] '>
            Sign In <FaArrowRight/>
          </button>
        </form>
        <div className='text-center'>
          <Link to='/signup' onClick={onclose} className='inline-flex items-center gap-2
          text-[#d6f6c4] hover:text-[#ccf9b2] transition-colors font-[Playfair_Display] '>
            <FaUserPlus /> Create New Account 
          </Link>
        </div>
    </div>
  )
}

export default Login