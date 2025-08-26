import { Variants } from 'framer-motion';

// Respect user's motion preferences
export const shouldReduceMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Base animation variants
export const fadeUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: shouldReduceMotion() ? 0 : 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    }
  }
};

// Staggered container variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.6,
      staggerChildren: shouldReduceMotion() ? 0 : 0.08,
      delayChildren: shouldReduceMotion() ? 0 : 0.1,
    }
  }
};

// Individual stagger item variants
export const staggerItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: shouldReduceMotion() ? 0 : 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

// Parallax scroll variants
export const parallaxVariants: Variants = {
  initial: { 
    y: shouldReduceMotion() ? 0 : -50,
    opacity: 0 
  },
  animate: { 
    y: 0,
    opacity: 1,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

// Button hover variants
export const buttonHoverVariants: Variants = {
  initial: { 
    scale: 1,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  hover: { 
    scale: shouldReduceMotion() ? 1 : 1.02,
    boxShadow: shouldReduceMotion() 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      : '0 10px 15px -3px rgba(245, 158, 11, 0.2), inset 0 -2px 4px rgba(245, 158, 11, 0.3)',
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: { 
    scale: shouldReduceMotion() ? 1 : 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeInOut'
    }
  }
};

// Link hover variants
export const linkHoverVariants: Variants = {
  initial: { 
    backgroundSize: '0% 2px',
    backgroundPosition: 'left bottom'
  },
  hover: { 
    backgroundSize: shouldReduceMotion() ? '0% 2px' : '100% 2px',
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.3,
      ease: 'easeOut'
    }
  }
};

// Card hover variants
export const cardHoverVariants: Variants = {
  initial: { 
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  hover: { 
    y: shouldReduceMotion() ? 0 : -8,
    boxShadow: shouldReduceMotion() 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      : '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// Scale variants for icons and small elements
export const scaleVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: shouldReduceMotion() ? 1 : 1.1,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: { 
    scale: shouldReduceMotion() ? 1 : 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeInOut'
    }
  }
};

// Loading spinner variants
export const spinnerVariants: Variants = {
  animate: {
    rotate: shouldReduceMotion() ? 0 : 360,
    transition: {
      duration: shouldReduceMotion() ? 0 : 1,
      repeat: shouldReduceMotion() ? 0 : Infinity,
      ease: 'linear'
    }
  }
};

// Modal variants
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: shouldReduceMotion() ? 1 : 0.9,
    y: shouldReduceMotion() ? 0 : 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    scale: shouldReduceMotion() ? 1 : 0.9,
    y: shouldReduceMotion() ? 0 : 20,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.2,
      ease: 'easeIn'
    }
  }
};

// Backdrop variants
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.2
    }
  }
};

// Testimonial carousel variants
export const carouselVariants: Variants = {
  enter: {
    x: shouldReduceMotion() ? 0 : 100,
    opacity: 0
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    x: shouldReduceMotion() ? 0 : -100,
    opacity: 0,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}; 