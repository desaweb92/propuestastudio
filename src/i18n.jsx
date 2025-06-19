import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      mixedUse: "Mixed Use",
      residential: "Residential",
      corporate: "Corporate",
      retail: "Retail",
      educational: "Educational",
      industrial: "Industrial",
      masterPlanning: "Master Planning",
      urbanDesign: "Urban Design",
      viewPortfolio: "View Portfolio in Horizontal Mode",
      clients: "Satisfied Clients",
      explore: "Explore Our Work",
         galleryDescription: "A curated selection of our most prestigious projects showcasing architectural excellence.",
      portfolioTitle: "Our Portfolio",
      portfolioDescription1: "Luxury waterfront residences with panoramic views and premium amenities.",
      portfolioDescription2: "Modern corporate headquarters designed for innovation and collaboration.",
      portfolioDescription3: "High-end retail space blending commerce with architectural artistry.",
      newsTitle: "News & Updates",
      newsIntro: "Stay informed about our latest projects, awards and company news.",
      newsTitle1: "Award-Winning Design Recognized",
      newsExcerpt1: "Our latest residential project has received the International Architecture Award.",
      newsTitle2: "New Sustainable Development",
      newsExcerpt2: "Announcing our eco-friendly mixed-use complex in the city center.",
      newsTitle3: "Exhibition Opening",
      newsExcerpt3: "Join us for the opening of our architectural exhibition at the Modern Art Museum.",
      readMore: "Read More"
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      mixedUse: "Uso Mixto",
      residential: "Residencial",
      corporate: "Corporativo",
      retail: "Comercial",
      educational: "Educativo",
      industrial: "Industrial",
      masterPlanning: "Planificación Maestra",
      urbanDesign: "Diseño Urbano",
      viewPortfolio: "Ver Portafolio en Modo Horizontal",
      clients: "Clientes Satisfechos",
      explore: "Explora Nuestro Trabajo",
        galleryDescription: "Una selección curada de nuestros proyectos más prestigiosos que muestran excelencia arquitectónica.",
      portfolioTitle: "Nuestro Portafolio",
      portfolioDescription1: "Residencias de lujo frente al mar con vistas panorámicas y amenidades premium.",
      portfolioDescription2: "Sede corporativa moderna diseñada para la innovación y colaboración.",
      portfolioDescription3: "Espacio comercial de alta gama combinando comercio con arte arquitectónico.",
      newsTitle: "Noticias y Actualizaciones",
      newsIntro: "Manténgase informado sobre nuestros últimos proyectos, premios y noticias de la empresa.",
      newsTitle1: "Diseño Ganador de Premios",
      newsExcerpt1: "Nuestro último proyecto residencial ha recibido el Premio Internacional de Arquitectura.",
      newsTitle2: "Nuevo Desarrollo Sostenible",
      newsExcerpt2: "Anunciando nuestro complejo de uso mixto ecológico en el centro de la ciudad.",
      newsTitle3: "Apertura de Exposición",
      newsExcerpt3: "Acompáñenos en la apertura de nuestra exposición arquitectónica en el Museo de Arte Moderno.",
      readMore: "Leer Más"
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n