import React, { useState } from 'react'
import { useCart } from '../../CartContext/CartContext'
import {Link} from 'react-router-dom';
import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';


const API_URL = 'https://farmleaf-backend.onrender.com';

const CartPage = () => {
    const {cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
    const [selectedImage, setSelectedImage] = useState(null);

    //imageUrl
    const buildImageUrl = (path) => {
        if (!path) return '';
        return path.startsWith('http') ? path : `${API_URL}/uploads/${path.replace(/^\/uploads\//, '')}`;
    };
  return (
    <div className='min-h-screen overflow-hidden py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1b2226] via-[#133215] to-[#065302]
     font-[Playfair_Display]'>
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-down'>
                <span className='font-[Playfair_Display] italic block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2 bg-gradient-to-r from-amber-300 to-amber-500 
                bg-clip-text text-transparent'>
                    Your Cart
                 </span>
            </h1>
            {cartItems.length === 0 ? (
                <div className='text-center animate-fade-in py-8'>
                    <p className='text-lg sm:text-xl text-white mb-4'>Your cart is empty.</p>
                    <Link to='/menu' className='inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 text-green-400 hover:bg-green-900/50 bg-amber-700/20 px-4 sm:px-6 py-2 rounded-full font-[Playfair_Display] text-xs sm:text-sm
                    uppercase'>
                        Browse All Items
                    </Link>
                </div>
                ) : (
                    <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                        {cartItems.map(({_id, item, quantity })=> (
                            <div key={_id}
                            className='group bg-green-900/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-solid
                             transition-all border-green-500 backdrop-blur-sm flex flex-col items-center gap-3 sm:gap-4
                              duration-300 hover:border-dotted hover:shadow-xl hover:shadow-green-900/10
                               transform hover:translate-y-1 animate-fade-in'>
                                <div className='w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 cursor-pointer relative overflow-hidden rounded-lg
                                 transition-transform duration-300'
                                 onClick={()=> setSelectedImage(buildImageUrl(item.imageUrl || item.image))}>
                                    <img src={buildImageUrl(item.imageUrl || item.image)} alt={item.name} className=' w-full h-full object-contain'/>
                                 </div>
                                 <div className='w-full text-center'>
                                    <h3 className='text-base sm:text-lg md:text-xl font-[Playfair-Display] text-amber-100 line-clamp-2'>
                                        {item.name}
                                    </h3>
                                    <p className='text-white mt-1 text-sm sm:text-base'>Rs {Number(item.price).toFixed(2)}</p>
                                 </div>
                                 <div className='flex items-center gap-2 sm:gap-3'>
                                                <button onClick={()=>updateQuantity(_id, Math.max(1, quantity -1))}
                                        className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-900/40 flex font-[Playfair_Display] items-center justify-center hover:bg-green-800/60
                                         transition-all duration-200 active:scale-95'>
                                            <FaMinus className='w-3 h-3 sm:w-4 sm:h-4 text-amber-100'/>
                                         </button>
                                    <span className=' w-8 text-amber-100 font-medium font-[Playfair_Display]'>
                                        {quantity}</span>
                                                <button onClick={()=>updateQuantity(_id, quantity + 1)}
                                        className=' w-8 h-8 rounded-full bg-green-900/40 flex items-center justify-center hover:bg-amber-800/60
                                         transition-all duration-200 active:scale-95 font-[Playfair_Display]'>
                                            <FaPlus className=' w-4 h-4 text-amber-100'/>
                                         </button>
                                 </div>
                                 <div className=' flex items-center justify-between w-full'>
                                    <button onClick={()=> removeFromCart(_id)}
                                        className=' bg-green-900 py-2 px-3 rounded-full font-[Playfair_Display] text-xs uppercase transition-all
                                         duration-300 hover:bg-amber-800 flex items-center gap-1
                                          active:scale-95'>
                                            <FaTrash className=' w-4 h-4 text-amber-100'/>
                                            <span className='  text-amber-100  font-[Playfair_Display]'>Remove</span>
                                         </button>
                                         <p className=' text-sm font-[Playfair_Display] text-white'>
                                            Rs {Number(item.price * quantity).toFixed(2)}
                                         </p>         
                                 </div>
                               </div>
                        ))}
                    </div>
                    <div className=' mt-12 pt-8 border-t border-green-500 animate-fade-in-up'>
                        <div className=' flex flex-col sm:flex-row items-center justify-between gap-8'>
                            <Link to='/menu' className=' inline-flex items-center gap-2 hover:gap-3 
                            transition-all duration-300 text-amber-100 hover:bg-green-900/50 bg-green-700/40 
                            px-6 py-2 rounded-full font-[Playfair_Display] text-sm scale-95'>
                                Continue Shopping
                            </Link>
                            <div className=' flex items-center gap-8'>
                                <h2 className='text-3xl font-[Playfair_Display] text-amber-100'>
                                    Total: Rs {Number(totalAmount).toFixed(2)}
                                </h2>
                                <Link to='/checkout' className='flex items-center gap-2
                            transition-all duration-300 text-amber-100 hover:bg-green-900/50 bg-green-700/40 
                            px-6 py-2 rounded-full font-[Playfair_Display] text-sm scale-95'>
                                Checkout
                            </Link>
                            </div>
                        </div>
                    </div>
                    </>
                )}
        </div>
        {selectedImage && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-green-900/40 bg-opacity-75 backdrop-blur
            p-4 overflow-auto'
            onClick={()=> setSelectedImage(null)}>
                <div className='relative max-w-full max-h-full'>
                    <img src={selectedImage} alt='ful view' className=' max-w-[90vw] max-h-[90vw] rounded-lg object-contain'/>
                    <button onClick={() => setSelectedImage(null)}
                        className='absolute top-1 right-1 bg-green-900/80 rounded-full p-2 text-black hover:bg-green-800/90 transition-transform
                        duration-200 active:scale-90'>
                            <FaTimes className=' w-6 h-6'/>
                        </button>
                </div>
            </div>
        )}

    </div>
  )
}

export default CartPage
