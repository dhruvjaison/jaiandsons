'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroVideo } from '@/components/HeroVideo';

export default function HomePage() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookTour = () => {
    setShowBookingModal(true);
    // TODO: Implement booking modal
    console.log('Opening booking modal...');
  };

  const handleViewFloorPlans = () => {
    // Scroll to floor plans section
    const element = document.getElementById('floor-plans');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Video Section */}
      <HeroVideo 
        onBookTour={handleBookTour}
        onViewFloorPlans={handleViewFloorPlans}
      />

      {/* Floor Plans Section - Placeholder */}
      <section id="floor-plans" className="min-h-screen luxury-gradient py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
              Floor Plans
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover thoughtfully designed spaces that redefine luxury living
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Premium 3 BHK', 'Penthouse Suite', 'Sky Villa'].map((plan, index) => (
              <motion.div
                key={plan}
                className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-8 text-center border border-slate-700"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-48 bg-slate-800 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-slate-400">Floor Plan Image</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-amber-500 mb-4">
                  {plan}
                </h3>
                <p className="text-slate-300 mb-6">
                  Spacious layouts with premium finishes and stunning city views
                </p>
                <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-all duration-300">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-slate-900 mb-6">
              Luxury Amenities
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience unparalleled comfort with world-class amenities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Rooftop Infinity Pool', desc: 'Stunning city skyline views' },
              { title: 'Sky Lounge', desc: 'Exclusive social spaces' },
              { title: 'Private Theater', desc: 'Premium entertainment' },
              { title: 'Fitness Center', desc: 'State-of-the-art equipment' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-playfair font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 