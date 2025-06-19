import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WelcomeLanding from '../components/WelcomeLanding'
import ClientCounter from '../components/ClientCounter'
import './Home.css'
import Footer from '../components/Footer'

// Registrar plugin de GSAP
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const { t } = useTranslation()
  const homeRef = useRef(null)
  const gsapContext = useGsapContext(homeRef)
  const sectionRefs = useRef([])
  const imageRefs = useRef([])

  // Datos de la empresa


  const services = [
    { title: "Interiorismo Comercial", image: "https://imgur.com/8UzYJDT.jpg" },
    { title: "Desarrollos Residenciales", image: "https://imgur.com/0f2Ispb.jpg" },
    { title: "Proyectos Hospitality", image: "https://imgur.com/XuefQiH.jpg" },
    { title: "Diseño Urbano-Paisajístico", image: "https://imgur.com/jbbr9He.jpg" }
  ]





  useEffect(() => {
  gsapContext(() => {
    // Animación de entrada para secciones con efecto parallax
    sectionRefs.current.forEach((section, i) => {
      // Excluimos el contador de esta animación
      if (!section.classList.contains('about-section')) {
        gsap.from(section, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        })
      }
    })

      // Animación para los servicios con efecto de revelación
      gsap.from(".service-item", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#services-section",
          start: "top 75%"
        }
      })

      // Efecto parallax para imágenes
      imageRefs.current.forEach((img, i) => {
        gsap.fromTo(img,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        )
      })

      // Animación para la galería con efecto de escalado
      gsap.from(".gallery-item", {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#gallery-section",
          start: "top 70%"
        }
      })

      // Efecto de desplazamiento suave para títulos
      gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
          x: -30,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: title,
            start: "top 80%"
          }
        })
      })
    })
  }, [gsapContext])

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  const addImageToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el)
    }
  }

  return (
    <div ref={homeRef} className="home-page">
      {/* Hero Section */}
      <WelcomeLanding />
      
      {/* Sobre Nosotros */}
      <motion.section 
  ref={addToRefs}
  className="about-section"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
>
  <div className="section-container">
    <h2 className="section-title">Diseño Urbano Studio</h2>
    <div className="section-content">
      <div className="about-text">
        <p className="about-description">
          Somos una firma internacional de arquitectura con presencia en EE.UU. y América Latina. 
          Nos especializamos en crear espacios que inspiran y transforman comunidades.
        </p>
        <p className="about-description">
          Bajo la dirección de nuestro fundador Carlos Tovar, combinamos innovación con funcionalidad 
          para dar vida a proyectos arquitectónicos excepcionales.
        </p>
      </div>
      <div className="counter-container" style={{ opacity: 1, visibility: 'visible' }}>
        <ClientCounter />
      </div>
    </div>
  </div>
</motion.section>



      {/* Servicios */}
      <section 
        id="services-section"
        ref={addToRefs}
        className="services-section"
      >
        <div className="section-container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-item"
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-image-container">
                  <img 
                    ref={addImageToRefs}
                    src={service.image} 
                    alt={service.title} 
                    className="service-image"
                  />
                  <div className="service-overlay">
                    <div className="service-icon">{service.icon}</div>
                    <h3 className="service-title">{service.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


  <Footer/>
    </div>
  )
}

export default Home