export const springPreset = (reducedMotion) => ({
  type: "spring",
  stiffness: reducedMotion ? 260 : 220,
  damping: reducedMotion ? 32 : 24,
  mass: 0.8
});

export const fadeSlide = (reducedMotion) => ({
  initial: { opacity: 0, y: reducedMotion ? 0 : 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: reducedMotion ? 0 : 12 }
});

export const tapScale = { whileTap: { scale: 0.98 } };
