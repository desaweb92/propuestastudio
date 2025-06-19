import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { fadeIn, slideUp } from '../utils/animations'
import './WelcomeLanding.css'

const WelcomeLanding = () => {
  const { t } = useTranslation()
  const landingRef = useRef(null)
  const gsapContext = useGsapContext(landingRef)

  useEffect(() => {
    gsapContext(() => {
      fadeIn('.welcome-text', 1.5)
      slideUp('.welcome-title', 1.2, 0.3, 30)
      gsap.from('.language-selector-container', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1
      })
      
      // Animación mejorada para el overlay
      gsap.from('.welcome-overlay', {
        opacity: 0,
        duration: 2,
        ease: "power2.inOut"
      })

      // Animación para el slider de fondo
      const images = [
        'https://i.imgur.com/8UzYJDT.jpg',
        'https://i.imgur.com/0f2Ispb.jpg',
        'https://i.imgur.com/XuefQiH.jpg',
        'https://i.imgur.com/jbbr9He.jpg'
      ]
      
      let currentIndex = 0
      const bgSlides = document.querySelectorAll('.bg-slide')
      
      function changeBackground() {
        bgSlides.forEach(slide => {
          slide.style.opacity = 0
        })
        
        currentIndex = (currentIndex + 1) % bgSlides.length
        bgSlides[currentIndex].style.opacity = 1
      }
      
      // Cambiar imagen cada 5 segundos
      const interval = setInterval(changeBackground, 5000)
      
      return () => clearInterval(interval) // Limpieza
    })
  }, [gsapContext])

  return (
    <div ref={landingRef} className="welcome-landing">
      {/* Background slider */}
      <div className="bg-slide" style={{backgroundImage: 'url(https://i.imgur.com/8UzYJDT.jpg)'}}></div>
      <div className="bg-slide" style={{backgroundImage: 'url(https://i.imgur.com/0f2Ispb.jpg)'}}></div>
      <div className="bg-slide" style={{backgroundImage: 'url(https://i.imgur.com/XuefQiH.jpg)'}}></div>
      <div className="bg-slide" style={{backgroundImage: 'url(https://i.imgur.com/jbbr9He.jpg)'}}></div>
      
      <div className="welcome-overlay"></div>
      
      <motion.div 
        className="welcome-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1 
          className="welcome-title"
          whileHover={{ letterSpacing: ['mobile', 'tablet'].includes(getDeviceType()) ? '0px' : '2px' }}
          transition={{ duration: 0.3 }}
        >
          ARCHITECTURE
        </motion.h1>
        
        <motion.p 
          className="welcome-text"
          whileHover={{ scale: ['mobile', 'tablet'].includes(getDeviceType()) ? 1 : 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {t('welcome')}
        </motion.p>
      </motion.div>
    </div>
  )
}

// Función helper para detectar dispositivo
const getDeviceType = () => {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export default WelcomeLanding