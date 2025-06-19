import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'

const ClientCounter = () => {
  const { t } = useTranslation()
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)
  const gsapContext = useGsapContext(counterRef)

  useEffect(() => {
    gsapContext(() => {
      gsap.from(counterRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 1
      })
    })

    // Simular incremento de clientes
    const targetCount = 2453
    const increment = targetCount / 50
    
    const timer = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount + increment
        if (newCount >= targetCount) {
          clearInterval(timer)
          return targetCount
        }
        return newCount
      })
    }, 20)

    return () => clearInterval(timer)
  }, [gsapContext])

  return (
    <motion.div 
      ref={counterRef}
      className="client-counter"
      whileHover={{ scale: 1.05 }}
    >
      <span>{Math.floor(count).toLocaleString()}+</span>
      <span>{t('clients')}</span>
    </motion.div>
  )
}

export default ClientCounter