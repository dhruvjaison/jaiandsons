'use client';

import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion } from 'framer-motion';

// ARC Luxury coordinates (example coordinates - replace with actual)
const ARC_COORDINATES = {
  lat: 28.5355, // Delhi coordinates as example
  lng: 77.3910
};

interface MapMarker {
  id: string;
  name: string;
  category: 'shopping' | 'transport' | 'education' | 'healthcare' | 'entertainment';
  position: {
    lat: number;
    lng: number;
  };
  distance: string;
  time: string;
  description: string;
  icon: string;
}

const mapMarkers: MapMarker[] = [
  {
    id: 'lulu-mall',
    name: 'Lulu Mall',
    category: 'shopping',
    position: { lat: 28.5425, lng: 77.3850 },
    distance: '1.2 km',
    time: '3 mins drive',
    description: 'Premium shopping destination with luxury brands',
    icon: '🛍️'
  },
  {
    id: 'metro-station',
    name: 'Noida City Centre Metro',
    category: 'transport',
    position: { lat: 28.5745, lng: 77.3560 },
    distance: '2.8 km',
    time: '8 mins drive',
    description: 'Direct connectivity to Delhi and NCR',
    icon: '🚇'
  },
  {
    id: 'delhi-public-school',
    name: 'Delhi Public School',
    category: 'education',
    position: { lat: 28.5285, lng: 77.3945 },
    distance: '0.8 km',
    time: '2 mins drive',
    description: 'Premier educational institution',
    icon: '🏫'
  },
  {
    id: 'fortis-hospital',
    name: 'Fortis Hospital',
    category: 'healthcare',
    position: { lat: 28.5195, lng: 77.3825 },
    distance: '1.5 km',
    time: '4 mins drive',
    description: 'Multi-specialty healthcare facility',
    icon: '🏥'
  },
  {
    id: 'amity-university',
    name: 'Amity University',
    category: 'education',
    position: { lat: 28.5155, lng: 77.3895 },
    distance: '2.1 km',
    time: '6 mins drive',
    description: 'Leading private university',
    icon: '🎓'
  },
  {
    id: 'max-hospital',
    name: 'Max Super Speciality Hospital',
    category: 'healthcare',
    position: { lat: 28.5445, lng: 77.3755 },
    distance: '1.8 km',
    time: '5 mins drive',
    description: 'Advanced medical care and emergency services',
    icon: '🏥'
  },
  {
    id: 'dlf-mall',
    name: 'DLF Mall of India',
    category: 'shopping',
    position: { lat: 28.5685, lng: 77.3255 },
    distance: '3.2 km',
    time: '9 mins drive',
    description: 'Largest shopping mall in India',
    icon: '🛍️'
  },
  {
    id: 'worlds-of-wonder',
    name: 'Worlds of Wonder',
    category: 'entertainment',
    position: { lat: 28.5125, lng: 77.4125 },
    distance: '2.5 km',
    time: '7 mins drive',
    description: 'Amusement park and entertainment complex',
    icon: '🎢'
  }
];

const categoryConfig = {
  shopping: { label: 'Shopping', color: 'bg-purple-500', textColor: 'text-purple-600' },
  transport: { label: 'Transport', color: 'bg-blue-500', textColor: 'text-blue-600' },
  education: { label: 'Education', color: 'bg-green-500', textColor: 'text-green-600' },
  healthcare: { label: 'Healthcare', color: 'bg-red-500', textColor: 'text-red-600' },
  entertainment: { label: 'Entertainment', color: 'bg-orange-500', textColor: 'text-orange-600' },
};

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [{ weight: '2.00' }]
  },
  {
    featureType: 'all',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#9c9c9c' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{ color: '#f2f2f2' }]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [{ saturation: -100 }, { lightness: 45 }]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
  }
];

interface LocationMapProps {
  height?: string;
  className?: string;
}

export function LocationMap({ height = '500px', className = '' }: LocationMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(Object.keys(categoryConfig)));

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const onLoad = useCallback((_map: google.maps.Map) => {
    // Map loaded successfully
  }, []);

  const onUnmount = useCallback(() => {
    // Map unmounted
  }, []);

  const toggleFilter = (category: string) => {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(category)) {
      newFilters.delete(category);
    } else {
      newFilters.add(category);
    }
    setActiveFilters(newFilters);
    setSelectedMarker(null);
  };

  const filteredMarkers = mapMarkers.filter(marker => activeFilters.has(marker.category));

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${ARC_COORDINATES.lat},${ARC_COORDINATES.lng}`;
    window.open(url, '_blank');
  };

  const openInAppleMaps = () => {
    const url = `https://maps.apple.com/?q=${ARC_COORDINATES.lat},${ARC_COORDINATES.lng}`;
    window.open(url, '_blank');
  };

  if (loadError) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 rounded-lg ${className}`} style={{ height }}>
        <div className="text-center text-slate-600">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.664 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="font-semibold">Failed to load Google Maps</p>
          <p className="text-sm mt-1">Please check your API key configuration</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 rounded-lg ${className}`} style={{ height }}>
        <div className="text-center text-slate-600">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="font-semibold">Loading Interactive Map</p>
          <p className="text-sm mt-1">Please wait while we load your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Filter Chips */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 max-w-md">
        {Object.entries(categoryConfig).map(([category, config]) => {
          const isActive = activeFilters.has(category);
          const count = mapMarkers.filter(marker => marker.category === category).length;
          
          return (
            <motion.button
              key={category}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm border ${
                isActive
                  ? `${config.color} text-white border-transparent shadow-lg`
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
              onClick={() => toggleFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {config.label} ({count})
            </motion.button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.button
          className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition-colors duration-200 shadow-lg"
          onClick={openInGoogleMaps}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Google Maps
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition-colors duration-200 shadow-lg"
          onClick={openInAppleMaps}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Apple Maps
        </motion.button>
      </div>

      {/* Google Map */}
      <div className="rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height }}
          center={ARC_COORDINATES}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: mapStyles,
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
        {/* ARC Main Marker */}
        <Marker
          position={ARC_COORDINATES}
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#F59E0B" stroke="#FFFFFF" stroke-width="4"/>
                <circle cx="20" cy="20" r="8" fill="#FFFFFF"/>
                <text x="20" y="25" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#F59E0B">ARC</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20),
          }}
          onClick={() => setSelectedMarker(null)}
        />

        {/* Location Markers */}
        {filteredMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="${categoryConfig[marker.category].color.replace('bg-', '#')}" stroke="#FFFFFF" stroke-width="3"/>
                  <text x="16" y="20" text-anchor="middle" font-size="12">${marker.icon}</text>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 16),
            }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {/* Info Window */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -10),
            }}
          >
            <div className="p-3 max-w-xs">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{selectedMarker.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {selectedMarker.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {selectedMarker.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className="flex items-center text-slate-500">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedMarker.distance}
                    </span>
                    <span className="flex items-center text-slate-500">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {selectedMarker.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
                     </InfoWindow>
         )}
        </GoogleMap>
      </div>

       {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-lg">
        <h4 className="font-semibold text-slate-900 mb-3 text-sm">ARC Luxury Location</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></div>
            <span className="text-slate-600">ARC Luxury Tower</span>
          </div>
          <div className="text-xs text-slate-500">
            Premium location with easy access to key amenities
          </div>
        </div>
      </div>
    </div>
  );
} 