import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGsapContext } from '../hooks/useGsapContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import './MenuStyles.css';
import LanguageSelector from './LanguageSelector'; // Assuming you have a LanguageSelector component

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const containerRef = useRef(null);
  const gsapContext = useGsapContext(menuRef);

  const categories = [
    'mixedUse', 'residential', 'corporate', 'retail', 
    'educational', 'industrial', 'masterPlanning', 'urbanDesign'
  ];

  const mainLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/news', label: 'News' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsapContext(() => {
        gsap.from('.mobile-menu-item', {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.5
        });
      });
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, gsapContext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={menuRef}
          className="mobile-menu"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mobile-menu-container" ref={containerRef}>
            <div className="mobile-menu-header">
           <img className="mobile-menu-logo" src="https://i.imgur.com/iAjXwj2.png" alt="" />
              <button 
                className="mobile-menu-close-btn"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="mobile-menu-scrollable">
              {/* Sección de enlaces principales */}
              <div className="mobile-menu-section">
                <h3 className="mobile-menu-section-title">{t('navigation')}</h3>
                <ul className="mobile-menu-list">
                  {mainLinks.map((link, index) => (
                    <motion.li 
                      key={`main-${index}`}
                      className="mobile-menu-item main-link"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Link to={link.path} onClick={() => setIsOpen(false)}>
                        {t(link.label)}
                      </Link>
                    </motion.li>
                  ))}

                  <LanguageSelector/>
                </ul>
              </div>

              {/* Sección de categorías */}
              <div className="mobile-menu-section">
                <h3 className="mobile-menu-section-title">{t('categories')}</h3>
                <ul className="mobile-menu-list">
                  {categories.map((category, index) => (
                    <motion.li 
                      key={`cat-${index}`}
                      className="mobile-menu-item"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <a href={`#${category}`} onClick={() => setIsOpen(false)}>
                        {t(category)}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mobile-menu-footer">
              <div className="mobile-menu-social">
                <a href="https://www.instagram.com/disenourbanostudio/">Instagram</a>
                <a href="https://www.linkedin.com/company/dise%C3%B1o-urbano-studio/">LinkedIn</a>
                <a href="https://www.facebook.com/people/Dise%C3%B1o-Urbano-Studio/61557646182130/">Facebook</a>
              </div>
              <p className="mobile-menu-copyright">© {new Date().getFullYear()} Studio Name</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;