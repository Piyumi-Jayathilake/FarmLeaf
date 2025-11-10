import React, { useState } from 'react'
import { FaRegEnvelope } from 'react-icons/fa'
import { BiChevronRight } from "react-icons/bi";
import { socialIcons } from '../../assets/dummydata';

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Menu', link: '/menu' },
  { name: 'About Us', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing! We will send updates to ${email}`);
    setEmail('');
  };

  return (
    <footer className='bg-[#263238] text-amber-100 py-12 sm:px-6 px-4 lg:px-8 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto relative z-10'>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-12 items-start'>

          {/* LEFT COLUMN */}
          <div className='space-y-6'>
            <h2 className='text-4xl sm:text-5xl md:text-5xl font-bold font-[Playfair_Display] text-[#4cf452] animate-pulse'>
              Food Rush
            </h2>
            <p className='text-[#d6f6c4] text-sm font-[Playfair_Display] italic'>
              Where flavor meets finesse <br/> Handcrafted perfection, thoughtfully delivered to your doorstep.
            </p>
            <form onSubmit={handleSubmit} className='relative mt-4 group'>
              <div className='flex items-center gap-2 mb-2'>
                <FaRegEnvelope className='text-[#4cf452] animate-pulse' />
                <span className='font-bold text-[#4cf452] font-[Playfair_Display]'>
                  Get Exclusive Offers
                </span>
              </div>
              <div className='relative font-[Playfair_Display]'>
                <input
                  type='email' placeholder='Enter your email....' value={email} onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-4 py-2.5 rounded-lg bg-amber-50/5 border-[#048b0b] focus:outline-none 
                  focus:border-[#048b0b] focus:ring-2 focus:ring-[#048b0b]/30 transition-all duration-300 
                  placeholder-[#d6f6c4] pr-24'
                  required />
                <button type='submit'
                  className='absolute right-1 top-1 bg-gradient-to-br from-[#4cf452]
                  via-[#048b0b] to-[#048b0b] text-amber-100 px-4 py-2 rounded-lg
                  flex items-center gap-1.5 shadow-lg hover:shadow-[#048b0b]/30 
                  overflow-hidden transition-all duration-500' >
                  <span className='font-bold font-[Playfair_Display] text-sm tracking-wide 
                    transition-transform duration-300 group-hover:-translate-x-1' >
                    Join Now
                  </span>
                  <BiChevronRight className='text-xl transition-transform duration-300 group-hover:animate-spin flex-shrink-0' />
                  <span className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent
                  via-amber-50/30 to-transparent group-hover:translate-x-full transition-transform duration-700'></span>
                </button>
              </div>
            </form>
          </div>

          {/*  MIDDLE COLUMN  */}
          <div className='flex justify-center items-start h-full'>
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold mb-4 border-l-4 border-[#05c30e] pl-3 font-[Playfair_Display] italic text-[#05c30e]'>
              Navigation
            </h3>
            <ul className='space-y-3'>
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className='flex items-center text-[#d6f6c4] hover:text-[#05c30e] transition-all group font-[Playfair_Display] hover:pl-2'
                  >
                    <BiChevronRight className='mr-2 text-[#d6f6c4] group-hover:animate-bounce hover:text-[#05c30e]' />
                    <span className='hover:italic'>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div></div>
          {/*RIGHT COLUMN */}
          <div className='flex justify-center md:justify-end'>
            <div className='space-y-4'>
                <h3 className='text-xl font-semibold mb-4 border-l-4 border-[#05c30e] font-[Playfair_Display] italic text-[#05c30e] pl-3'>
                    Social Connect
                </h3>
                <div className='flex space-x-4'>
                    {socialIcons.map(({icon: Icon, link,color,label},idx)=>(
                        <a target='_blank' href={link} key={idx}
                        className='text-2xl bg-[#048b0b]/10 p-3 rounded-full hover:bg-[#048b0b]/20 hover:scale-110
                         transition-all duration-300 relative group'
                         style={{color}}>
                            <Icon className='hover:scale-125 transition-transform'/>
                            <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#048b0b]
                             text-[#d6f6c4] px-2 py-1 rounded text-xs font-bold opacity-0
                              group-hover:opacity-100 transition-opacity'>
                                {label}
                              </span>
                         </a>
                    ))}
                </div>
            </div>
          </div>

        </div>
        {/*BOTTOM SECTION */}
        <div className='border-t border-[#05c30e] pt-8 mt-8 text-center'>
            <p className='text-[#05c30e] text-lg mb-2 font-[Playfair_Display]'>
                    &copy; 2025 FoodRush. All Rights Reserved.
            </p>
            <div className=' group inline-block'>
                <a href="https://lk.linkedin.com/in/piyumi-jayathilake"
                target='_blank' className=' text-lg font-[Playfair_Display] bg-gradient-to-r from-[#4cf452] via-[#05c30e]
                 to-[#048b0b] bg-clip-text text-transparent hover:text-[#d6f6c4] transition-all duration-500 '>
                    Designed By Piyumi Jayathilake
                 </a>
            </div>
        </div> 
      </div>
    </footer>
  );
};

export default Footer;
