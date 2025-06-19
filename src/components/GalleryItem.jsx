import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const GalleryItem = ({ image, title, category, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const itemRef = useRef(null)
  const gsapContext = useGsapContext(itemRef)

  useEffect(() => {
    gsapContext(() => {
      gsap.from(itemRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 80%"
        }
      })
    })
  }, [gsapContext, index])

  return (
    <motion.div 
      ref={itemRef}
      className="gallery-item"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div className="gallery-image-container">
        <img 
          src={image} 
          alt={title} 
          className="gallery-image"
          loading="lazy"
        />
        
        <motion.div 
          className="gallery-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="gallery-info"
            initial={{ y: 20 }}
            animate={{ y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{title}</h3>
            <p>{category}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default GalleryItem