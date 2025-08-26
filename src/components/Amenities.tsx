'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Amenity {
  id: string;
  title: string;
  benefit: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
}

const amenities: Amenity[] = [
  {
    id: 'infinity-pool',
    title: 'Infinity Pool',
    benefit: 'Swim above the skyline with panoramic city views',
    image: '/media/amenities/infinity-pool.jpg',
    imageAlt: 'Rooftop infinity pool with stunning city skyline views',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18m-9 0v9m0-18v9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6c0-1.657 1.343-3 3-3h12c0 1.657-1.343 3-3 3H6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 18c0 1.657-1.343 3-3 3H6c-1.657 0-3-1.343-3-3" />
      </svg>
    ),
  },
  {
    id: 'sky-lounge',
    title: 'Sky Lounge',
    benefit: 'Sophisticated social spaces with premium bar service',
    image: '/media/amenities/sky-lounge.jpg',
    imageAlt: 'Elegant sky lounge with panoramic city views and premium furnishing',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21l8-4-8-4v8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7h20l-10-5z" />
      </svg>
    ),
  },
  {
    id: 'private-theater',
    title: 'Private Theater',
    benefit: 'Cinema-quality entertainment with luxury seating',
    image: '/media/amenities/private-theater.jpg',
    imageAlt: 'Premium private theater with luxury reclining seats and state-of-the-art sound system',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.5 4h13l-.5 16h-12L5.5 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 9v6l4-3-4-3z" />
      </svg>
    ),
  },
  {
    id: 'game-room',
    title: 'Game Room',
    benefit: 'Entertainment hub with premium gaming experiences',
    image: '/media/amenities/game-room.jpg',
    imageAlt: 'Modern game room with pool table, gaming consoles, and entertainment systems',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
  },
  {
    id: 'gym',
    title: 'Fitness Center',
    benefit: 'State-of-the-art equipment with personal training',
    image: '/media/amenities/gym.jpg',
    imageAlt: 'Modern fitness center with premium equipment and city views',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 4.5v15m9-15v15" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8.25h3m12 0h3M3 15.75h3m12 0h3" />
      </svg>
    ),
  },
  {
    id: 'kids-play',
    title: 'Kids Play Area',
    benefit: 'Safe and creative playground for young residents',
    image: '/media/amenities/kids-play.jpg',
    imageAlt: 'Colorful and safe kids play area with modern playground equipment',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01" />
        <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
      </svg>
    ),
  },
];

interface LightboxProps {
  amenity: Amenity;
  isOpen: boolean;
  onClose: () => void;
}

function Lightbox({ amenity, isOpen, onClose }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div className="aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="w-24 h-24 mx-auto mb-4 bg-teal-500/20 rounded-full flex items-center justify-center">
                <div className="text-teal-400">
                  {amenity.icon}
                </div>
              </div>
              <p className="text-lg font-inter">{amenity.imageAlt}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">
                {amenity.icon}
              </div>
              <h3 className="text-3xl font-playfair font-bold text-amber-500">
                {amenity.title}
              </h3>
            </div>
            <p className="text-xl text-slate-300 font-inter leading-relaxed">
              {amenity.benefit}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Amenities() {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

  const openLightbox = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
  };

  const closeLightbox = () => {
    setSelectedAmenity(null);
  };

  return (
    <>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-amber-500 mb-6">
              Luxury Amenities
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-inter">
              Experience world-class amenities designed for the discerning lifestyle
            </p>
          </motion.div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  borderColor: "rgba(20, 184, 166, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openLightbox(amenity)}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500/30 transition-colors duration-300"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {amenity.icon}
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-amber-500 mb-4 group-hover:text-amber-400 transition-colors duration-300">
                    {amenity.title}
                  </h3>
                  <p className="text-slate-300 font-inter leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {amenity.benefit}
                  </p>
                </div>

                {/* Hover Indicator */}
                <motion.div
                  className="mt-6 flex items-center text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="text-sm font-inter mr-2">View Details</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-amber-500/30 rounded-full group-hover:bg-amber-500/60 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400 font-inter mb-6">
              Ready to experience luxury living?
            </p>
            <motion.button
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Tour
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedAmenity && (
        <Lightbox
          amenity={selectedAmenity}
          isOpen={!!selectedAmenity}
          onClose={closeLightbox}
        />
      )}
    </>
  );
} 