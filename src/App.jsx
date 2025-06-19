import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import FloatingMenu from './components/FloatingMenu'
import PortfolioButton from './components/PortfolioButton'
import './assets/styles/main.css'
import About from './pages/About'
import News from './pages/News'

function App() {
  const { i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showPortfolioButton, setShowPortfolioButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowPortfolioButton(true)
      } else {
        setShowPortfolioButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <Router>
      <div className="app">
        <Header 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          changeLanguage={changeLanguage}
        />
        
        {!isMenuOpen && <FloatingMenu />}
        
        <AnimatePresence>
          {showPortfolioButton && <PortfolioButton />}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
           <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App