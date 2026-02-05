import React from 'react'
import { navLinks, styles } from '../assets/admindetails'
import { GiCurledLeaf } from "react-icons/gi";
import { FiX, FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import FarmLeaf from '../FarmLeaf.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <nav className={styles.navWrapper}>
        <div className={styles.navContainer}>
            <div className={styles.logoSection}>
               <img src={FarmLeaf} alt="FarmLeaf Logo" className='h-12 sm:h-14 w-auto text-3xl md:text-4xl lg:text-5xl text-[#4cf452] transition-all
                            group-hover:rotate-12 group-hover:text-[#4cf452] hover:drop-shadow-[0_0_15px]
                            hover:drop-shadow-[#048b0b]/50 inline-block'/>
                 <span className={styles.logoText}>FarmLeaf Admin</span>
            </div>
            <button onClick={()=>
                setMenuOpen(!menuOpen)}
                className={styles.menuButton}>
                    {menuOpen ? <FiX/> : <FiMenu/>}
                </button>
                <div className={styles.desktopMenu}>
                    {navLinks.map(link => (
                        <NavLink key={link.name} to ={link.href} className={({isActive})=>
                            `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}>
                            {link.icon}
                            <span>{link.name}</span>
                            </NavLink>))
                        }
                </div>
            <div>
                {/* Mobile Menu */}
                {menuOpen && (
                    <div className={styles.mobileMenu}>
                         {navLinks.map(link => (
                        <NavLink key={link.name} to ={link.href}
                        onClick={() => setMenuOpen(false)}
                         className={({isActive})=>
                            `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}>
                            {link.icon}
                            <span>{link.name}</span>
                            </NavLink>))
                        }
                    </div>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar