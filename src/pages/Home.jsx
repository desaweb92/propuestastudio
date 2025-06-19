import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGsapContext } from '../hooks/useGsapContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WelcomeLanding from '../components/WelcomeLanding'
import ClientCounter from '../components/ClientCounter'
import './Home.css'

// Registrar plugin de GSAP
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const { t } = useTranslation()
  const homeRef = useRef(null)
  const gsapContext = useGsapContext(homeRef)
  const sectionRefs = useRef([])
  const imageRefs = useRef([])

  // Datos de la empresa

    const projects = [
    { id: 1, title: "Centro Comercial Galerías", location: "Bogotá, Colombia", image: "https://imgur.com/ltYKdjN.jpg", video: "/videos/project1.mp4" },
    { id: 2, title: "Hotel Boutique Cartagena", location: "Cartagena, Colombia", image: "https://imgur.com/M0FkRgK.jpg", video: "/videos/project2.mp4" },
    { id: 3, title: "Torres del Parque", location: "Miami, EE.UU.", image: "https://imgur.com/ESp0r14.jpg", video: "/videos/project3.mp4" },
    { id: 4, title: "Paisajismo Urbano", location: "Nueva Jersey, EE.UU.", image: "https://imgur.com/dAPMn7j.jpg", video: "/videos/project4.mp4" }
  ]

  const services = [
    { title: "Interiorismo Comercial", image: "https://imgur.com/8UzYJDT.jpg" },
    { title: "Desarrollos Residenciales", image: "https://imgur.com/0f2Ispb.jpg" },
    { title: "Proyectos Hospitality", image: "https://imgur.com/XuefQiH.jpg" },
    { title: "Diseño Urbano-Paisajístico", image: "https://imgur.com/jbbr9He.jpg" }
  ]

  const offices = [
    { city: "Miami", country: "EE.UU.", image: "/images/miami.jpg" },
    { city: "Nueva Jersey", country: "EE.UU.", image: "/images/newjersey.jpg" },
    { city: "Pensilvania", country: "EE.UU.", image: "/images/pennsylvania.jpg" },
    { city: "Bogotá", country: "Colombia", image: "/images/bogota.jpg" }
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

         {/* Galería de proyectos */}
      <section 
        id="gallery-section"
        ref={addToRefs}
        className="gallery-section"
      >
        <div className="section-container">
          <h2 className="section-title">Proyectos Destacados</h2>
          <div className="gallery-grid">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                className="gallery-item"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="gallery-media-container">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="gallery-video"
                    poster={project.image}
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  <div className="gallery-overlay">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-location">{project.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Oficinas */}
      <section 
        ref={addToRefs}
        className="offices-section"
      >
        <div className="section-container">
          <h2 className="section-title">Nuestras Oficinas</h2>
          <div className="offices-grid">
            {offices.map((office, index) => (
              <motion.div 
                key={index} 
                className="office-item"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  ref={addImageToRefs}
                  src={office.image} 
                  alt={`Oficina en ${office.city}`} 
                  className="office-image"
                />
                <div className="office-info">
                  <div className="office-city">{office.city}</div>
                  <div className="office-country">{office.country}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   

      {/* Contacto */}
      <section 
        ref={addToRefs}
        className="contact-section"
      >
        <div className="section-container">
          <h2 className="section-title">Transformemos espacios juntos</h2>
          <div className="contact-content">
            <p className="contact-text">
              ¿Listo para comenzar tu próximo proyecto arquitectónico? Contáctanos para una consulta.
            </p>
            <motion.button
              className="contact-button"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#fff",
                color: "#000"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Contactar
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home