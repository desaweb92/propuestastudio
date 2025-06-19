import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useGsapContext } from '../hooks/useGsapContext'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation()
  const menuRef = useRef(null)
  const gsapContext = useGsapContext(menuRef)

  const categories = [
    'mixedUse', 'residential', 'corporate', 'retail', 
    'educational', 'industrial', 'masterPlanning', 'urbanDesign'
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsapContext(() => {
        gsap.from('.mobile-menu-item', {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.5
        })
      })
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, gsapContext])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={menuRef}
          className="mobile-menu"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mobile-menu-container">
            <ul>
              {categories.map((category, index) => (
                <motion.li 
                  key={index}
                  className="mobile-menu-item"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <a href={`#${category}`} onClick={() => setIsOpen(false)}>
                    {t(category)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu