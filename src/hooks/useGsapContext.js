import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const useGsapContext = (scope) => {
  const ctx = useRef(null)
  
  useEffect(() => {
    if (scope?.current) {
      ctx.current = gsap.context(() => {}, scope)
    }
    
    return () => {
      if (ctx.current) {
        ctx.current.revert()
      }
    }
  }, [scope])
  
  return (func) => {
    if (ctx.current && func) {
      ctx.current.add(func)
    }
  }
}