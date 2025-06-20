import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGsapContext } from '../hooks/useGsapContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './MenuStyles.css';

gsap.registerPlugin(ScrollTrigger);

const FloatingMenu = () => {
  const { t } = useTranslation();
  const menuRef = useRef(null);
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
      });

      gsap.to('.floating-menu', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5
      });
    });
  }, [gsapContext]);

  return (
    <div ref={menuRef} className="floating-menu">
      <div className="floating-menu-inner">
        {/* Sección de enlaces principales */}
        <div className="floating-menu-section">
          <h3 className="floating-menu-section-title">{t('navigation')}</h3>
          <ul>
            {mainLinks.map((link, index) => (
              <li key={`main-${index}`} className="floating-menu-item main-link">
                <Link to={link.path}>{t(link.label)}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Separador elegante */}
        <div className="floating-menu-divider"></div>

        {/* Sección de categorías */}
        <div className="floating-menu-section">
          <h3 className="floating-menu-section-title">{t('categories')}</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={`cat-${index}`} className="floating-menu-item">
                <a href={`#${category}`}>{t(category)}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;