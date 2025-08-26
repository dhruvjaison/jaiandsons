'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

interface FeaturePanel {
  id: string;
  title: string;
  benefit: string;
  image: string;
  imageAlt: string;
}

const featurePanels: FeaturePanel[] = [
  {
    id: 'night-view',
    title: 'City Lights',
    benefit: 'Breathtaking skyline views that never sleep',
    image: '/media/features/night-view.jpg',
    imageAlt: 'Stunning city night view from luxury apartment',
  },
  {
    id: 'balcony',
    title: 'Private Balcony',
    benefit: 'Your personal sanctuary above the clouds',
    image: '/media/features/balcony.jpg',
    imageAlt: 'Luxurious private balcony with city views',
  },
  {
    id: 'theater',
    title: 'Private Theater',
    benefit: 'Cinema-quality entertainment at home',
    image: '/media/features/theater.jpg',
    imageAlt: 'Premium private theater with luxury seating',
  },
  {
    id: 'bar',
    title: 'Sky Lounge',
    benefit: 'Elevated social experiences with panoramic views',
    image: '/media/features/bar.jpg',
    imageAlt: 'Sophisticated sky lounge and bar area',
  },
  {
    id: 'gym',
    title: 'Fitness Center',
    benefit: 'State-of-the-art wellness in the sky',
    image: '/media/features/gym.jpg',
    imageAlt: 'Modern fitness center with premium equipment',
  },
  {
    id: 'kitchen',
    title: 'Gourmet Kitchen',
    benefit: 'Culinary excellence meets luxury design',
    image: '/media/features/kitchen.jpg',
    imageAlt: 'Premium gourmet kitchen with luxury finishes',
  },
];

export function FeatureReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transforms
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-70%"]);
  const backgroundX = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Handle scroll snapping and active panel detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const panelWidth = container.clientWidth;
      const currentPanel = Math.round(scrollLeft / panelWidth);
      setActivePanel(Math.min(currentPanel, featurePanels.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-slate-900">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ x: backgroundX }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </motion.div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <motion.div 
          className="flex h-full"
          style={{ 
            width: `${featurePanels.length * 100}vw`,
            x,
            opacity
          }}
        >
          {featurePanels.map((panel, index) => (
            <FeaturePanel 
              key={panel.id}
              panel={panel}
              index={index}
              isActive={activePanel === index}
              scrollProgress={smoothProgress}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {featurePanels.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activePanel === index 
                ? 'bg-amber-500 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                container.scrollTo({
                  left: index * container.clientWidth,
                  behavior: 'smooth'
                });
              }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-inter rotate-90 whitespace-nowrap origin-center">
            Scroll to explore
          </span>
          <motion.div 
            className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent"
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}

interface FeaturePanelProps {
  panel: FeaturePanel;
  index: number;
  isActive: boolean;
  scrollProgress: MotionValue<number>;
}

function FeaturePanel({ panel, index, isActive, scrollProgress }: FeaturePanelProps) {
  // Individual panel parallax effects
  const panelX = useTransform(
    scrollProgress, 
    [0, 1], 
    [`${index * 20}%`, `${index * -20}%`]
  );
  
  const imageScale = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [1, 1.1, 1]
  );

  const textY = useTransform(
    scrollProgress,
    [0, 1],
    ["0%", `${(index % 2 === 0 ? -1 : 1) * 20}%`]
  );

  // Determine layout (alternating left/right)
  const isImageLeft = index % 2 === 0;

  return (
    <div 
      className="relative w-screen h-full flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/40" />
      
      <div className="relative w-full h-full flex items-center">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 w-full h-full ${
          isImageLeft ? '' : 'lg:grid-flow-col-dense'
        }`}>
          
          {/* Image Side */}
          <motion.div 
            className={`relative overflow-hidden ${
              isImageLeft ? 'lg:order-1' : 'lg:order-2'
            }`}
            style={{ x: panelX }}
          >
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
            >
              {/* Placeholder for actual image */}
              <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <div className="w-24 h-24 mx-auto mb-4 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-amber-500/40 rounded-full"></div>
                  </div>
                  <p className="text-sm">{panel.imageAlt}</p>
                </div>
              </div>
              
              {/* Overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-${
                isImageLeft ? 'r' : 'l'
              } from-transparent via-transparent to-slate-900/30`} />
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            className={`relative flex items-center justify-center p-8 lg:p-16 ${
              isImageLeft ? 'lg:order-2' : 'lg:order-1'
            }`}
            style={{ y: textY }}
          >
            <div className={`max-w-lg ${isImageLeft ? 'lg:text-left' : 'lg:text-right'}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.7, 
                  y: isActive ? 0 : 20 
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: isActive ? 0.2 : 0
                }}
              >
                {/* Panel Number */}
                <motion.div 
                  className="text-amber-500/60 font-inter text-sm mb-4 tracking-wider"
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  {String(index + 1).padStart(2, '0')} / {String(featurePanels.length).padStart(2, '0')}
                </motion.div>

                {/* Title */}
                <motion.h2 
                  className="text-5xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
                  animate={{ 
                    scale: isActive ? 1 : 0.95,
                    opacity: isActive ? 1 : 0.8
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {panel.title}
                </motion.h2>

                {/* Benefit */}
                <motion.p 
                  className="text-xl lg:text-2xl text-slate-300 font-inter font-light leading-relaxed"
                  animate={{ opacity: isActive ? 1 : 0.6 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {panel.benefit}
                </motion.p>

                {/* Decorative Line */}
                <motion.div 
                  className={`w-24 h-px bg-gradient-to-r from-amber-500 to-transparent mt-8 ${
                    isImageLeft ? '' : 'lg:ml-auto lg:from-transparent lg:to-amber-500'
                  }`}
                  animate={{ scaleX: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 