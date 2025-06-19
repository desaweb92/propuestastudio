import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import './LanguageSelector.css'

const LanguageSelector = ({ changeLanguage }) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const currentLanguage = i18n.language
  const selectorRef = useRef(null)
  const dropdownRef = useRef(null)

  // Opciones de idioma (inglés y español)
  const languages = [
    { code: 'en', name: 'En', short: 'EN' },
    { code: 'es', name: 'Es', short: 'ES' }
  ]

  useGSAP(() => {
    // Animación de entrada del selector
    gsap.from(selectorRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out"
    })

    // Efecto hover con GSAP
    const buttons = gsap.utils.toArray('.language-option')
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          x: 4,
          duration: 0.3,
          ease: "power2.out"
        })
      })
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })
  }, [])

  const handleLanguageChange = (lng) => {
    gsap.to(dropdownRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        changeLanguage(lng)
        setIsOpen(false)
      }
    })
  }

  return (
    <div className="language-selector-container" ref={selectorRef}>
      <motion.div 
        className="language-selector"
        initial={false}
        animate={{
          backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0)',
          transition: { duration: 0.3 }
        }}
      >
        <motion.button 
          className="current-language"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.05)'
          }}
          whileTap={{ 
            scale: 0.95,
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <span className="language-code">
            {languages.find(lang => lang.code === currentLanguage)?.short || 'EN'}
          </span>
          <motion.span
            className="language-chevron"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            ⌄
          </motion.span>
        </motion.button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              ref={dropdownRef}
              className="language-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                  type: 'spring', 
                  stiffness: 500,
                  damping: 25
                }
              }}
              exit={{ 
                opacity: 0, 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              {languages.map((lang) => (
                <motion.li 
                  key={lang.code}
                  className="language-option-container"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.1 * languages.indexOf(lang) }
                  }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
                  >
                    <span className="language-name">{lang.name}</span>
                    {currentLanguage === lang.code && (
                      <motion.span 
                        className="active-indicator"
                        layoutId="activeLanguage"
                        transition={{ type: 'spring', stiffness: 500 }}
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default LanguageSelector