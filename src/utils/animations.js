import gsap from 'gsap'

export const fadeIn = (element, duration = 1, delay = 0) => {
  gsap.from(element, {
    opacity: 0,
    duration,
    delay,
    ease: "power2.out"
  })
}

export const slideUp = (element, duration = 1, delay = 0, y = 50) => {
  gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out"
  })
}

export const staggerText = (elements, duration = 0.5, delay = 0, stagger = 0.1) => {
  gsap.from(elements, {
    opacity: 0,
    y: 20,
    duration,
    delay,
    stagger,
    ease: "back.out"
  })
}

export const scaleIn = (element, duration = 0.8, delay = 0) => {
  gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration,
    delay,
    ease: "elastic.out(1, 0.5)"
  })
}

export const horizontalScroll = (element, distance = 100, duration = 1) => {
  gsap.to(element, {
    x: distance,
    scrollTrigger: {
      trigger: element,
      scrub: true
    },
    duration
  })
}

export const parallaxEffect = (element, distance = 100) => {
  gsap.to(element, {
    y: distance,
    scrollTrigger: {
      trigger: element,
      scrub: true
    }
  })
}