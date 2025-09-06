import React, { useState } from 'react'
import { cardData,additionalData, addButtonBase, addButtonHover, commonTransition } from '../../assets/dummydata';
import { useCart } from '../../CartContext/CartContext';
import { FaFire, FaHeart, FaPlus, FaStar } from 'react-icons/fa';
import { HiMinus, HiPlus} from 'react-icons/hi'
import FloatingParticle from '../FloatingParticle/FloatingParticle';

const SpecialOffer = () => {

    const[showAll,setShowAll] = useState(false);
    const initialData =[...cardData, ...additionalData];
    const {cartItems, addToCart, removeFromCart, updateQuantity} = useCart();
  return (
    <div className='bg-[#263238] text-[#d6f6c4] py-16 px-4 font-[Poppins]'>
        <div className='max-w-7xl mx-auto'>
            <div className='text-center mb-14'>
                <h1 className='text-5xl font-bold mb-4 transform transition-all bg-gradient-to-r from-[#4cf452] to-[#048b0b]
                 bg-clip-text text-transparent font-[Playfair_Diaplay] italic'>
                    Today's <span className='text-stroke-gold'>Special</span> Offers
                </h1>
                <p className='text-lg text-[#d6f6c4] max-w-3xl mx-auto tracking-wide leading-relaxed'>
                    Savor the extraordinary with our culinary masterpieces crafted to perfection.
                </p>
            </div>
            {/*Product card */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {(showAll ? initialData : initialData.slice(0,4)).map((item,index)=>{
                    const cartItem = cartItems.find(ci => ci.id === item.id);
                    const quantity = cartItem ? cartItem.quantity :0;
                    return(
                        <div key={`${item.id}-${index}`} className='relative group bg-amber-50 rounded-3xl
                        overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500
                        hover:shadow-[#048b0b]/40 border-2 border-transparent hover:border-[#048b0b]/20 before:absolute
                        before:inset-0 hover:before:opacity-20'>
                            <div className='relative h-72 overflow-hidden'>
                                <img src={item.image} alt={item.title} className='w-full h-full object-cover
                                brightness-90 group-hover:brightness-110 transition-all duration-500' />
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

                            <div className='p-6 text-gray-800 relative z-10'>
                                <h3 className='text-2xl font-bold mb-2 bg-clip-text font-[Playfair_Display] italic'>{item.title}</h3>
                                <p className='text-gray-600 mb-5 leading-relaxed tracking-wide'>{item.description}</p>
                                <div className='flex justify-between items-center gap-4'>
                                    <span className='text-2xl font-bold text-[#048b0b] flex-1'>{item.price}</span>
                                    {cartItem ?(
                                        <div className='flex items-center gap-3'>
                                            <button onClick={() =>{
                                                quantity >1 ? updateQuantity(item.id,quantity-1)
                                                : removeFromCart(item.id)
                                            }} className='w-8 h-8 rounded-full bg-[#048b0b] flex items-center justify-center hover:bg-[#4cf452]
                                            transition-all duration-200 active:scale-95'>
                                                <HiMinus className='w-4 h-4 text-[#d6f6c4] '/>
                                            </button>
                                            <span className='w-8 text-center text-[#1f201f] font-cinzel font-bold'>
                                                {quantity}
                                            </span>
                                            <button onClick={() => updateQuantity(item.id,quantity+1)}
                                            className='w-8 h-8 rounded-full bg-[#048b0b] flex items-center justify-center hover:bg-[#4cf452]
                                                transition-all duration-200 active:scale-95'>
                                                <HiPlus className='w-4 h-4 text-[#d6f6c4] '/>
                                            </button>
                                        </div>
                                    ):(
                                        <button onClick={() => addToCart({...item,name:item.title, price:parseFloat(item.price.replace('Rs ', ''))},1)}
                                        className={`${addButtonBase} ${addButtonHover} ${commonTransition}`}>
                                            <div className='absolute inset-0 bg-gradient-to-r from-[#048b0b] to-transparent 
                                            opacity-0 hover:opacity-100 transition-opacity duration-300'/>
                                            <FaPlus className='text-lg transition-transform'/>
                                            <span className='relative z-10 '>Add</span>
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