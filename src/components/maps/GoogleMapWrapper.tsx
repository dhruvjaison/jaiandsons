'use client';

import { Wrapper } from '@googlemaps/react-wrapper';
import { motion } from 'framer-motion';

interface GoogleMapWrapperProps {
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

// Map component stub - will be implemented when API key is available
function MapComponent({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
  return (
    <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
      <div className="text-center text-slate-300">
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-playfair font-semibold text-amber-500 mb-2">
          Interactive Map
        </h3>
        <p className="text-sm">
          Location: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
        </p>
        <p className="text-xs mt-1 opacity-75">
          Zoom Level: {zoom}
        </p>
        <p className="text-xs mt-2 text-slate-400">
          Google Maps integration ready for API key
        </p>
      </div>
    </div>
  );
}

export function GoogleMapWrapper({ 
  apiKey = '', 
  center = { lat: 40.7128, lng: -74.0060 }, // Default to NYC
  zoom = 12,
  className = 'w-full h-96'
}: GoogleMapWrapperProps) {
  // If no API key is provided, show the stub
  if (!apiKey) {
    return (
      <motion.div 
        className={className}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MapComponent center={center} zoom={zoom} />
      </motion.div>
    );
  }

  // When API key is available, use the actual Google Maps wrapper
  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Wrapper apiKey={apiKey} libraries={['places']}>
        <MapComponent center={center} zoom={zoom} />
      </Wrapper>
    </motion.div>
  );
} 