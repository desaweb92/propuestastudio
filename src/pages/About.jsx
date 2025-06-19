import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useGsapContext } from "../hooks/useGsapContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WelcomeLanding from "../components/WelcomeLanding";
import ClientCounter from "../components/ClientCounter";
import "./About.css";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Registrar plugin de GSAP
gsap.registerPlugin(ScrollTrigger);

// Solución para los iconos de marcadores
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para animar el mapa al cargar
const MapAnimation = () => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    setTimeout(() => {
      map.flyTo([10.0, -74.0], 3, {
        duration: 2,
      });
    }, 1000);
  }, [map]);

  return null;
};
const About = () => {
  const { t } = useTranslation();
  const homeRef = useRef(null);
  const gsapContext = useGsapContext(homeRef);
  const sectionRefs = useRef([]);
  const imageRefs = useRef([]);
  const sliderRef = useRef(null);

  // Datos de la empresa
  const projects = [
    {
      id: 1,
      title: "Centro Comercial Galerías",
      location: "Bogotá, Colombia",
      image: "https://imgur.com/ltYKdjN.jpg",
    },
    {
      id: 2,
      title: "Hotel Boutique Cartagena",
      location: "Cartagena, Colombia",
      image: "https://imgur.com/M0FkRgK.jpg",
    },
    {
      id: 3,
      title: "Torres del Parque",
      location: "Miami, EE.UU.",
      image: "https://imgur.com/ESp0r14.jpg",
    },
    {
      id: 4,
      title: "Paisajismo Urbano",
      location: "Nueva Jersey, EE.UU.",
      image: "https://imgur.com/dAPMn7j.jpg",
    },
  ];

  const offices = [
    {
      city: "Miami",
      country: "EE.UU.",
      image: "https://imgur.com/p9YlwY6.jpg",
      text: "30 NW 34th",
      street: "Street Suite 104",
      phone: "(786) 536-7076",
    },
    {
      city: "Nueva Jersey ",
      country: "EE.UU.",
      image: "https://imgur.com/aJfoeK1.jpg",
      street: "Allentown, PA 18102.",
      phone: "(484) 937-9707",
    },
    {
      city: "Pensilvania",
      country: "EE.UU.",
      image: "https://imgur.com/BAfeZwm.jpg",
      street: "Hills, NJ 07078",
      phone: "(484) 937-9707",
    },
    {
      city: "Bogotá",
      country: "Colombia",
      image: "https://imgur.com/aRRsRTm.jpg",
      street: "Calle 93 #15-27 Suite 501-701",
      phone: "+57 (601)7173002",
    },
  ];

  useEffect(() => {
    // Configuración del slider automático
    let currentSlide = 0;
    const slides = document.querySelectorAll(".gallery-item");
    const totalSlides = slides.length;

    const autoSlide = () => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % totalSlides;
      slides[currentSlide].classList.add("active");

      // Animación suave
      gsap.fromTo(
        slides[currentSlide],
        { opacity: 0.8, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      );
    };

    const slideInterval = setInterval(autoSlide, 5000);

    // Animaciones GSAP
    gsapContext(() => {
      sectionRefs.current.forEach((section, i) => {
        if (!section.classList.contains("about-section")) {
          gsap.from(section, {
            opacity: 0,
            y: 80,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      imageRefs.current.forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.from(".section-title", {
        x: -30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 80%",
        },
      });
    });

    return () => clearInterval(slideInterval);
  }, [gsapContext]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const addImageToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  return (
    <div ref={homeRef} className="about-page">
      {/* Sobre Nosotros */}
      <motion.section
        ref={addToRefs}
        className="about-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="section-container">
          <h2 className="section-title">About Us</h2>
          <div className="section-content">
            <div className="about-text">
              <span className="about-description-two">Forward-Thinking.</span>
              <br />
              <span className="about-description-two">
                Architectural Design Studio.
              </span>

              <p className="about-description">
                DUS, Diseño Urbano Studio is an architectural firm specializing
                in Mixed-use developments, multi-family residential, and retail.
                Where innovation, master planning, economic viability, and
                connection to the environment are core principles. With a strong
                presence in the United States and Latin America, with offices in
                Miami, New Jersey, Pennsylvania, and Bogotá Colombia. We design
                spaces that transform lives, offering a sophisticated, inspiring
                design experience tailored to the needs of each client.
              </p>

              {/* Mensaje del fundador */}
              <div className="founder-message">
                <h3 className="founder-title">A Word From Our Founder</h3>
                <blockquote className="founder-quote">
                  "For over two decades, we have dedicated ourselves to the art
                  of architectural excellence, crafting spaces that not only
                  stand the test of time but elevate the human experience. Our
                  philosophy is rooted in the belief that great design emerges
                  from the perfect balance between aesthetic vision and
                  functional pragmatism. Each project we undertake is a
                  testament to our commitment to innovation, sustainability, and
                  the unique narrative of our clients."
                </blockquote>
                <p className="founder-signature">Education</p>
                <p className="founder-signature">
                  Drexel University Bachelor of architecture. Universidad Piloto
                  de Colombia Urban Desing & Architecture. Bogotá, Colombia.
                </p>
                <p className="founder-signature">
                  — Alejandro Mendoza, Founder & Principal Architect
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Oficinas */}
      <section ref={addToRefs} className="offices-section">
        <div className="section-container">
          <h2 className="section-title">Explore Our Offices</h2>
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
                  <div className="office-country">{office.street}</div>
                  <div className="office-country">{office.phone}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de proyectos */}
      <section id="gallery-section" ref={addToRefs} className="gallery-section">
        <div className="section-container">
          <h2 className="section-title">Proyectos Destacados</h2>
          <div className="gallery-slider" ref={sliderRef}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`gallery-item ${index === 0 ? "active" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="gallery-media-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="gallery-image"
                  />
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
      <section ref={addToRefs} className="map-section">
        <div className="section-container">
          <div className="interactive-map">
            <MapContainer 
              center={[10.0, -74.0]} 
              zoom={3} 
              style={{ height: '500px', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {offices.map((office, index) => (
                <Marker key={index} position={office.coordinates || [0, 0]}>
                  <Popup>
                    <div className="map-popup">
                      <h3>{office.city}</h3>
                      <p>{office.street}</p>
                      <p>{office.phone}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
