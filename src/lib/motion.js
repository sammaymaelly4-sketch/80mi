// src/lib/motion.js

// Detectar dispositivos com menos performance
const isLowPowerDevice = () => {
  if (typeof window === "undefined") return false;
  
  // Detectar via navigator.hardwareConcurrency
  const cores = navigator.hardwareConcurrency || 4;
  if (cores <= 2) return true;
  
  // Detectar via navigator.deviceMemory
  const memory = navigator.deviceMemory || 4;
  if (memory <= 2) return true;
  
  return false;
};

// Verificar preferência do sistema
const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Exportar flag global
export const shouldReduceMotion = prefersReducedMotion() || isLowPowerDevice();

// Presets otimizados
export const springPreset = (reducedMotion = shouldReduceMotion) => {
  if (reducedMotion) {
    return {
      type: "tween",
      duration: 0.2,
      ease: "easeOut"
    };
  }
  
  return {
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 0.6
  };
};

export const fadeSlide = (reducedMotion = shouldReduceMotion) => {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 }
    };
  }
  
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: { duration: 0.25, ease: "easeOut" }
  };
};

// Tap scale mais suave
export const tapScale = shouldReduceMotion 
  ? {} 
  : { whileTap: { scale: 0.97, transition: { duration: 0.1 } } };

// Layout transitions otimizadas
export const layoutTransition = (reducedMotion = shouldReduceMotion) => {
  if (reducedMotion) {
    return { duration: 0 };
  }
  
  return {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8
  };
};
