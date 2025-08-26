'use client';

import { motion } from 'framer-motion';
import { HeroVideo } from '@/components/HeroVideo';
import { FeatureReel } from '@/components/FeatureReel';
import { Amenities } from '@/components/Amenities';
import { LocationMap } from '@/components/LocationMap';
import { Developer } from '@/components/Developer';

export default function HomePage() {
  const handleBookTour = () => {
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
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-amber-500 mb-6">
              Floor Plans
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose from our thoughtfully designed luxury residences
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { name: 'Unit A', area: '2,150 sq ft', bedrooms: '3 BHK', price: '₹2.8 Cr' },
              { name: 'Unit B', area: '2,650 sq ft', bedrooms: '3 BHK', price: '₹3.2 Cr' },
              { name: 'Unit C', area: '3,200 sq ft', bedrooms: '4 BHK', price: '₹4.1 Cr' },
              { name: 'Unit D', area: '3,500 sq ft', bedrooms: '4 BHK', price: '₹4.5 Cr' },
              { name: 'Penthouse', area: '4,800 sq ft', bedrooms: '5 BHK', price: '₹7.2 Cr' },
              { name: 'Sky Villa', area: '5,200 sq ft', bedrooms: '5 BHK', price: '₹8.5 Cr' },
            ].map((unit, index) => (
              <motion.div
                key={unit.name}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -8 }}
              >
                <h3 className="text-2xl font-playfair font-bold text-amber-500 mb-4">
                  {unit.name}
                </h3>
                <div className="space-y-2 text-slate-300">
                  <p><span className="text-slate-400">Area:</span> {unit.area}</p>
                  <p><span className="text-slate-400">Type:</span> {unit.bedrooms}</p>
                  <p><span className="text-slate-400">Starting:</span> {unit.price}</p>
                </div>
                <motion.button
                  className="mt-4 w-full px-4 py-2 bg-amber-500/20 hover:bg-amber-500 text-amber-500 hover:text-slate-900 rounded-lg transition-all duration-300 border border-amber-500/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/floor-plans"
              className="inline-flex items-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Floor Plans
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Feature Reel Section */}
      <FeatureReel />

      {/* Amenities Section */}
      <Amenities />

      {/* Location Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-slate-900 mb-6">
              Prime Location
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Strategically located with easy access to shopping, education, healthcare, and entertainment
            </p>
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <LocationMap height="600px" className="rounded-2xl overflow-hidden shadow-2xl" />
          </motion.div>

          {/* Location Benefits */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { icon: '🛍️', title: 'Shopping', desc: 'Premium malls within 3km' },
              { icon: '🚇', title: 'Connectivity', desc: 'Metro station nearby' },
              { icon: '🏥', title: 'Healthcare', desc: 'Top hospitals accessible' },
              { icon: '🏫', title: 'Education', desc: 'Renowned schools nearby' },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-playfair font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Developer Section */}
      <Developer />
    </>
  );
}
