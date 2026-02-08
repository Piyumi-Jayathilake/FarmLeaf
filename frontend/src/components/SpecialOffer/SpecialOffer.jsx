import React, { useEffect, useState } from 'react'
import { addButtonBase, addButtonHover, commonTransition } from '../../assets/data';
import { useCart } from '../../CartContext/CartContext';
import { FaFire, FaHeart, FaPlus, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { HiMinus, HiPlus} from 'react-icons/hi'
import FloatingParticle from '../FloatingParticle/FloatingParticle';

const SpecialOffer = () => {

    const[showAll,setShowAll] = useState(false);
    const [items,setItems] = useState([]);
    const {addToCart, removeFromCart, updateQuantity, cartItems} = useCart();

    useEffect(() => {
        axios.get('http://localhost:4000/api/items?featured=Special Offer')
        .then(res => setItems(res.data.items ?? res.data))
        .catch(err => console.error(err));
    }, [])
    const displayList = Array.isArray(items) ? items.slice(0, showAll ? 8 : 4) : [];
        
  return (
    <div className='bg-[#263238] text-[#d6f6c4] py-12 sm:py-16 px-4 sm:px-6 font-[Playfair_Display]'>
        <div className='max-w-7xl mx-auto'>
            <div className='text-center mb-10 sm:mb-14'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 transform transition-all bg-gradient-to-r from-[#4cf452] to-[#048b0b]
                 bg-clip-text text-transparent font-[Playfair_Display] italic'>
                    Today's <span className='text-stroke-gold'>Special</span> Offers
                </h1>
                <p className='text-sm sm:text-base md:text-lg text-[#d6f6c4] max-w-3xl mx-auto tracking-wide leading-relaxed'>
                    Celebrate freshness in every bite with our carefully selected, naturally grown produce.
                </p>
            </div>
            {/*Product card */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8'>
                {displayList.map(item=>{
                    const cartItem = cartItems.find(ci => ci.item._id === item._id);
                    const quantity = cartItem ? cartItem.quantity :0;
                    const cartId = cartItem?._id;   
                    return(
                        <div key={item._id} className='border-[#4ae02c]/30 backdrop-blur-sm flex flex-col relative group bg-black rounded-2xl sm:rounded-3xl
                        overflow-hidden shadow-2xl transform hover:-translate-y-2 sm:hover:-translate-y-4 transition-all duration-500
                        hover:shadow-[#048b0b]/40 border-2 hover:border-[#048b0b]/20 before:absolute
                        before:inset-0 hover:before:opacity-20'>
                            <div className='relative h-56 sm:h-64 md:h-72 overflow-hidden'>
                                <img src={item.imageUrl} alt={item.name} className='w-full h-full object-cover
                                brightness-90 group-hover:brightness-110 transition-all duration-500 text-gray-800' />
                                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent
                                to-black/90'/>
                                <div className='absolute bottom-4 left-4 right-4 flex justify-between items-center
                                bg-[#048b0b]/20 backdrop-blur-sm px-4 py-2 rounded-full'>
                                    <span className='flex items-center gap-2 text-amber-400'>
                                        <FaStar className='text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'/>
                                        <span className='font-bold'>{item.rating}</span>
                                    </span>
                                    <span className='flex items-center gap-2 text-[#fb3d03]'>
                                        <FaHeart className='text-xl animate-heartbeat' />
                                        <span className='font-bold'>{item.hearts}</span>
                                    </span>
                                </div>
                            </div>

                            <div className='p-4 sm:p-6 text-gray-800 relative z-10 bg-black/40 backdrop-blur-sm'>
                                <h3 className='text-xl sm:text-2xl mb-2 font-[Playfair_Display] italic text-[#d6f6c4] transition-colors'>
                                    {item.name}</h3>
                                <p className='tracking-wide text-[#d6f6c4]/80 text-xs sm:text-sm mb-4 sm:mb-5 font-[Playfair_Display] leading-relaxed line-clamp-2'>
                                    {item.description}</p>
                                <div className='flex justify-between items-center gap-2 sm:gap-4'>
                                    <span className='text-lg sm:text-xl md:text-2xl font-bold text-[#d6f6c4] flex-1 font-[Playfair_Display] italic'>
                                        Rs {Number(item.price).toFixed(2)}</span>
                                    
                                    {quantity > 0 ? (
                                        <div className='flex items-center gap-2 sm:gap-3'>
                                            <button onClick={() =>{
                                                quantity >1 ? updateQuantity(cartId, quantity - 1)
                                                : removeFromCart(cartId)
                                            }} className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#048b0b] flex items-center justify-center hover:bg-[#4cf452]
                                            transition-all duration-200 active:scale-95'>
                                                <HiMinus className='w-3 h-3 sm:w-4 sm:h-4 text-[#d6f6c4] '/>
                                            </button>
                                            <span className='w-8 text-center text-[#1f201f] font-cinzel font-bold'>
                                                {quantity}
                                            </span>
                                            <button onClick={() => updateQuantity(cartId, quantity + 1)}
                                            className='w-8 h-8 rounded-full bg-[#048b0b] flex items-center justify-center hover:bg-[#4cf452]
                                                transition-all duration-200 active:scale-95'>
                                                <HiPlus className='w-4 h-4 text-[#d6f6c4] '/>
                                            </button>
                                        </div>
                                    ):(
                                        <button onClick={() => addToCart(item,1)}
                                        className='bg-[#4cf452]/40 px-4 sm:px-6 py-1.5 rounded-full font-[Playfair_Display] text-xs uppercase sm:text-sm tracking-wider transition-all duration-500
                                        hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 relative overflow-hidden border border-[#048b0b]/50'>
                                            <span className='relative z-20 text-xs text-[#d6f6c4]'>
                                                Add to cart
                                            </span>
                                        </button>
                                    ) }
                                    
                                </div>
                            </div>
                            <div className='absolute inset-0 rounded-3xl pointer-events-none border-transparent
                            group-hover:border-[#048b0b] transition-all duration-500' />
                            <div className='opacity-0 group-hover:opacity-100'>
                                <FloatingParticle />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='mt-12 flex justify-center'>
                <button onClick={() => setShowAll(!showAll)}
                    className='flex items-center gap-3 bg-gradient-to-r from-[#048b0b] to-[#04720b] 
                    hover:from-[#4ae02c] hover:to-[#0f8002] text-[#d6f6c4] px-8 py-4 rounded-2xl 
                    transform hover:gap-4 hover:scale-105 transition-all duration-300 text-lg uppercase tracking-wider 
                    font-bold hover:shadow-[#048b0b]/10 hover:shadow-xl group border-2 border-[#04720b]/30 relative
                    overflow-hidden'>
                        <div className='absolute inset-0 bg-gradient-to-r fill-[#048b0b]/20 via-transparent to-[#04720b]/10 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
                        <FaFire className='text-xl animate-pulse'/>
                    <span>{showAll ? 'Show Less' : 'View All Offers'}</span>
                    <div className='h-full w-1 bg-[#048b0b]/30 absolute right-0 top-0 group-hover:animate-border-pulse'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default SpecialOffer