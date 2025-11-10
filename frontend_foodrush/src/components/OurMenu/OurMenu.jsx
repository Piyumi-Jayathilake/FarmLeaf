import React, { useState } from 'react'
import {useCart} from '../../CartContext/CartContext'
import {dummyMenuData} from '../../assets/OmDD'
import { FaMinus, FaPlus } from 'react-icons/fa';
import './OurMenu.css'
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian','Desserts','Drinks'];
const OurMenu = () => {
      const [activityCategory,setActivityCategory] = useState(categories[0]);
      const displayItems = (dummyMenuData[activityCategory]||[]).slice(0,12);
      const {cartItems, addToCart, removeFromCart} = useCart();
      const getQuantity = id => (cartItems.find(i => i.id === id)?.quantity || 0)
    return (
      <div className='bg-gradient-to-br from-[#1b2226]  via-[#133215] to-[#065302] min-h-screen py-16
      px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <h2 className=' font-bold text-center mb-12 bg-clip-text text-transparent
          bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600'>
            <span className='font-[Playfair_Diaplay] italic block text-5xl md:text-7xl sm:text-6xl mb-2'>
              Our Exquisite Menu
            </span>
            <span className='block text-xl sm:text-2xl md:text-3xl font-[Playfair_Diaplay] italic mt-4 text-[#d6f6c4]/80'>
            A Symphony of Flavours</span>
          </h2>
          <div className='flex flex-wrap justify-center gap-4 mb-16 font-[Playfair_Diaplay] '>
            {categories.map(cat =>(
              <button key={cat} onClick={() =>setActivityCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform
              font-[Playfair_Diaplay] text-sm sm:text-lg tracking-widest backdrop-blur-sm
            ${activityCategory === cat ?
              'bg-[#048b0b]/80 border-[#048b0b]/50 scale-105 shadow-xl shadow-[#048b0b]/20 text-white'
              : 'bg-[#048b0b]/40 border-[#048b0b]/30 hover:border-[#048b0b]/50 text-[#d6f6c4]/80 hover:bg-[#4cf452]/50 hover:scale-95'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
            {displayItems.map((item,i) =>{
              const quantity = getQuantity(item.id);
              return(
                
      <div key={item.id} className='  border-[#4ae02c]/30 backdrop-blur-sm flex flex-col relative group bg-black rounded-3xl
        overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500 hover:shadow-[#048b0b]/40 border-2
      hover:border-[#048b0b]/20 before:absolute before:inset-0 hover:before:opacity-20' 
      style={{'--index':i}}>
        <div className=' h-72 sm:h-80 md:h-96 relative overflow-hidden'>
          <img 
            src={item.image} 
            alt={item.name} 
            className='w-full h-full object-cover brightness-90 group-hover:brightness-110  transition-all duration-700' />
        </div>
  
      <div className=' text-gray-800 relative z-10 bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm p-4 sm:p-6'>
      <h3 className='text-xl sm:text-2xl mb-2 font-[Playfair_Diaplay] italic text-[#d6f6c4] transition-colors'>
            {item.name}
          </h3>
        <p className=' tracking-wide text-[#d6f6c4]/80 text-xs sm:text-sm mb-4 font-[Playfair_Diaplay] leading-relaxed'>{item.description}</p>
        <div className='mt-auto flex items-center justify-between'>
          
         
          <span className='text-xl font-bold text-[#d6f6c4] font-[Playfair_Diaplay] italic'>
            Rs {item.price}
            </span>
          
            
           
         
          { quantity > 0 ?(
           
           <div className=' flex items-center gap-2'>
            <button className='w-8 h-8 rounded-full bg-[#4cf452]/60 flex items-center
        justify-center hover:bg-[#048b0b]/60 transition-colors' onClick={() => quantity > 1 ? addToCart(item,quantity -1): removeFromCart(item.id) }>
          <FaMinus className='text-[#d6f6c4]' />
        </button>
        <span className=' w-8 text-center text-[#d6f6c4]'>
          {quantity}
        </span>
         <button className='w-8 h-8 rounded-full bg-[#4cf452]/60 flex items-center
        justify-center hover:bg-[#048b0b]/60 transition-colors'
         onClick={() => addToCart(item,quantity +1)}>
          <FaPlus className='text-[#d6f6c4]'/>
  
         </button>
            </div>
          ):(
            <button 
            onClick={()=> addToCart(item,1)}
            className='bg-[#4cf452]/40 px-4
            sm:px-6 py-1.5 rounded-full font-[Playfair_Diaplay] text-xs uppercase sm:text-sm tracking-wider transition-all duration-500
            hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 relative overflow-hidden
            border border-[#048b0b]/50'>
              <span className='relative z-20 text-xs text-[#d6f6c4]' >
                Add to cart
              </span>
            </button>
          )
          }
        
        </div>
          </div></div>
             )
            })}
          </div>
         
        </div>
      </div>
    )
}

export default OurMenu