import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const url = 'http://localhost:4000';

const AwesomeToast =({message,icon}) =>(
    <div className='animate-slide-in fixed bottom-6 right-6 flex items-center bg-gradient-to-br from-[#048b0b] to-[#04720b]
    px-6 py-4 rounded-lg shadow-lg border-2 border-[#014a06]/20'>
        <span className='text-2xl mr-3 text-[#d6f6c4]'>{icon}</span>
        <span className='font-semibold text-[#d6f6c4]'>{message}</span>
    </div>
)

const SignUp = () => {
      const [showToast, setShowToast] = useState({visible:false,message:'',icon:null});
      const [showPassword, setShowPassword] = useState(false);
      const [formData, setFormData] = useState({username:'',email:'',password:''})
      const navigate = useNavigate();
      //For Toast
      useEffect(()=>{
        if(showToast.visible && showToast.message ==='Sign Up Successful!'){
            const timer = setTimeout(() => {
                setShowToast({visible:false,message:'',icon:null});
                navigate('/login');
            },2000);
            return () => clearTimeout(timer);
        }
        },[showToast,navigate]);
      const toggleShowPassword = ()=> setShowPassword(prev => !prev);

    const handleChange = e => setFormData({...formData,[e.target.name]:e.target.value})
      const handleSubmit = async e=>{
        e.preventDefault();
        console.log('Sign Up Data:',formData);
        try{
            const res = await axios.post(`${url}/api/user/register`, formData);
            console.log('Sign Up Response:', res.data);

            if(res.data.success && res.data.token){
                localStorage.setItem('authToken', res.data.token);
                setShowToast({visible:true,
                    message:'Sign Up Successful!',
                    icon:<FaCheckCircle/>
                })
                    return;
            }
            throw new Error(res.data.message || 'Registration Failed');

        }catch(err){
            console.error('Sign Up Error:', err);
            const msg = err.response?.data?.message || err.message || 'Registration Failed';
            setShowToast({visible:true,
                message: msg,
                icon:<FaCheckCircle/>
            })

        }
      }
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#048b0b]/30  p-4 font-[Playfair_Display]'>
        {showToast.visible && <AwesomeToast message={showToast.message} icon={showToast.icon}/>}
        <div className='w-full max-w-md bg-[#263238] p-8 rounded-xl shadow-lg
        border-4 border-[#014a06] transform transition-all duration-300 hover:shadow-2xl'>
            <h1 className='text-3xl font-bold text-center bg-gradient-to-r from-[#4cf452] to-[#048b0b] bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform'>
                Create Account
            </h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input type='text' id='username' name='username' placeholder='Username' value={formData.username}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg bg-[#048b0b] text-[#d6f6c4] placeholder-[#b8f595] focus:outline-none
                focus:ring-2 focus:ring-[#048b0b] transition-all duration-200 hover:scale-[1.02]' autoComplete='username' required/>

                <input type='email' id='email' name='email' placeholder='Email' value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg bg-[#048b0b] text-[#d6f6c4] placeholder-[#b8f595] focus:outline-none
                focus:ring-2 focus:ring-[#048b0b] transition-all duration-200 hover:scale-[1.02]' autoComplete='email' required/>

                <div className='relative'>
                    
                    <input type={showPassword ? 'text' :'password'} id='password' name='password' placeholder='Password' value={formData.password}
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-lg bg-[#048b0b] text-[#d6f6c4] placeholder-[#b8f595] focus:outline-none
                    focus:ring-2 focus:ring-[#048b0b] transition-all duration-200 hover:scale-[1.02]' autoComplete='new-password' required/>
                    <button type="button" onClick={toggleShowPassword}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b8f595] hover:text-[#d6f6c4] transition-colors'>
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </button>
                </div>
                
                <button type='submit'
                className='w-full py-3 px-4 bg-gradient-to-r from-[#048b0b] to-[#04720b] text-[#d6f6c4] font-semibold
                rounded-lg hover:from-[#048b0b] hover:to-[#014a06] transition-all duration-200 transform hover:scale-[1.02]
                focus:outline-none focus:ring-2 focus:ring-[#048b0b]'>
                    Sign Up
                </button>
            </form>
            <div className='mt-6 text-center'>
                <Link to='/login' className='group inline-flex items-center text-[#d6f6c4]
                hover:text-[#bafc94] transition-all duration-300' >
                    <FaArrowLeft className='mr-2 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                transition-all duration-300'/>
                <span className='transform group-hover:-translate-x-2 transition-all duration-300'>
                    Back To Login
                </span>
                </Link>
            </div>
        

        </div>
    </div>
  )
}

export default SignUp