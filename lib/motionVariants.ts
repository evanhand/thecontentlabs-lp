// Buttery spring for most entrances
export const springBounce = { type: 'spring' as const, stiffness: 100, damping: 12 };
export const springSnappy = { type: 'spring' as const, stiffness: 200, damping: 18 };

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: springBounce },
};

export const fadeUpBlur = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)', scale: 0.97 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { ...springBounce, duration: 0.8 } },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: springBounce },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: springBounce },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: springSnappy },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSnappy },
};

export const fanIn = (index: number) => ({
  hidden: { opacity: 0, y: 60, rotate: (index - 1) * 3 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { ...springBounce, delay: index * 0.15 } },
});

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

export const VIEWPORT_ONCE = { once: true, amount: 0.15 };

// Page-level variants (use initial="hidden" animate="show")
export const pageStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const pageFadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};
