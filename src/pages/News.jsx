import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const newsRef = useRef(null);
  const sectionRefs = useRef([]);
  const statBarsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const addStatBarRef = (el) => {
    if (el && !statBarsRef.current.includes(el)) {
      statBarsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Initialize animations
    const ctx = gsap.context(() => {
      // Main title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });

      // Floating animation for texts
      gsap.to(titleRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(subtitleRef.current, {
        y: -5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // Side images animation
      gsap.from(leftImageRef.current, {
        x: -300,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftImageRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(rightImageRef.current, {
        x: 300,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightImageRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Section animations
      sectionRefs.current.forEach((section, index) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // Stats bars animation
      statBarsRef.current.forEach((bar, index) => {
        const width = bar.dataset.width;
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar.parentElement,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, newsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={newsRef} className="news-page">
      {/* Sección de Bienvenida con Background Image */}
      <motion.section
        className="welcome-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(https://i.imgur.com/dAPMn7j.jpg)`,
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <div className="welcome-overlay"></div>

        <div className="welcome-content">
          <motion.h1
            ref={titleRef}
            className="welcome-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              fontSize: "8rem",
              color: "#fff",
              textAlign: "center",
              marginBottom: "1rem",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            HI, WYNWOOD
          </motion.h1>

          <motion.div
            ref={subtitleRef}
            className="welcome-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2>¡ESTAMOS AQUÍ!</h2>
            <p>
              NOS ENCANTA TRAER NUESTRA EXPERIENCIA A MIAMI, DONDE LA VISIÓN SE
              UNE A LA INNOVACIÓN.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Side Images Section */}
      <section
        className="side-images-section"
        style={{
          padding: "4rem 0",
          backgroundColor: "#f8f8f8",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            "@media (max-width: 768px)": {
              flexDirection: "column",
            },
          }}
        >
          <div
            ref={leftImageRef}
            style={{
              width: "50%",
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              "@media (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            <img
              src="https://i.imgur.com/2EA9DJ9.jpg"
              alt="Diseño arquitectónico"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) =>
                gsap.to(e.target, { scale: 1.05, duration: 0.5 })
              }
              onMouseLeave={(e) =>
                gsap.to(e.target, { scale: 1, duration: 0.5 })
              }
            />
          </div>
          <div
            ref={rightImageRef}
            style={{
              width: "50%",
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              "@media (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            <img
              src="https://i.imgur.com/2EA9DJ9.jpg"
              alt="Proyecto arquitectónico"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) =>
                gsap.to(e.target, { scale: 1.05, duration: 0.5 })
              }
              onMouseLeave={(e) =>
                gsap.to(e.target, { scale: 1, duration: 0.5 })
              }
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section
        className="contacto-section"
        ref={addToRefs}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: "#f8f8f8",
          padding: "6rem 0",
          position: "relative",
          fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <div
          className="container2"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            position: "relative",
            zIndex: "1",
          }}
        >
          <h2
            className="section-title-contactanos"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "300",
              letterSpacing: "-0.5px",
              marginBottom: "1.5rem",
              color: "#222",
              lineHeight: "1.2",
              textAlign: "center",
              position: "relative",
            }}
          >
            CONTÁCTANOS
            <span
              style={{
                content: '""',
                display: "block",
                width: "80px",
                height: "1px",
                background: "#222",
                margin: "1.5rem auto 0",
                opacity: "0.2",
              }}
            />
          </h2>

          <div
            className="contact-info2"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              fontSize: "1.1rem",
              color: "#555",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <p
              style={{
                margin: "0",
                padding: "0",
                position: "relative",
                transition: "all 0.3s ease",
                lineHeight: "1.8",
                fontWeight: "400",
              }}
            >
              contacto@disenourbanostudio.com
            </p>

            <p
              style={{
                margin: "0",
                padding: "0",
                position: "relative",
                transition: "all 0.3s ease",
                lineHeight: "1.8",
                fontWeight: "400",
              }}
            >
              Teléfono: (484) 937-9707
            </p>

            <p
              style={{
                margin: "0",
                padding: "0",
                position: "relative",
                transition: "all 0.3s ease",
                lineHeight: "1.8",
              }}
            >
              252 NW 29th St, FL 9, Miami, FL 33127
            </p>

            <p
              style={{
                margin: "0",
                padding: "0 0 2px 0",
                position: "relative",
                transition: "all 0.3s ease",
                lineHeight: "1.8",
                borderBottom: "1px solid #ccc",
              }}
            >
              www.diseurbanostudio.com
            </p>
          </div>
        </div>

        <style jsx>{`
          .contacto-section::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.9) 0%,
              rgba(255, 255, 255, 0) 100%
            );
            z-index: 0;
          }

          p {
            position: relative;
          }

          p:hover {
            transform: translateX(5px);
            color: #222;
          }

          p::before {
            content: "";
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background-color: #222;
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          p:hover::before {
            opacity: 1;
          }

          @media (max-width: 768px) {
            .contacto-section {
              padding: 4rem 0;
            }

            .section-title-contactanos {
              font-size: clamp(1.8rem, 5vw, 2.5rem);
              margin-bottom: 1rem;
            }

            .contact-info2 {
              font-size: 1rem;
              gap: 1rem;
            }
          }
        `}</style>
      </motion.section>

      {/* Roots Section */}
      <motion.section
        className="roots-section"
        ref={addToRefs}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          padding: "8rem 0",
          backgroundColor: "#fafafa",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            position: "relative",
          }}
        >
          {/* Decorative elements */}
          <div
            className="decorative-line"
            style={{
              position: "absolute",
              top: "50%",
              left: "0",
              width: "100%",
              height: "1px",
              background: "rgba(0,0,0,0.1)",
              zIndex: "0",
            }}
          />

          <div
            className="section-header"
            style={{
              marginBottom: "4rem",
              position: "relative",
              zIndex: "1",
            }}
          >
            <motion.span
              className="section-tag"
              style={{
                display: "block",
                fontSize: "0.9rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#8B5A2B",
                marginBottom: "1rem",
                opacity: 0,
                y: 20,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ROOTS
            </motion.span>

            <motion.h2
              className="section-title"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "300",
                letterSpacing: "-0.5px",
                margin: "0",
                color: "#222",
                lineHeight: "1.2",
                opacity: 0,
                y: 20,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Wayuu Terrace El Rubí
            </motion.h2>
          </div>

          <div
            className="section-content"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              position: "relative",
              zIndex: "1",
              "@media (max-width: 768px)": {
                gridTemplateColumns: "1fr",
              },
            }}
          >
            <motion.div
              className="section-text"
              style={{
                paddingRight: "2rem",
                opacity: 0,
                x: -20,
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#555",
                  marginBottom: "2rem",
                }}
              >
                El proyecto "Terraza Wayuu, El Rubí" se inspira profundamente en
                los ricos tejidos de la cultura Wayuu, particularmente en su
                diseño interior, conectando profundamente con la herencia de su
                fundador y la visión de Diseño Urbano Studio (ñ | DUS).
              </motion.p>

              <motion.p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#555",
                }}
              >
                Nacido en Santa Marta, el fundador canaliza sus raíces
                culturales en el diseño arquitectónico holístico, incorporando a
                la perfección elementos como el tradicional chinchorro, la
                mística noche guajira y la ingeniosa iluminación indirecta del
                techo.
              </motion.p>
            </motion.div>

            <div
              className="section-images"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                "@media (max-width: 768px)": {
                  gridTemplateColumns: "1fr",
                  marginTop: "2rem",
                },
              }}
            >
              <motion.div
                style={{
                  overflow: "hidden",
                  borderRadius: "4px",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  height: "400px",
                  position: "relative",
                  opacity: 0,
                  scale: 0.95,
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget.querySelector("img"), {
                    scale: 1.05,
                    duration: 0.8,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget.querySelector("img"), {
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                  });
                }}
              >
                <motion.img
                  src="https://imgur.com/Ir2k4K7.jpg"
                  alt="Wayuu textiles"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.8s ease",
                  }}
                />
              </motion.div>

              <motion.div
                style={{
                  overflow: "hidden",
                  borderRadius: "4px",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  height: "400px",
                  position: "relative",
                  marginTop: "2rem",
                  opacity: 0,
                  scale: 0.95,
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget.querySelector("img"), {
                    scale: 1.05,
                    duration: 0.8,
                    ease: "power2.out",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget.querySelector("img"), {
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                  });
                }}
              >
                <motion.img
                  src="https://imgur.com/YEAdQfT.jpg"
                  alt="Terrace design"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.8s ease",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* GSAP Animations */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .section-title:hover {
            animation: float 3s ease-in-out infinite;
          }

          @media (max-width: 768px) {
            .roots-section {
              padding: 4rem 0;
            }

            .section-content {
              gap: 2rem;
            }

            .section-images {
              gap: 1rem;
            }
          }
        `}</style>
      </motion.section>

      {/* Stats Section */}
      <motion.section
  className="stats-section"
  ref={addToRefs}
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <style>{`
    .stats-section {
      background: #777;
      padding: 80px 20px;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }
    .stats-container {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    .stat-item {
      position: relative;
    }
    .stat-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: white;
    }
    .stat-info span:first-child {
      font-size: 16px;
      max-width: 70%;
      line-height: 1.4;
    }
    .stat-value {
      color: #D4AF37;
      font-weight: bold;
      font-size: 20px;
    }
    .stat-info small {
      display: block;
      color: rgba(255,255,255,0.7);
      font-size: 13px;
      margin-top: 5px;
    }
    .stat-bar-container {
      height: 6px;
      width: 100%;
      background: rgba(255,255,255,0.1);
      border-radius: 3px;
      overflow: hidden;
    }
    .stat-bar {
      height: 100%;
      width: 0;
      background: linear-gradient(90deg, #D4AF37, #F5E6AB);
      border-radius: 3px;
      position: relative;
    }
    .stat-bar::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: white;
      box-shadow: 0 0 8px white;
    }
  `}</style>

  <div className="container">
    <div className="stats-container">
      <div className="stat-item">
        <div className="stat-info">
          <span>100% integrative process between architectural and engineering teams</span>
          <span className="stat-value">100%</span>
        </div>
        <div className="stat-bar-container">
          <div 
            className="stat-bar" 
            ref={el => {
              if (el && typeof gsap !== 'undefined') {
                gsap.to(el, {
                  width: '100%',
                  duration: 1.5,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%'
                  }
                });
              }
            }}
          />
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-info">
          <span>75% implementation of key sustainable water consumption</span>
          <span className="stat-value">75%</span>
        </div>
        <div className="stat-bar-container">
          <div 
            className="stat-bar"
            ref={el => {
              if (el && typeof gsap !== 'undefined') {
                gsap.to(el, {
                  width: '75%',
                  duration: 1.5,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%'
                  }
                });
              }
            }}
          />
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-info">
          <span>35% reduction in potable water consumption</span>
          <span className="stat-value">35%</span>
        </div>
        <div className="stat-bar-container">
          <div 
            className="stat-bar"
            ref={el => {
              if (el && typeof gsap !== 'undefined') {
                gsap.to(el, {
                  width: '35%',
                  duration: 1.5,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%'
                  }
                });
              }
            }}
          />
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-info">
          <span>32% energy consumption reduction</span>
          <span className="stat-value">32%</span>
        </div>
        <div className="stat-bar-container">
          <div 
            className="stat-bar"
            ref={el => {
              if (el && typeof gsap !== 'undefined') {
                gsap.to(el, {
                  width: '32%',
                  duration: 1.5,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%'
                  }
                });
              }
            }}
          />
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-info">
          <span>25% post-consumer and 50% pre-consumer content in materials</span>
          <span className="stat-value">25% / 50%</span>
          <small>use of FSC forest stewardship wood</small>
        </div>
        <div className="stat-bar-container">
          <div 
            className="stat-bar"
            ref={el => {
              if (el && typeof gsap !== 'undefined') {
                gsap.to(el, {
                  width: '50%',
                  duration: 1.5,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%'
                  }
                });
              }
            }}
          />
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-info">
          <span>100% natural ventilation, HVAC, and natural views for all units</span>
          <span className="stat-value">100%</span>
          <small>75% of low-VOC products used in finishes</small>
        </div>
        <div className="stat-bar-container">
          <div 
            className="stat-bar"
            ref={el => {
              if (el && typeof gsap !== 'undefined') {
                gsap.to(el, {
                  width: '100%',
                  duration: 1.5,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%'
                  }
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  </div>
</motion.section>

      {/* Eco Section */}
      <motion.section
        className="eco-section"
        ref={addToRefs}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          padding: "10rem 0",
          background: "linear-gradient(to bottom, #f5f9f0 0%, #ffffff 100%)",
          overflow: "hidden",
        }}
      >
        {/* Organic shape background */}
        <div
          className="eco-shape"
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "60%",
            height: "140%",
            background: "rgba(123, 188, 90, 0.05)",
            borderRadius: "60%",
            filter: "blur(60px)",
            zIndex: "0",
          }}
        />

        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            position: "relative",
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Section Header */}
          <motion.div
            className="section-header"
            style={{
              textAlign: "center",
              marginBottom: "5rem",
              maxWidth: "800px",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="section-tag"
              style={{
                display: "inline-block",
                fontSize: "0.9rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#7bbc5a",
                marginBottom: "1.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "rgba(123, 188, 90, 0.1)",
                borderRadius: "50px",
                opacity: 0,
                y: 20,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ECO
            </motion.span>

            <motion.h2
              className="section-title"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: "350",
                letterSpacing: "-1px",
                margin: "0 0 1.5rem 0",
                color: "#2a3b24",
                lineHeight: "1.1",
                background: "linear-gradient(90deg, #2a3b24, #7bbc5a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: 0,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Parque 100
            </motion.h2>

            <motion.div
              style={{
                width: "80px",
                height: "3px",
                background:
                  "linear-gradient(90deg, #7bbc5a, rgba(123, 188, 90, 0))",
                margin: "0 auto",
                opacity: 0,
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>

          {/* Section Content */}
          <div
            className="section-content"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
              "@media (max-width: 768px)": {
                gridTemplateColumns: "1fr",
                gap: "3rem",
              },
            }}
          >
            {/* Text Content */}
            <motion.div
              className="section-text"
              style={{
                opacity: 0,
                x: -30,
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <motion.p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.9",
                  color: "#3a4a32",
                  marginBottom: "2rem",
                  fontWeight: "350",
                }}
              >
                Las métricas y los resultados de cada categoría reflejan la
                adopción de criterios de certificaciones como{" "}
                <strong>LEED</strong>, <strong>Energy Star</strong>y{" "}
                <strong>EDGE Buildings</strong>. Creemos en prácticas de
                construcción sostenibles para minimizar el impacto ambiental y
                mejorar la eficiencia energética.
              </motion.p>

              <motion.p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.9",
                  color: "#3a4a32",
                  fontWeight: "350",
                }}
              >
                En el Proyecto <strong>Plainfield Park 100</strong>, utilizamos
                soluciones innovadoras para reducir las emisiones de carbono,
                disminuir los costos operativos y mejorar la calidad del aire
                interior.
              </motion.p>

              {/* Eco badges */}
              <motion.div
                className="eco-badges"
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "3rem",
                  opacity: 0,
                  y: 20,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {["LEED", "Energy Star", "EDGE"].map((badge, i) => (
                  <motion.span
                    key={badge}
                    style={{
                      padding: "0.5rem 1.2rem",
                      backgroundColor: "rgba(37, 46, 33, 0.1)",
                      color: "#7bbc5a",
                      borderRadius: "50px",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                      letterSpacing: "1px",
                      border: "1px solid rgba(18, 34, 10, 0.3)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(123, 188, 90, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Image Content */}
            <motion.div
              className="section-image"
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                opacity: 0,
                scale: 0.95,
                y: 30,
              }}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <motion.img
                src="https://imgur.com/1HxupTn.jpg"
                alt="Sustainable building"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
              />

              {/* Image overlay effect */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(180deg, rgba(123, 188, 90, 0) 0%, rgba(123, 188, 90, 0.03) 100%)",
                  mixBlendMode: "multiply",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Floating leaves decoration */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "5%",
            width: "100px",
            height: "100px",
            backgroundImage: "url(/images/leaf-pattern.svg)",
            backgroundRepeat: "no-repeat",
            opacity: "0.1",
            zIndex: "0",
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* GSAP Animations */}
        <style jsx>{`
          .section-title {
            position: relative;
            display: inline-block;
          }

          .section-title::after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: #7bbc5a;
            transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .section-title:hover::after {
            width: 100%;
          }

          @media (max-width: 768px) {
            .eco-section {
              padding: 6rem 0;
            }

            .section-header {
              margin-bottom: 3rem;
            }

            .eco-badges {
              justify-content: center;
            }
          }
        `}</style>
      </motion.section>

      {/* Heritage Section */}
<motion.section
  className="heritage-section"
  ref={addToRefs}
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8 }}
  style={{
    position: 'relative',
    padding: '8rem 0',
    backgroundColor: '#fff',
    overflow: 'hidden'
  }}
>
  {/* Fondo texturado sutil */}
  <div 
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url(/images/subtle-texture.png)',
      opacity: 0.03,
      zIndex: 0
    }}
  />
  
  <div 
    className="container"
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 1
    }}
  >
    {/* Línea decorativa vertical */}
    <div 
      style={{
        position: 'absolute',
        left: '2rem',
        top: 0,
        height: '100%',
        width: '1px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        '@media (max-width: 768px)': {
          display: 'none'
        }
      }}
    />
    
    {/* Header centrado */}
    <motion.div
      className="section-header"
      style={{
        marginBottom: '5rem',
        textAlign: 'center',
        position: 'relative'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.span
        className="section-tag"
        style={{
          display: 'block',
          fontSize: '0.9rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#8B5A2B', // Tonos tierra para heritage
          marginBottom: '1.5rem',
          opacity: 0,
          y: 10
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        HERITAGE
      </motion.span>
      
      <motion.h2
        className="section-title"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '300',
          letterSpacing: '-0.5px',
          margin: '0 auto',
          color: '#222',
          lineHeight: '1.2',
          maxWidth: '800px',
          position: 'relative',
          display: 'inline-block'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Neuweiler en Allentown
        <span 
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '1px',
            backgroundColor: '#8B5A2B',
            opacity: 0
          }}
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 0.5, width: '80px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </motion.h2>
    </motion.div>
    
    {/* Contenido en grid */}
    <div 
      className="section-content"
      style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}
    >
      {/* Imagen con efecto vintage sofisticado */}
      <motion.div
        className="section-image"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '4px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
          height: '600px',
          opacity: 0,
          x: -30
        }}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onMouseEnter={() => {
          gsap.to('.section-image img', { 
            scale: 1.03,
            duration: 1.2,
            ease: 'power2.out'
          });
          gsap.to('.vintage-overlay', {
            opacity: 0,
            duration: 0.8
          });
        }}
        onMouseLeave={() => {
          gsap.to('.section-image img', { 
            scale: 1,
            duration: 1.2,
            ease: 'power2.out'
          });
          gsap.to('.vintage-overlay', {
            opacity: 0.15,
            duration: 0.8
          });
        }}
      >
        <motion.img
          src="https://imgur.com/rAbYd5H.jpg"
          alt="Brewery restoration"
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        
        {/* Overlay vintage sutil */}
        <div 
          className="vintage-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(139, 90, 43, 0.15) 0%, rgba(0,0,0,0) 100%)',
            mixBlendMode: 'multiply',
            opacity: 0.15,
            transition: 'opacity 0.8s ease'
          }}
        />
      </motion.div>
      
      {/* Texto con animación escalonada */}
      <motion.div
        className="section-text"
        style={{
          paddingLeft: '2rem',
          opacity: 0,
          y: 30
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.9',
            color: '#555',
            marginBottom: '2rem',
            position: 'relative',
            paddingLeft: '1.5rem'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span 
            style={{
              position: 'absolute',
              left: 0,
              top: '0.7em',
              width: '4px',
              height: '4px',
              backgroundColor: '#8B5A2B',
              borderRadius: '50%'
            }}
          />
          La restauración no se trata solo de actualizar; se trata de
          preservar la historia única de cada espacio. A través del
          proyecto Neuweiler en Allentown, Pensilvania, nuestra firma
          valora el equilibrio entre lo antiguo y lo moderno, creando
          diseños que respetan el pasado y satisfacen las necesidades
          actuales.
        </motion.p>
        
        <motion.p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.9',
            color: '#555',
            position: 'relative',
            paddingLeft: '1.5rem'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span 
            style={{
              position: 'absolute',
              left: 0,
              top: '0.7em',
              width: '4px',
              height: '4px',
              backgroundColor: '#8B5A2B',
              borderRadius: '50%'
            }}
          />
          Este proyecto, que transforma una cervecería histórica en
          espacios con apartamentos y tiendas, resalta nuestro compromiso
          de crear entornos atemporales y hermosos, asegurando que cada
          lugar continúe contando su historia durante generaciones.
        </motion.p>
        
        {/* Botón elegante */}
        <motion.div
          style={{
            marginTop: '3rem',
            opacity: 0,
            y: 20
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button
            style={{
              padding: '0.8rem 2rem',
              backgroundColor: 'transparent',
              color: '#8B5A2B',
              border: '1px solid #8B5A2B',
              borderRadius: '50px',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                backgroundColor: '#8B5A2B',
                color: '#fff',
                duration: 0.4
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                backgroundColor: 'transparent',
                color: '#8B5A2B',
                duration: 0.4
              });
            }}
          >
            EXPLORAR PROYECTO
          </button>
        </motion.div>
      </motion.div>
    </div>
  </div>

  {/* Animaciones GSAP personalizadas */}
  <style jsx>{`
    .section-title:hover span {
      animation: lineGrow 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    }
    
    @keyframes lineGrow {
      0% { width: 80px; opacity: 0.5; }
      50% { width: 100%; opacity: 0.8; }
      100% { width: 80px; opacity: 0.5; }
    }
    
    @media (max-width: 768px) {
      .heritage-section {
        padding: 4rem 0;
      }
      
      .section-text {
        padding-left: 0;
        margin-top: 2rem;
      }
      
      .section-image {
        height: 400px;
      }
    }
  `}</style>
</motion.section>

      <Footer />
    </div>
  );
};

export default News;
