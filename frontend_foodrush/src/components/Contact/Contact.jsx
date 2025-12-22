import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaMapPin, FaPhone } from 'react-icons/fa'
import { FiArrowRight, FiGlobe, FiMail, FiMessageSquare } from 'react-icons/fi'
import { contactFormFields } from '../../assets/dummydata'
const Contact = () => {

  const[formData,setFormData]=React.useState({
    name:'',
    phone:'',
    email:'',
    address:'',
    product:'',
    query:''
  })
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('Form Submitted:', formData);
    toast.success('Form Submitted Successfully!',{
      style:{
        border:'1px solid #048b0b', padding:'16px', color:'#04720b',
        background:'rgba(255,255,255,0.1)',backdropFilter:'blur(10px)',
      },
      iconTheme:{primary:'#4ae02c',secondary:'#fff' }
      })
    setFormData({name:'',
    phone:'',
    email:'', 
    address:'',
    product:'',
    query:'' })

  }
  const handleChange=(e)=> setFormData({...formData,[e.target.name]:e.target.value});


  return (
    <div className='min-h-screen bg-gradient-to-r from-[#1b2226]  via-[#133215] to-[#065302] animate-gradient-x py-12
    sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 font-[Playfair_Display] italic relative overflow-hidden'>
        <Toaster position='top-center' reverseOrder={false} toastOptions={{duration:4000}}/>
        {/*ADDITIONAL DECORATIVE ELEMENTS */}
        <div className='absolute top-20 left-10 w-24 h-24 bg-green-500/50 rounded-full animate-float'/>
        <div className='absolute bottom-40 right-20 w-16 h-16 bg-green-500/50 rounded-full animate-float-delayed'/>
        <div className='max-w-7xl mx-auto relative z-10'>
            <h1 className=' text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 animate-fade-in-down font-[Playfair_Display]'>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300'>
                    Contact Us
                </span>
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/*CONTACT FORM AND INFO */}
                <div className='space-y-6'>
                  <div className='relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all
                  duration-300 hover:scale-[1.02] animate-card-float border-l-4 border-green-500 hover:border-green-400 group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0
                    group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'/>
                    <div className='flex items-center mb-4 relative z-10'>
                      <div className='p-3 bg-black rounded-xl'>
                      <FaMapPin className='text-green-500 text-2xl animate-pulse'/>
                      </div>
                      <h3 className='ml-4 text-amber-100 text-xl font-semibold font-[Playfair_Display]'>Our Location</h3>
                    </div>
                    <div className='pl-12 relative z-10'>
                      <p className='text-amber-100 font-light text-lg font-[Playfair_Display]'>
                        Kandy, Srilanka
                      </p>
                    </div>
                  </div>
                  <div className='relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all
                  duration-300 hover:scale-[1.02] animate-card-float border-l-4 border-green-500 hover:border-green-400 group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0
                    group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'/>
                    <div className='flex items-center mb-4 relative z-10'>
                      <div className='p-3 bg-black rounded-xl'>
                      <FaPhone className='text-green-500 text-2xl animate-pulse'/>
                      </div>
                      <h3 className='ml-4 text-amber-100 text-xl font-semibold font-[Playfair_Display]'>Contact Number</h3>
                    </div>
                    <div className='pl-12 relative space-y-2 z-10'>
                      <p className='text-amber-100 font-light flex items-center font-[Playfair_Display]'>
                        <FiGlobe className='text-amber-100 text-xl mr-2'/>
                        +94 712345678
                      </p>
                    </div>
                  </div>
                  <div className='relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all
                  duration-300 hover:scale-[1.02] animate-card-float border-l-4 border-green-500 hover:border-green-400 group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0
                    group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'/>
                    <div className='flex items-center mb-4 relative z-10'>
                      <div className='p-3 bg-black  rounded-xl'>
                      <FiMail className='text-green-500 text-2xl animate-pulse'/>
                      </div>
                      <h3 className='ml-4 text-amber-100 text-xl font-semibold font-[Playfair_Display]'>Email Address</h3>
                    </div>
                    <div className='pl-12 relative z-10'>
                      <p className='text-amber-100 font-light text-lg font-[Playfair_Display]'>
                        piyumijyathilake779@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
                {/*CONTACT FORM */}
                <div className='relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl animate-slide-in-right border-2
                border-green-500/30 hover:border-green-400 transition-border duration-300'>
                  <div className='absolute -top-4 -right-4 w-12 h-12 bg-green-500/30 rounded-full
                  animate-ping-slow'/>
                  <form onSubmit={handleSubmit} className=' space-y-6 relative z-10'>
                    {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }) => ( // eslint-disable-line no-unused-vars
                      <div key={name} >
                        <label htmlFor={name} className='block text-amber-100 mb-2 font-medium text-sm font-[Playfair_Display]'>{label}</label>
                        <div className='relative'>
                          <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                          <Icon className='text-amber-100 text-xl animate-pulse' />
                          </div>
                          <input type={type} id={name} value={formData[name]} name={name} onChange={handleChange}
                           className='w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 text-amber-100 focus:outline-none focus:ring-2 focus:ring-green-500
                           border-transparent placeholder-amber-100' placeholder={placeholder} pattern={pattern} autoComplete={name} required />
                        </div>
                        </div>))}
                        <div>
                          <label htmlFor='query' className='block text-amber-100 text-sm font-medium mb-2 font-[Playfair_Display]'>
                            Your Message
                          </label>
                          <div className='relative'>
                            <div className='absolute left-3 top-4'>
                              <FiMessageSquare className='text-amber-100 text-xl animate-pulse slow'/>
                            </div>
                            <textarea id='query' rows={4} name='query' value={formData.query} onChange={handleChange} className='w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-amber-100 focus:outline-none focus:ring-2 focus:ring-green-500
                           border-transparent border-2 border-green-500 placeholder-amber-100' placeholder='Type your message here....' required>
                           </textarea>
                          </div>
                        </div>
                        <button type='submit' className='w-full bg-gradient-to-r from-[#048b0b] to-[#04720b] hover:bg-gradient-to-l hover:from-[#048b0b] hover:to-[#04720b] text-white font-semibold px-6 py-3 rounded-xl
                        transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30
                        justify-center space-x-2 group font-[Playfair_Display]'>
                          <span>Submit</span>
                          <FiArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform inline'/>
                        </button>
                  </form>

                  </div>
            </div>
        </div>
    </div>
  )
}

export default Contact