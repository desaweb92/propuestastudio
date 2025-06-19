import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MobileMenu from './MobileMenu'
import LanguageSelector from './LanguageSelector'
import { useGsapContext } from '../hooks/useGsapContext'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = ({ isMenuOpen, setIsMenuOpen, changeLanguage }) => {
  const { t } = useTranslation()
  const headerRef = useRef(null)
  const navRef = useRef(null)
  const menuItemsRef = useRef([])
  const gsapContext = useGsapContext(headerRef)

  // Efectos existentes del header
  useEffect(() => {
    gsapContext(() => {
      gsap.from('.header-logo', {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 0.5
      })
      
      gsap.from(menuItemsRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.8,
        ease: "power2.out"
      })
      
      menuItemsRef.current.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item.querySelector('.menu-item-underline'), {
            width: '100%',
            duration: 0.3
          })
        })
        item.addEventListener('mouseleave', () => {
          if (!item.querySelector('a').classList.contains('active')) {
            gsap.to(item.querySelector('.menu-item-underline'), {
              width: 0,
              duration: 0.3
            })
          }
        })
      })
    })
  }, [gsapContext])

  const addToRefs = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el)
    }
  }

  return (
    <div className="header-wrapper">
      {/* Header existente */}
      <header ref={headerRef} className="header">
        <motion.div 
          className="header-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="header-logo">
           <img src="https://i.imgur.com/iAjXwj2.png" alt="" />
          </div>
          
          <nav ref={navRef} className="header-nav">
            <ul className="desktop-menu">
              {['home', 'about', 'portfolio', 'news'].map((item) => (
                <li key={item} ref={addToRefs}>
                  <NavLink 
                    to={`/${item === 'home' ? '' : item}`} 
                    className={({ isActive }) => 
                      `menu-item ${isActive ? 'active' : ''}`
                    }
                  >
                    {t(item)}
                    <span className="menu-item-underline"></span>
                  </NavLink>
                </li>
              ))}
              <li><LanguageSelector changeLanguage={changeLanguage} /></li>
            </ul>
            
            <div className="header-utils">
              <button 
                className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>
        </motion.div>

        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </header>
    </div>
  )
}

export default Header