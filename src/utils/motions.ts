export const SLIDER_ANIMATION = {
  initial: { x: -50, y: 0 },
  animate: {
    x: [30, 50, 30],
    y: [3, 5, 3],
    transition: {
      x: {
        duration: 6,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      },
      y: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'reverse',
      },
    },
  },
};
