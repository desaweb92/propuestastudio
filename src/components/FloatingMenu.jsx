import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FloatingMenu = () => {
  const { t } = useTranslation()
  const menuRef = useRef(null)
  const gsapContext = useGsapContext(menuRef)

  const categories = [
    'mixedUse', 'residential', 'corporate', 'retail', 
    'educational', 'industrial', 'masterPlanning', 'urbanDesign'
  ]

  useEffect(() => {
    gsapContext(() => {
      gsap.from('.floating-menu-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: menuRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      gsap.to('.floating-menu', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5
      })
    })
  }, [gsapContext])

  return (
    <div ref={menuRef} className="floating-menu">
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="floating-menu-item">
            <a href={`#${category}`}>{t(category)}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FloatingMenu