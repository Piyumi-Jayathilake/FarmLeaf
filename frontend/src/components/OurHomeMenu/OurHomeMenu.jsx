import React, { useEffect, useState } from 'react'
import {useCart} from '../../CartContext/CartContext'
import { FaMinus, FaPlus, FaStar, FaHeart } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './OurHomeMenu.css'

const categories = ['Fresh Veges', 'Leafy Greens', 'Fresh Fruits', 'Roots & Bulbs', 'Local Sri Lankan', 'Exotic & Imported', 'Herbs & Spices'];

const OurHomeMenu = () => {
  const [activityCategory,setActivityCategory] = useState(categories[0]);
  const {cartItems, addToCart, removeFromCart, updateQuantity} = useCart();
  const [menuData, setMenuData] = useState({});
 
  useEffect(()=>{
    axios.get('https://farmleaf-backend.onrender.com/api/items?featured=Fresh Picks')
    .then(res => {
      const items = Array.isArray(res.data) ? res.data : res.data.items || [];
      const grouped = items.reduce((acc,item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
      },{});
      setMenuData(grouped);
    })
    .catch(console.error)
  }, []);

  //use ID to find and update
  const getCartEntry = id => cartItems.find(ci => ci.item._id === id)
  const getQuantity = id => getCartEntry(id)?.quantity || 0;
  const displayItems = (menuData[activityCategory] || []).slice(0,4);


  return (
    <div className='bg-gradient-to-br from-[#1b2226]  via-[#133215] to-[#065302] min-h-screen py-12 sm:py-16
    px-4 sm:px-6 lg:px-8 font-[Playfair_Display]'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-10 md:mb-12 bg-clip-text text-transparent
        bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600'>
          <span className='font-[Playfair_Display] italic block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2'>
            Our Fresh Picks
          </span>
          <span className='block text-xl sm:text-2xl md:text-3xl font-[Playfair_Display] italic mt-4 text-[#d6f6c4]/80'>
          A Symphony of Nature&apos;s Goodness</span>
        </h2>
        <div className='flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16 font-[Playfair_Display] px-2'>
          {categories.map(cat =>(
            <button key={cat} onClick={() =>setActivityCategory(cat)}
            className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full border-2 transition-all duration-300 transform
            font-[Playfair_Display] text-xs sm:text-sm md:text-base lg:text-lg tracking-wide sm:tracking-widest backdrop-blur-sm
          ${activityCategory === cat ?
            'bg-[#048b0b]/80 border-[#048b0b]/50 scale-105 shadow-xl shadow-[#048b0b]/20 text-white'
            : 'bg-[#048b0b]/40 border-[#048b0b]/30 hover:border-[#048b0b]/50 text-[#d6f6c4]/80 hover:bg-[#4cf452]/50 hover:scale-95'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
          {displayItems.map((item,i) =>{
          const quantity = getQuantity(item._id);
          const cartEntry = getCartEntry(item._id);
            return(
              
    <div key={item._id} className='border-[#4ae02c]/30 backdrop-blur-sm flex flex-col relative group bg-black rounded-2xl sm:rounded-3xl
      overflow-hidden shadow-2xl transform hover:-translate-y-2 sm:hover:-translate-y-4 transition-all duration-500 hover:shadow-[#048b0b]/40 border-2
    hover:border-[#048b0b]/20 before:absolute before:inset-0 hover:before:opacity-20' 
    style={{'--index':i}}>
      <div className='h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 relative overflow-hidden'>
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className='w-full h-full object-cover brightness-90 group-hover:brightness-110  transition-all duration-700' />
      </div>

    <div className=' text-gray-800 relative z-10 bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm p-4 sm:p-6'>
    <h3 className='text-xl sm:text-2xl mb-2 font-[Playfair_Display] italic text-[#d6f6c4] transition-colors'>
          {item.name}
        </h3>
      <p className=' tracking-wide text-[#d6f6c4]/80 text-xs sm:text-sm mb-3 font-[Playfair_Display] leading-relaxed'>
      {item.description}
      </p>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-1'>
          {[1,2,3,4,5].map(star => (
            <FaStar
              key={star}
              className={star <= Number(item.rating || 0) ? 'text-amber-400' : 'text-amber-700'}
            />
          ))}
        </div>
        <div className='flex items-center gap-2 text-red-400'>
          <FaHeart className='text-lg'/>
          <span className='text-sm font-[Playfair_Display]'>{Number(item.hearts || 0)}</span>
        </div>
      </div>
      <div className='mt-auto flex items-center justify-between'>
        
          <span className='text-xl font-bold text-[#d6f6c4] font-[Playfair_Display] italic'>
          Rs {Number (item.price).toFixed(2)}
          </span>
     
        
         
         <div className=' flex items-center gap-2'>
          { quantity > 0 ?(
            <>
          <button className='w-8 h-8 rounded-full bg-[#4cf452]/60 flex items-center
      justify-center hover:bg-[#048b0b]/60 transition-colors'
      onClick={() => quantity > 1 ? updateQuantity(cartEntry._id,quantity -1): removeFromCart(cartEntry._id) }>
        <FaMinus className='text-[#d6f6c4]' />
      </button>
      <span className=' w-8 text-center text-[#d6f6c4]'>
        {quantity}
      </span>
       <button className='w-8 h-8 rounded-full bg-[#4cf452]/60 flex items-center
      justify-center hover:bg-[#048b0b]/60 transition-colors'
       onClick={() => updateQuantity(cartEntry._id,quantity +1)}>
        <FaPlus className='text-[#d6f6c4]'/>
       </button>
       </>
          
        ):(
          <button 
          onClick={()=> addToCart(item,1)}
          className='bg-[#4cf452]/40 px-4
          sm:px-6 py-1.5 rounded-full font-[Playfair_Display] text-xs uppercase sm:text-sm tracking-wider transition-all duration-500
          hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 relative overflow-hidden
          border border-[#048b0b]/50'>
            <span className='relative z-20 text-xs text-[#d6f6c4]' >
              Add to cart
            </span>
          </button>
        )
        }
          </div>
      </div>
        </div></div>
           )
          })}
        </div>
        <div className=' flex justify-center mt-16'>
          <Link className='bg-[#4cf452]/40 border-2 border-[#048b0b]/50 text-amber-100 px-8 py-1.5
          sm:px-10 rounded-full font-[Playfair_Display] uppercase tracking-widest transition-all duration-300
           hover:text-[#d6f6c4] hover:scale-115 hover:shadow-lg
          hover:shadow-amber-500/10 backdrop-blur-sm' to='/menu'>
            Browse Fresh Collection
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OurHomeMenu
