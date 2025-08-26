'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { LeadFormModal } from './LeadFormModal';

interface HeroVideoProps {
  onBookTour?: () => void;
  onViewFloorPlans?: () => void;
}

export function HeroVideo({ onBookTour, onViewFloorPlans }: HeroVideoProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleScrollToFloorPlans = () => {
    if (onViewFloorPlans) {
      onViewFloorPlans();
    } else {
      // Default behavior: scroll to floor plans section
      const element = document.getElementById('floor-plans');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookTour = () => {
    if (onBookTour) {
      onBookTour();
    } else {
      // Default behavior: open the booking modal
      setShowBookingModal(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const chipVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const features = [
    'Premium 3 BHK',
    'Rooftop Infinity Pool',
    'Sky Lounge',
    'Private Theater',
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/media/hero.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        </video>
        
        {/* Fallback background if video fails to load */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        )}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-slate-900/90" />

      {/* Content Overlay */}
      <div className="relative z-20 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.h1
            className="text-8xl sm:text-9xl lg:text-[12rem] font-playfair font-bold text-white mb-6 tracking-wider"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ARC
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-2xl sm:text-3xl lg:text-4xl text-slate-200 mb-12 font-inter font-light tracking-wide"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Luxury Living in the Heart of the City
          </motion.p>

          {/* Feature Chips */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
                             <motion.div
                 key={feature}
                 className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-inter text-sm sm:text-base font-medium"
                 variants={chipVariants}
                 transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 + index * 0.1 }}
                 whileHover={{
                   scale: 1.05,
                   backgroundColor: 'rgba(255, 255, 255, 0.15)',
                   transition: { duration: 0.2 },
                 }}
               >
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleScrollToFloorPlans}
              className="text-lg px-8 py-4 min-w-[200px]"
            >
              View Floor Plans
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleBookTour}
              className="text-lg px-8 py-4 min-w-[200px] border-2 border-white text-white hover:bg-white hover:text-slate-900"
            >
              Book a Private Tour
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Lead Form Modal */}
      <LeadFormModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)}
        initialTab="visit"
      />
    </section>
  );
} 