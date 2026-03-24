export const TOOLTIP_MOTION = {
  SPRING: {
    initial: { opacity: 0, scale: 0.6, y: 15 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      y: 15,
      transition: { duration: 0.1 },
    },
  },
  POP: {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15,
        mass: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      transition: { duration: 0.08 },
    },
  },
  SMOOTH: {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.15, ease: 'easeIn' },
    },
  },
};
