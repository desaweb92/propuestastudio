import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ImmersiveGallery = ({ items }) => {
  const { t } = useTranslation()
  const galleryRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const gsapContext = useGsapContext(galleryRef)

  useEffect(() => {
    gsapContext(() => {
      gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i)
        })
      })
    })
  }, [gsapContext, items])

  return (
    <div ref={galleryRef} className="immersive-gallery">
      <div className="gallery-container">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`gallery-item ${index === activeIndex ? 'active' : ''}`}
          >
            <motion.div
              className="gallery-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeIndex ? 1 : 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
              />
            </motion.div>
            <AnimatePresence>
              {index === activeIndex && (
                <motion.div
                  className="gallery-caption"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImmersiveGallery