'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen luxury-gradient">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-playfair font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Arc Luxury
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premium luxury experiences redefined with sophisticated elegance
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Collection
            </button>
            <button className="px-8 py-4 border-2 border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-900 font-semibold rounded-lg transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {['Exclusivity', 'Craftsmanship', 'Innovation'].map((feature) => (
            <motion.div
              key={feature}
              className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-8 text-center border border-slate-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-playfair font-bold text-amber-500 mb-4">
                {feature}
              </h3>
              <p className="text-slate-300 font-inter">
                Discover the pinnacle of luxury through our commitment to {feature.toLowerCase()}.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
} 