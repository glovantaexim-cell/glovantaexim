/**
 * Optimized animation configurations
 * Reduces re-renders and animation computation overhead
 */

export const heroChildren = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

// Shared transition config for consistency and to reduce duplication
export const easeOutTransition = { duration: 0.6, ease: 'easeOut' };

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const viewportConfig = {
  once: true,
  amount: 0.2,
};

// Performance-optimized scale animation for hover
export const hoverScaleVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
};
