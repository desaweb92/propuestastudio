import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { fadeIn, staggerText } from '../utils/animations'
import ImmersiveGallery from '../components/ImmersiveGallery'

const Portfolio = () => {
  const { t } = useTranslation()
  const portfolioRef = useRef(null)
  const gsapContext = useGsapContext(portfolioRef)

  // Datos de ejemplo para el portafolio
  const portfolioItems = [
    {
      id: 1,
      image: '/images/portfolio1.jpg',
      title: 'Luxury Condominiums',
      description: t('portfolioDescription1'),
      category: t('residential')
    },
    {
      id: 2,
      image: '/images/portfolio2.jpg',
      title: 'Corporate Headquarters',
      description: t('portfolioDescription2'),
      category: t('corporate')
    },
    {
      id: 3,
      image: '/images/portfolio3.jpg',
      title: 'Boutique Mall',
      description: t('portfolioDescription3'),
      category: t('retail')
    }
  ]

  useEffect(() => {
    gsapContext(() => {
      fadeIn('.portfolio-title', 1)
      staggerText('.portfolio-category', 0.5, 0.3, 0.1)
    })
  }, [gsapContext])

  return (
    <div ref={portfolioRef} className="portfolio-page">
      <motion.h1 
        className="portfolio-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t('portfolioTitle')}
      </motion.h1>
      
      <div className="portfolio-categories">
        {[
          t('mixedUse'), 
          t('residential'), 
          t('corporate'), 
          t('retail'),
          t('educational'), 
          t('industrial'), 
          t('masterPlanning'), 
          t('urbanDesign')
        ].map((category, index) => (
          <motion.span 
            key={index}
            className="portfolio-category"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.span>
        ))}
      </div>
      
      <ImmersiveGallery items={portfolioItems} />
    </div>
  )
}

export default Portfolio