import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { fadeIn, slideUp } from '../utils/animations'

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
    })
  }, [gsapContext])

  return (
    <div ref={landingRef} className="welcome-landing">
      <div className="welcome-overlay"></div>
      
      <motion.div 
        className="welcome-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="welcome-title">ARCHITECTURE</h1>
        <p className="welcome-text">{t('welcome')}</p>
      </motion.div>
    </div>
  )
}

export default WelcomeLanding