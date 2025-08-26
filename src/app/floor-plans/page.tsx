'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import plansData from '@/data/plans.json';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  room: string;
  dimensions: string;
  description: string;
}

interface Unit {
  id: string;
  name: string;
  title: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  price: string;
  image: string;
  pdf: string;
  description: string;
  features: string[];
  hotspots: Hotspot[];
}

interface TooltipProps {
  hotspot: Hotspot;
  isVisible: boolean;
  position: { x: number; y: number };
}

function Tooltip({ hotspot, isVisible, position }: TooltipProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed z-50 bg-slate-900 border border-amber-500/30 rounded-lg p-4 shadow-2xl pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translateY(-100%)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="min-w-[200px]">
        <h4 className="text-amber-500 font-playfair font-semibold text-lg mb-1">
          {hotspot.room}
        </h4>
        <p className="text-teal-400 font-inter text-sm mb-2">
          {hotspot.dimensions}
        </p>
        <p className="text-slate-300 font-inter text-sm leading-relaxed">
          {hotspot.description}
        </p>
      </div>
      {/* Arrow */}
      <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-amber-500/30" />
    </motion.div>
  );
}

interface FloorPlanViewerProps {
  unit: Unit;
}

function FloorPlanViewer({ unit }: FloorPlanViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleHotspotHover = (hotspot: Hotspot, e: React.MouseEvent) => {
    setHoveredHotspot(hotspot);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleHotspotLeave = () => {
    setHoveredHotspot(null);
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-40 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={resetView}
          className="w-10 h-10 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Floor Plan Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[600px] bg-slate-100 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          {/* Floor Plan Image Placeholder */}
          <div className="w-full h-[600px] bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center relative">
            <div className="text-center text-slate-600">
              <div className="w-24 h-24 mx-auto mb-4 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-lg font-playfair font-semibold mb-2">{unit.title}</p>
              <p className="text-sm">{unit.area} Floor Plan</p>
            </div>

            {/* Hotspots */}
            {unit.hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className="absolute w-6 h-6 bg-amber-500 hover:bg-amber-400 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                }}
                onMouseEnter={(e) => handleHotspotHover(hotspot, e)}
                onMouseLeave={handleHotspotLeave}
                onMouseMove={(e) => setTooltipPosition({ x: e.clientX, y: e.clientY })}
              >
                <div className="w-full h-full rounded-full bg-amber-500 animate-pulse" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredHotspot && (
          <Tooltip
            hotspot={hoveredHotspot}
            isVisible={!!hoveredHotspot}
            position={tooltipPosition}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FloorPlansPage() {
  const [activeUnit, setActiveUnit] = useState(plansData.units[0]);
  const units = plansData.units as Unit[];

  const handleDownloadPDF = (pdfUrl: string, unitName: string) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${unitName}-Floor-Plan.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEnquire = (unitName: string) => {
    // This would typically open a form modal or navigate to contact page
    console.log(`Enquiry for ${unitName}`);
    // For now, we'll show an alert
    alert(`Thank you for your interest in ${unitName}. Our sales team will contact you shortly.`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-amber-500 mb-6">
              Floor Plans
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore our thoughtfully designed living spaces with interactive floor plans
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Unit Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {units.map((unit, index) => (
              <motion.button
                key={unit.id}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeUnit.id === unit.id
                    ? 'bg-amber-500 text-slate-900 shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
                onClick={() => setActiveUnit(unit)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {unit.name}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Floor Plan Viewer */}
            <div className="lg:col-span-2">
              <motion.div
                key={activeUnit.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FloorPlanViewer unit={activeUnit} />
              </motion.div>
            </div>

            {/* Unit Details */}
            <div className="space-y-8">
              <motion.div
                key={`${activeUnit.id}-details`}
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Unit Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-2">
                    {activeUnit.title}
                  </h2>
                  <p className="text-amber-600 font-semibold text-xl mb-4">
                    {activeUnit.price}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {activeUnit.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900">{activeUnit.area}</div>
                    <div className="text-sm text-slate-600">Total Area</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900">{activeUnit.bedrooms}</div>
                    <div className="text-sm text-slate-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900">{activeUnit.bathrooms}</div>
                    <div className="text-sm text-slate-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900">{activeUnit.balconies}</div>
                    <div className="text-sm text-slate-600">Balconies</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-playfair font-semibold text-slate-900 mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {activeUnit.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => handleDownloadPDF(activeUnit.pdf, activeUnit.name)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => handleEnquire(activeUnit.name)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Enquire about this Unit
                  </Button>
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                className="bg-amber-50 border border-amber-200 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="font-semibold text-amber-800 mb-3">How to Use</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Click and drag to pan around the floor plan</li>
                  <li>• Use zoom controls to get a closer look</li>
                  <li>• Hover over hotspots to see room details</li>
                  <li>• Click reset to return to original view</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 