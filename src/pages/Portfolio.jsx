import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const { t } = useTranslation();
  const portfolioRef = useRef(null);
  const magazineContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const portfolioItems = [
    {
      id: 1,
      images: [
        'https://imgur.com/8UzYJDT.jpg',
        'https://imgur.com/0f2Ispb.jpg',
        'https://imgur.com/XuefQiH.jpg'
      ],
      title: 'Luxury Condominiums',
      description: t('portfolioDescription1'),
      category: 'residential',
      year: '2023',
      location: 'Miami, FL',
      size: '25,000 sqft',
      client: 'Private Investor'
    },
    {
      id: 2,
      images: [
        'https://imgur.com/jbbr9He.jpg',
        'https://imgur.com/dAPMn7j.jpg',
        'https://imgur.com/ESp0r14.jpg'
      ],
      title: 'Corporate Headquarters',
      description: t('portfolioDescription2'),
      category: 'corporate',
      year: '2022',
      location: 'New York, NY',
      size: '50,000 sqft',
      client: 'Fortune 500 Company'
    },
    {
      id: 3,
      images: [
        'https://imgur.com/p9YlwY6.jpg',
        'https://imgur.com/aJfoeK1.jpg',
        'https://imgur.com/BAfeZwm.jpg'
      ],
      title: 'Boutique Mall',
      description: t('portfolioDescription3'),
      category: 'retail',
      year: '2021',
      location: 'Los Angeles, CA',
      size: '75,000 sqft',
      client: 'Luxury Retail Group'
    },
  ];

  // Manejo de eventos táctiles
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diffX = touchStartX - touchEndX;
    const threshold = 50; // Mínimo desplazamiento para cambiar de página
    
    if (diffX > threshold) {
      // Deslizamiento hacia la izquierda (siguiente página)
      flipPage(1);
    } else if (diffX < -threshold) {
      // Deslizamiento hacia la derecha (página anterior)
      flipPage(-1);
    }
    
    setIsDragging(false);
  };

  // Manejo de eventos de ratón (arrastre)
  const handleMouseDown = (e) => {
    setTouchStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEndX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const diffX = touchStartX - touchEndX;
    const threshold = 100; // Mínimo desplazamiento para cambiar de página
    
    if (diffX > threshold) {
      flipPage(1);
    } else if (diffX < -threshold) {
      flipPage(-1);
    }
    
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleFlipStart = () => {
    setIsFlipping(true);
    setIsAnimating(true);
  };

  const handleFlipEnd = () => {
    setIsFlipping(false);
    setIsAnimating(false);
  };

  const flipPage = (direction) => {
    if (isAnimating) return;
    
    setDirection(direction);
    handleFlipStart();
    
    const newPage = currentPage + direction;
    
    if (newPage >= 0 && newPage < portfolioItems.length) {
      // Animación de volteo
      gsap.to({ flipProgress: 0 }, {
        flipProgress: 180 * direction,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => setFlipProgress(gsap.getProperty(this, "flipProgress")),
        onComplete: () => {
          setCurrentPage(newPage);
          setFlipProgress(0);
          handleFlipEnd();
        }
      });
    } else {
      // Efecto de rebote
      gsap.to({ flipProgress: 0 }, {
        flipProgress: 30 * direction,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        onUpdate: () => setFlipProgress(gsap.getProperty(this, "flipProgress")),
        onComplete: handleFlipEnd
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-title', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out'
      });

      gsap.from('.portfolio-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
      });

      gsap.from('.page-controls', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
      });
    }, portfolioRef);

    return () => ctx.revert();
  }, []);

  const getPageTransform = (progress, direction) => {
    const angle = Math.min(Math.abs(progress), 180);
    const rotation = progress;
    const xPos = direction === 1 ? 
      Math.sin(angle * Math.PI / 180) * 100 : 
      -Math.sin(angle * Math.PI / 180) * 100;
    
    return {
      rotateY: rotation,
      x: xPos,
      z: -Math.abs(Math.cos(angle * Math.PI / 180) * 50),
      transformOrigin: direction === 1 ? 'left center' : 'right center',
      opacity: 1 - Math.abs(progress) / 180,
      zIndex: 100 - Math.abs(progress)
    };
  };

  return (
    <div ref={portfolioRef} className="portfolio-magazine">
      <div className="magazine-hero">
        <motion.h1 className="portfolio-title">
          {t('portfolioTitle')}
        </motion.h1>
        <motion.p className="portfolio-subtitle">
          {t('portfolioSubtitle')}
        </motion.p>
      </div>
      
      <div className="magazine-viewport">
        <div className="page-controls">
          <button 
            className={`control prev ${currentPage === 0 ? 'disabled' : ''}`}
            onClick={() => flipPage(-1)}
            disabled={currentPage === 0 || isAnimating}
          >
            ← {t('previousPage')}
          </button>
          
          <span className="page-indicator">
            {currentPage + 1} / {portfolioItems.length}
          </span>
          
          <button 
            className={`control next ${currentPage === portfolioItems.length - 1 ? 'disabled' : ''}`}
            onClick={() => flipPage(1)}
            disabled={currentPage === portfolioItems.length - 1 || isAnimating}
          >
            {t('nextPage')} →
          </button>
        </div>

        <div 
          ref={magazineContainerRef}
          className="magazine-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Página actual */}
          <motion.div 
            className="magazine-page current-page"
            style={isFlipping ? getPageTransform(flipProgress, direction) : {}}
          >
            <div className="page-left">
              <div className="project-images">
                {portfolioItems[currentPage].images.map((image, index) => (
                  <motion.div 
                    key={index}
                    className="image-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <img 
                      src={image} 
                      alt={`${portfolioItems[currentPage].title} - ${index + 1}`} 
                      className="project-image"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="page-right">
              <div className="project-details">
                <h2 className="project-title">{portfolioItems[currentPage].title}</h2>
                
                <div className="project-meta">
                  <div className="meta-item">
                    <span className="meta-label">{t('year')}</span>
                    <span className="meta-value">{portfolioItems[currentPage].year}</span>
                  </div>
                  
                  <div className="meta-item">
                    <span className="meta-label">{t('location')}</span>
                    <span className="meta-value">{portfolioItems[currentPage].location}</span>
                  </div>
                  
                  <div className="meta-item">
                    <span className="meta-label">{t('size')}</span>
                    <span className="meta-value">{portfolioItems[currentPage].size}</span>
                  </div>
                  
                  <div className="meta-item">
                    <span className="meta-label">{t('client')}</span>
                    <span className="meta-value">{portfolioItems[currentPage].client}</span>
                  </div>
                </div>
                
                <p className="project-description">
                  {portfolioItems[currentPage].description}
                </p>
                
                <div className="project-category">
                  {portfolioItems[currentPage].category}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sombra de página durante el volteo */}
          {isFlipping && (
            <motion.div 
              className="magazine-page flipping-page"
              style={getPageTransform(flipProgress - 180 * direction, -direction)}
            >
              <div className="page-content">
                {direction === 1 ? (
                  <div className="page-left">
                    <div className="project-images">
                      {portfolioItems[Math.min(currentPage + 1, portfolioItems.length - 1)].images.map((image, index) => (
                        <div key={index} className="image-container">
                          <img src={image} className="project-image" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="page-right">
                    <div className="project-details">
                      <h2 className="project-title">{portfolioItems[Math.max(currentPage - 1, 0)].title}</h2>
                      {/* Contenido de la página anterior */}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Portfolio;