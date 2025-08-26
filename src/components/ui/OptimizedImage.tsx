'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  lazy?: boolean;
  placeholder?: 'blur' | 'empty';
  quality?: number;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  lazy = true,
  placeholder = 'empty',
  quality = 85,
  sizes,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Convert image path to WebP if available
  useEffect(() => {
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Check if WebP version exists
    const img = new window.Image();
    img.onload = () => {
      setImageSrc(webpSrc);
    };
    img.onerror = () => {
      // Fallback to original format
      setImageSrc(src);
    };
    img.src = webpSrc;
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    // Try fallback to original format if WebP fails
    if (imageSrc.endsWith('.webp')) {
      setImageSrc(src);
      setHasError(false);
    }
  };

  // Skeleton placeholder
  const SkeletonPlaceholder = () => (
    <div 
      className={cn(
        "bg-slate-200 animate-pulse rounded-lg",
        className
      )}
      style={{ 
        width: fill ? '100%' : width, 
        height: fill ? '100%' : height 
      }}
    />
  );

  // Error fallback
  const ErrorFallback = () => (
    <div 
      className={cn(
        "bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-500 text-sm",
        className
      )}
      style={{ 
        width: fill ? '100%' : width, 
        height: fill ? '100%' : height 
      }}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">📷</div>
        <div>Image not available</div>
      </div>
    </div>
  );

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Show skeleton while loading */}
      {!isLoaded && <SkeletonPlaceholder />}
      
      {/* Optimized Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn("transition-opacity", {
          'absolute inset-0': !isLoaded
        })}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          placeholder={placeholder}
          quality={quality}
          sizes={sizes}
          className={cn("transition-all duration-300", {
            'object-cover': objectFit === 'cover',
            'object-contain': objectFit === 'contain',
            'object-fill': objectFit === 'fill',
            'object-none': objectFit === 'none',
            'object-scale-down': objectFit === 'scale-down',
          })}
          style={{
            objectPosition,
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      </motion.div>
    </div>
  );
}

// Preset configurations for common use cases
export const HeroImage = (props: Omit<OptimizedImageProps, 'priority' | 'lazy'>) => (
  <OptimizedImage {...props} priority={true} lazy={false} quality={90} />
);

export const LazyImage = (props: OptimizedImageProps) => (
  <OptimizedImage {...props} lazy={true} priority={false} />
);

export const ThumbnailImage = (props: OptimizedImageProps) => (
  <OptimizedImage {...props} lazy={true} quality={75} />
); 