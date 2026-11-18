// Buttery spring for most entrances
// One curve for every entrance: fast start, long settle, no bounce.
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const springBounce = { duration: 0.6, ease: EASE_OUT };
export const springSnappy = { duration: 0.45, ease: EASE_OUT };

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: springBounce },
};

export const fadeUpBlur = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: springBounce },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: springBounce },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: springBounce },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: springSnappy },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSnappy },
};

export const fanIn = (index: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { ...springBounce, delay: index * 0.06 } },
});

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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
