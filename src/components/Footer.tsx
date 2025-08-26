'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Download, Instagram, Facebook } from 'lucide-react';
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Contact information
  const contactInfo = {
    address: "ARC Luxury, Sector 62, Noida, Uttar Pradesh 201309",
    phone: "+91 98765 43210",
    email: "info@arc-luxury.com",
    whatsapp: "+91 98765 43210"
  };

  // WhatsApp link
  const whatsappLink = `https://wa.me/919876543210?text=Hi! I'm interested in ARC Luxury and would like to download the brochure.`;
  
  // Social media links
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/arcluxury',
      icon: Instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'Facebook', 
      url: 'https://www.facebook.com/arcluxury',
      icon: Facebook,
      color: 'hover:text-blue-500'
    }
  ];

  // Quick links
  const quickLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
    { name: 'Sitemap', href: '/sitemap.xml' }
  ];

  // Download brochure handler
  const handleDownloadBrochure = () => {
    // In production, this would trigger the actual PDF download
    console.log('Downloading ARC Luxury brochure...');
    // You can implement actual PDF download here
    // window.open('/brochure/arc-luxury-brochure.pdf', '_blank');
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-playfair font-bold text-amber-500 mb-4">
              ARC
            </h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              Luxury Living in the Heart of the City
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
                             Experience unparalleled luxury with world-class amenities, premium finishes, and breathtaking views in Noida&apos;s most prestigious residential tower.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-playfair font-bold text-amber-500 mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="text-slate-300 hover:text-amber-500 transition-colors text-sm link-underline"
                >
                  {contactInfo.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-300 hover:text-amber-500 transition-colors text-sm link-underline"
                >
                  {contactInfo.email}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-green-500 transition-colors text-sm"
                >
                  WhatsApp: {contactInfo.whatsapp}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-playfair font-bold text-amber-500 mb-6">
              Quick Links
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-amber-500 transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
              <div className="pt-2">
                <a
                  href="/floor-plans"
                  className="text-slate-300 hover:text-amber-500 transition-colors text-sm block py-1"
                >
                  Floor Plans
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-slate-800 rounded-full text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-slate-700`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-playfair font-bold text-amber-500 mb-6">
              Get Brochure
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Download our comprehensive brochure to explore floor plans, amenities, pricing, and everything ARC Luxury has to offer.
            </p>
            
            <motion.button
              onClick={handleDownloadBrochure}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              Download Brochure
            </motion.button>

            {/* Additional CTA */}
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <p className="text-slate-300 text-sm mb-3">
                Ready to visit? Schedule a personal tour.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Developer Info Section */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400 text-sm mb-2">
              A Premium Project by
            </p>
            <h4 className="text-xl font-playfair font-bold text-amber-500 mb-2">
              Sree Dhanya Homes
            </h4>
            <p className="text-slate-400 text-xs max-w-2xl mx-auto">
              RERA Registration: UP-RERA-2023-001234 | 15+ Years of Excellence | 2,500+ Units Delivered
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-slate-400 text-sm text-center md:text-left">
              <p>
                © {currentYear} ARC Luxury. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xs">
              {quickLinks.map((link, index) => (
                <span key={link.name} className="flex items-center gap-6">
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </a>
                  {index < quickLinks.length - 1 && (
                    <span className="text-slate-600">|</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 