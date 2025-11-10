import React, { useEffect, useState } from 'react'
import { GiChefToque, GiForkKnifeSpoon } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiBook, FiHome, FiPhone, FiStar, FiShoppingCart,FiLogOut,FiKey} from "react-icons/fi";
import { useCart } from '../../CartContext/CartContext';
import Login from '../Login/Login';
import FoodRush from '../../assets/FoodRush.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate= useNavigate()
    const location = useLocation();
    const {totalItems} = useCart();
    const [ShowLoginModel, setShowLoginModel] = useState(false);
// Combine updating login and auth on location changes
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem('loginData'))
    )
    useEffect(() =>{
        setShowLoginModel(location.pathname === '/login');
        setIsAuthenticated(Boolean(localStorage.getItem('loginData')))
    }, [location.pathname])

    const handleLoginSuccess = () => {
        localStorage.setItem('loginData', JSON.stringify({loggedIn: true}));
        setIsAuthenticated(true);
        navigate('/');
    }
    const handleLogout = () =>{
        localStorage.removeItem('loginData');
        setIsAuthenticated(false);
    }
    // Extract desktop auth button
    const renderDesktopAuthButton =() =>{
        return isAuthenticated ? (
            <button onClick={handleLogout} className='px-3 md:px-3 lg:px-6 py-1.5 md:py-2 lg:py-3 bg-gradient-to-br from-[#048b0b] to-[#04720b]
             hover:from-[#4ae02c] hover:to-[#17c703] text-[#d6f6c4] rounded-2xl font-bold hover:shadow-lg hover:shadow-[#048b0b]/40 transition-all
            transform hover:scale-[1.02] border-2 border-[#048b0b]/20 flex items-center space-x-2
            shadow-md shadow-[#048b0b]/20 text-xs md:text-sm lg:text-sm'>
                <FiLogOut className='text-base md:text-lg lg:text-lg' />
                <span className='text-shadow font-[Playfair_Diaplay] '>Logout</span>
            </button>
        ):(
            <button onClick={() => navigate('/login')} className='px-3 md:px-3 lg:px-6 py-1.5 md:py-2 lg:py-3 bg-gradient-to-br from-[#048b0b] to-[#04720b]
             hover:from-[#4ae02c] hover:to-[#17c703] text-[#d6f6c4] rounded-2xl font-bold hover:shadow-lg hover:shadow-[#048b0b]/40 transition-all 
            transform hover:scale-[1.02] border-2 border-[#048b0b]/20 flex items-center space-x-2
            shadow-md shadow-[#048b0b]/20 text-xs md:text-sm lg:text-sm'>
                <FiKey className='text-base md:text-lg lg:text-lg' />
                <span className='text-shadow font-[Playfair_Diaplay]'>Login</span>
            </button>
        )
    }
//Extract mobile auth button
    const renderMobileAuthButton =() =>{
        return isAuthenticated ?(
            <button onClick={handleLogout} className='w-full px-4 py-3 bg-gradient-to-br from-[#048b0b] to-[#04720b] 
            hover:from-[#4ae02c] hover:to-[#17c703] text-[#d6f6c4] rounded-xl font-semibold flex items-center justify-center space-x-2
            text-sm'>
                <FiLogOut/>
                <span>Logout</span>
            </button>
        ) :(
             <button onClick={() => {
                navigate('/login')
                setIsOpen(false)
             }} className='w-full px-4 py-3 bg-gradient-to-br from-[#048b0b] to-[#04720b] hover:from-[#4ae02c] hover:to-[#17c703]
            text-[#d6f6c4] rounded-xl font-semibold flex items-center justify-center space-x-2
            text-sm'>
                <FiKey/>
                <span>Login</span>
            </button>
        )
    }
    const navLinks =[
        {name:'Home', href:'/', icon: <FiHome/>},
        {name:'Menu', href:'/menu', icon: <FiBook/>},
        {name:'About', href:'/about', icon: <FiStar/>},
        {name:'Contact', href:'/contact', icon: <FiPhone/>},
    ];
  return (
    <nav className='bg-[#263238] border-b-8 border-[#048b0b]/30 shadow-none sticky
     top-0 z-50  front-vibes group/nav overflow-x-hidden'>
        <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4'>
            <div className='h-[6px] bg-gradient-to-r from-transparent via-[#4cf452]/50 to-transparent
            shadow-[0_0_20px] shadow-[#048b0b]/30'/>
                <div className='flex justify-between px-6'>
                   {/* <GiForkKnifeSpoon className='text-[#4cf452]/40 -mt-4 -ml-2 rotate-45' size={32}/>
                    <GiForkKnifeSpoon className='text-[#4cf452]/40 -mt-4 -mr-2 rotate-45' size={32}/>*/}
                </div>
            
        </div>
        {/*Main Navigation Container*/}
        <div className='max-w-7xl mx-auto px-4 relative'>
            <div className='flex justify-between items-center h-16 md:h-20 lg:h-24'>
                {/*Logo Section*/}
                <div className='flex-shrink-0 flex items-center space-x-2 group relative md:-translate-x-4
                lg:-translate-x-6 ml-0 md:ml-2'>
                    <div className='absolute -inset-4 bg-[#048b0b]/30 rounded-full blur-xl
                    opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300'/>

                   <img src={FoodRush} alt="FoodRush Logo" className='h-[1.5em] w-auto text-3xl md:text-4xl lg:text-5xl text-[#4cf452] transition-all
             group-hover:rotate-12 group-hover:text-[#4cf452] hover:drop-shadow-[0_0_15px]
             hover:drop-shadow-[#048b0b]/50 inline-block'/>


                    <div className='flex flex-col relative ml-2 max-w-[140px] md:max-w-[160px] lg:max-w-none'>
                        <NavLink to='/' className='text-2xl md:text-xl lg:text-4xl bg-gradient-to-r from-[#4cf452]
                        to-[#048b0b] bg-clip-text text-transparent font-monsieur tracking-wider drop-shadow-[0_2px_2px]
                        drop-shadow-black -translate-x-2 truncate md:truncate-none font-[Playfair_Diaplay] italic'>
                            FoodRush
                        </NavLink>
                        <div className='h-[3px] bg-gradient-to-r from-[#4cf452]/80 via-[#4cf452]/50 to-[#4cf452]/30 w-full
                        mt-1 ml-1 shadow-[0_2px_5px] shadow-[#048b0b]/20 -translate-x-3'/>
                    </div>
                </div>
                {/*Desktop Navigation*/ }
                <div className='hidden md:flex items-center space-x-2 md:space-x-1 lg:space-x-4 flex-1 justify-end font-[Playfair_Diaplay] '>
                    {navLinks.map((link) => (
                        <NavLink key={link.name}
                        to={link.href}
                        className={({isActive})=>`group px-3 md:px-3 lg:px-4 py-2 md:py-2 lg:py-3 text-sm md:text-[15px] lg:text-base relative transition-all duration-300 flex items-center hover:bg-[#048b0b]/20 rounded-3xl border-2
                        ${
                            isActive ? 'border-[#048b0b]/50 bg-[#048b0b]/20 shadow-[inset_0_0_15px] shadow-[#048b0b]/20'
                            : 'border-[#048b0b]/30 hover:border-[#048b0b]/50'
                        } shadow-md shadow-[#048b0b]/20 `}>
                            <span className='mr-2 text-sm md:text-[15px] lg:text-base
                            text-[#048b0b] group-hover:text-[#4cf452] transition-all'>
                                {link.icon}
                            </span>
                            <span className='text-amber-100 group-hover:text-[#4cf452] relative'>
                                {link.name}
                                <span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-[#4cf452] transition-all
                                group-hover:w-full'/>
                            </span>        
                        </NavLink>
                    ))}
                    <div className='flex items-center space-x-2 md:space-x-3 lg:space-x-4 ml-3
                    md:ml-3 lg:ml-6 mr-2 md:mr-3 lg:mr-4'>
                        <NavLink to='/cart' className='p-2 md:p-2.0 lg:p-3 text-amber-100 rounded-xl transition-all
                        relative border-2 border-[#048b0b]/50 hover:border-[#048b0b]/50 group hover:bg-[#048b0b]/20 
                        hover:shadow-lg hover:shadow-[#048b0b]/30 shadow-[#048b0b]/20'>
                            <FiShoppingCart className=' text-base md:text-lg  lg:text-lg'/>
                            {totalItems > 0 && (
                                <span className='absolute -top-2 -right-2 bg-[#4cf452]
                                text-amber-100 text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                                    {totalItems}
                                </span>
                            )}
                        </NavLink>
                        {renderDesktopAuthButton()}
                    </div>
                </div>
                {/* Mobile Menu*/ }
                <div className='md:hidden flex items-center mr-2 font-[Playfair_Diaplay] '>
                    <button className='text-[#4cf452] hover:text-[#4cf452] focus:outline-none transition-all
                    p-2 rounded-xl border-2 border-[#048b0b]/50 hover:border-[#048b0b]/50 relative shadow-md shadow-[#048b0b]/20
                    hover:shadow-lg hover:shadow-[[#048b0b]]/30' onClick={() => setIsOpen(!isOpen)}>
                        <div className='space-y-2 relative'>
                            <span className={`block w-6 h-[2px] bg-current transition-all
                            ${isOpen ? 'rotate-45 translate-y-[7px]':''
                            }`}/>
                            <span className={ `block w-6 h-[2px] bg-current ${isOpen ? 'opacity-0':''}`}/>
                            <span className={`block w-6 h-[2px] bg-current transition-all
                            ${isOpen ? '-rotate-45 -translate-y-[7px]':'' 
                            }`}/>                           
                        </div>
                    </button>
                </div>
            </div>
        </div>
        {/*Mobile Navigation */}
        {isOpen && (
            <div className='md:hidden bg-[#263238] border-t-4 border-[#048b0b]/40 relative shadow-lg
            shadow-[#048b0b]/30 w-fullfont-[Playfair_Diaplay] '>
                <div className='px-4 py-4 space-y-2'>
                    {navLinks.map((link)=>(
                        <NavLink key={link.name} to={link.href} onClick={() => setIsOpen(false)} className={({isActive}) =>
                        `block px-4 py-3 text-sm rounded-xl transition-all items-center  ${
                            isActive ? 'bg-[#048b0b]/20 text-[#048b0b]' : 'text-amber-100 hover:bg-[#048b0b]/20 hover:text-[#4cf452]'}
                            border-2 ${isActive ? 'border-[#048b0b]/50' : 'border-[#048b0b]/30'}`}>
                                <span className=' mr-3 text-[#4cf452]'>
                                    {link.icon}
                                </span>
                                {link.name}
                            </NavLink>
                    ))}
                    <div className=' pt-4 border-t-2 border-[#048b0b]/30 space-y-2'>
                        <NavLink to= '/cart' onClick={() => setIsOpen(false)}
                            className= 'w-full px-4 py-3 text-center text-[#4cf452] rounded-xl border-2 border-[#048b0b]/30 hover:border-[#048b0b]/50 flex items-center justify-center space-x-2 text-sm'>
                            <FiShoppingCart className='text-lg'/>
                              {totalItems > 0 && (
                                <span className='top-2 right-2 bg-[#048b0b]
                                text-[#4cf452] text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                                    {totalItems}
                                </span>
                            )}
                            </NavLink>
                            {renderMobileAuthButton()}
                    </div>
                </div>

            </div>
        )}
        {/* Login Model */}
        {ShowLoginModel && (
            <div className='fixed inset-0 bg-[#048b0b]/30 flex items-center justify-center z-50 p-4'>
                <div className='bg-[#263238] rounded-xl p-6
                w-full max-w-[480px] relative border-4 border-[#048b0b]/30 shadow-[0_0_30px] shadow-[#048b0b]/90'>
                    <button onClick={() => navigate('/')}
                    className='absolute top-2 right-2 text-[#4cf452] hover:text-[#048b0b] text-2xl'>
                        &times;              
                    </button>
                     <h2 className='text-2xl font-bold bg-gradient-to-r from-[#4cf452] to-[#048b0b]
                        bg-clip-text text-transparent mb-4 text-center font-[Playfair_Display] '>
                            FoodRush
                        </h2>
                        <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
                    </div>                
            </div>
        )}


    </nav>
  )}

export default Navbar