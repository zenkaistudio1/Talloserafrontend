import { useState, useEffect } from 'react';

interface ImagePreloadResult {
  loadedImages: Set<string>;
  isAllLoaded: boolean;
  isImageLoaded: (src: string) => boolean;
}

export const useImagePreloader = (imageSources: string[]): ImagePreloadResult => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(src));
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    // Preload all images
    const preloadImages = async () => {
      try {
        await Promise.all(imageSources.map(loadImage));
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    };

    preloadImages();
  }, [imageSources]);

  return {
    loadedImages,
    isAllLoaded: loadedImages.size === imageSources.length,
    isImageLoaded: (src: string) => loadedImages.has(src),
  };
};