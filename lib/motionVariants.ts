// Marketing motion (DESIGN.md): one curve, opacity + a 12px rise, once.
// No blur, scale, rotate or horizontal slides. Legacy names are kept as
// aliases so older imports keep compiling, but they all resolve to fade-up.
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const springBounce = { duration: 0.5, ease: EASE_OUT };
export const springSnappy = { duration: 0.35, ease: EASE_OUT };

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: springBounce },
};

/** @deprecated alias of fadeUp */
export const fadeUpBlur = fadeUp;
/** @deprecated alias of fadeUp */
export const slideFromLeft = fadeUp;
/** @deprecated alias of fadeUp */
export const slideFromRight = fadeUp;
/** @deprecated alias of fadeUp */
export const scaleIn = fadeUp;
/** @deprecated alias of fadeUp */
export const popIn = fadeUp;

export const fanIn = (index: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { ...springBounce, delay: index * 0.05 } },
});

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export const staggerContainerSlow = staggerContainer;

export const VIEWPORT_ONCE = { once: true, amount: 0.15 };

// Page-level variants (use initial="hidden" animate="show")
export const pageStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export const pageFadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: springBounce },
};
