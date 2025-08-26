'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { LeadFormModal } from './LeadFormModal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
  unit: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    quote: 'ARC Luxury exceeded all our expectations. The quality of construction, attention to detail, and premium amenities make it truly exceptional. Our family feels privileged to call this home.',
    rating: 5,
    unit: 'Unit A - 3 BHK'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'IT Professional',
    quote: 'The location is perfect with easy access to everything we need. The infinity pool and sky lounge are absolutely stunning. Sree Dhanya Homes delivered exactly what they promised.',
    rating: 5,
    unit: 'Penthouse Suite'
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'Investment Banker',
    quote: 'From the initial booking to possession, the entire process was transparent and professional. The build quality and finishing are world-class. Highly recommend ARC Luxury.',
    rating: 5,
    unit: 'Unit C - 4 BHK'
  }
];

const trustBadges = [
  {
    icon: '🏛️',
    title: 'RERA Registered',
    value: 'UP-RERA-2023-001234',
    description: 'Fully compliant with Real Estate Regulatory Authority'
  },
  {
    icon: '🏢',
    title: 'Units Delivered',
    value: '2,500+',
    description: 'Successfully delivered premium residential units'
  },
  {
    icon: '📅',
    title: 'Years of Excellence',
    value: '15+',
    description: 'Trusted name in luxury real estate development'
  },
  {
    icon: '🏆',
    title: 'Awards Won',
    value: '12+',
    description: 'Recognition for quality and innovation in construction'
  }
];

// JSON-LD Structured Data
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sree Dhanya Homes",
  "url": "https://arc-luxury.com",
  "logo": "https://arc-luxury.com/logo.png",
  "description": "Premium luxury real estate developer specializing in high-end residential projects with world-class amenities and superior construction quality.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sector 62",
    "addressLocality": "Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201309",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9876543210",
    "contactType": "sales",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.facebook.com/sreedhanyhomes",
    "https://www.instagram.com/sreedhanyhomes",
    "https://www.linkedin.com/company/sree-dhanya-homes"
  ]
};

const residenceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Residence",
  "name": "ARC Luxury",
  "description": "Ultra-luxury residential tower with premium amenities including infinity pool, sky lounge, private theater, and world-class facilities.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sector 62",
    "addressLocality": "Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201309",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.5355,
    "longitude": 77.3910
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Infinity Pool",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Sky Lounge",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Private Theater",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Fitness Center",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Kids Play Area",
      "value": true
    }
  ],
  "numberOfRooms": "3-4",
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": "2150-3500",
    "unitCode": "SQF"
  }
};

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <motion.div
      className={`bg-white rounded-2xl p-8 shadow-xl border transition-all duration-300 ${
        isActive ? 'border-amber-200 shadow-2xl' : 'border-slate-100'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
          <p className="text-sm text-slate-600">{testimonial.role}</p>
        </div>
        <div className="ml-auto flex items-center">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
             <blockquote className="text-slate-700 leading-relaxed mb-4 text-lg">
         &ldquo;{testimonial.quote}&rdquo;
       </blockquote>
      <div className="text-sm text-amber-600 font-medium">
        {testimonial.unit}
      </div>
    </motion.div>
  );
}

export function Developer() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(residenceStructuredData)
          }}
        />
      </Head>

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
              Trusted Developer
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the legacy of excellence with Sree Dhanya Homes
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                className="text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{badge.icon}</div>
                <div className="text-3xl font-bold text-amber-500 mb-2">{badge.value}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{badge.title}</h3>
                <p className="text-sm text-slate-400">{badge.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Developer Information */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-3xl font-playfair font-bold text-amber-500 mb-6">
                About Sree Dhanya Homes
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                With over 15 years of excellence in luxury real estate development, Sree Dhanya Homes has established itself as a trusted name in creating premium residential experiences. Our commitment to superior construction quality, innovative design, and world-class amenities has resulted in the successful delivery of 2,500+ premium units across multiple projects.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Every project by Sree Dhanya Homes reflects our dedication to exceeding expectations, ensuring complete transparency, and delivering homes that truly redefine luxury living. ARC Luxury represents the pinnacle of our craftsmanship and vision for contemporary urban living.
              </p>
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl font-playfair font-bold text-white mb-4">
                What Our Residents Say
              </h3>
              <p className="text-xl text-slate-400">
                Hear from families who chose ARC Luxury as their home
              </p>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={index === activeTestimonial}
                  />
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? 'bg-amber-500 scale-125'
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/30">
              <h4 className="text-2xl font-playfair font-bold text-white mb-4">
                Ready to Experience Luxury Living?
              </h4>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Join the exclusive community of ARC Luxury residents and discover what true luxury living means.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => setShowVisitModal(true)}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Site Visit
                </motion.button>
                <motion.button
                  onClick={() => setShowEnquiryModal(true)}
                  className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Brochure
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Form Modals */}
      <LeadFormModal 
        isOpen={showVisitModal} 
        onClose={() => setShowVisitModal(false)}
        initialTab="visit"
      />
      <LeadFormModal 
        isOpen={showEnquiryModal} 
        onClose={() => setShowEnquiryModal(false)}
        initialTab="enquiry"
      />
    </>
  );
} 