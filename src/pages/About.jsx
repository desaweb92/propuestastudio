import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { fadeIn } from '../utils/animations'

const About = () => {
  const { t } = useTranslation()
  const galleryRef = useRef(null)
  const gsapContext = useGsapContext(galleryRef)



  useEffect(() => {
    gsapContext(() => {
      fadeIn('.gallery-title', 1)
      gsap.from('.gallery-intro', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3
      })
    })
  }, [gsapContext])

  return (
    <div ref={galleryRef} className="gallery-page">
      <div className="gallery-header">
        <motion.h1 
          className="gallery-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('explore')}
        </motion.h1>
        <p className="gallery-intro">
          {t('galleryDescription')}
        </p>
      </div>
      
    
    </div>
  )
}

export default About