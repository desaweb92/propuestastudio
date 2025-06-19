import { useState, useEffect } from 'react';

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = 
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobileRegex = 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    
    const checkIfMobile = () => {
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth < 768);
    };

    // Verificación inicial
    checkIfMobile();

    // Event listeners
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};