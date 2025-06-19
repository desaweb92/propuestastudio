import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import GalleryItem from '../components/GalleryItem'
import { fadeIn } from '../utils/animations'

const Gallery = () => {
  const { t } = useTranslation()
  const galleryRef = useRef(null)
  const gsapContext = useGsapContext(galleryRef)

  // Datos de ejemplo para la galería
  const galleryItems = [
    {
      id: 1,
      image: '/images/gallery1.jpg',
      title: 'Oceanview Residence',
      category: t('residential')
    },
    {
      id: 2,
      image: '/images/gallery2.jpg',
      title: 'Financial District Tower',
      category: t('corporate')
    },
    {
      id: 3,
      image: '/images/gallery3.jpg',
      title: 'Urban Shopping Complex',
      category: t('retail')
    },
    {
      id: 4,
      image: '/images/gallery4.jpg',
      title: 'Tech Campus',
      category: t('educational')
    },
    {
      id: 5,
      image: '/images/gallery5.jpg',
      title: 'Industrial Park',
      category: t('industrial')
    },
    {
      id: 6,
      image: '/images/gallery6.jpg',
      title: 'Coastal Master Plan',
      category: t('masterPlanning')
    }
  ]

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
      
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <GalleryItem 
            key={item.id}
            image={item.image}
            title={item.title}
            category={item.category}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery