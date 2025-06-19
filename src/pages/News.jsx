import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { fadeIn, slideUp } from '../utils/animations'

const News = () => {
  const { t } = useTranslation()
  const newsRef = useRef(null)
  const gsapContext = useGsapContext(newsRef)

  // Datos de ejemplo para noticias
  const newsItems = [
    {
      id: 1,
      title: t('newsTitle1'),
      date: '2023-10-15',
      excerpt: t('newsExcerpt1'),
      image: '/images/news1.jpg'
    },
    {
      id: 2,
      title: t('newsTitle2'),
      date: '2023-09-28',
      excerpt: t('newsExcerpt2'),
      image: '/images/news2.jpg'
    },
    {
      id: 3,
      title: t('newsTitle3'),
      date: '2023-08-10',
      excerpt: t('newsExcerpt3'),
      image: '/images/news3.jpg'
    }
  ]

  useEffect(() => {
    gsapContext(() => {
      fadeIn('.news-title', 1)
      slideUp('.news-intro', 0.8, 0.3, 20)
      gsap.from('.news-item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.news-grid',
          start: "top 70%"
        }
      })
    })
  }, [gsapContext])

  return (
    <div ref={newsRef} className="news-page">
      <div className="news-header">
        <motion.h1 
          className="news-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('newsTitle')}
        </motion.h1>
        <motion.p 
          className="news-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('newsIntro')}
        </motion.p>
      </div>
      
      <div className="news-grid">
        {newsItems.map((item) => (
          <motion.article 
            key={item.id}
            className="news-item"
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="news-image-container">
              <img 
                src={item.image} 
                alt={item.title} 
                className="news-image"
                loading="lazy"
              />
              <span className="news-date">{item.date}</span>
            </div>
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <button className="news-read-more">{t('readMore')}</button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

export default News