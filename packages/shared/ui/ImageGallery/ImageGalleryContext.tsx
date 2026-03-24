import { createContext, useCallback, useContext, useState } from 'react';

import { ImageGalleryItem } from './ImageGallery';

type ImageGalleryContextType = {
  images: ImageGalleryItem[];
  current: number;
  total: number;
  firstImage: boolean;
  lastImage: boolean;
  goPrev: () => void;
  goNext: () => void;
  goToIndex: (index: number) => void;
};
const initImageGalleryContext: ImageGalleryContextType = {
  images: [],
  current: 0,
  total: 0,
  firstImage: true,
  lastImage: false,
  goPrev: () => {},
  goNext: () => {},
  goToIndex: () => {},
};
const ImageGalleryContext = createContext<ImageGalleryContextType>(initImageGalleryContext);

export const useImageGallery = () => {
  return useContext(ImageGalleryContext);
};

type ProviderProps = {
  images: ImageGalleryItem[];
  children: React.ReactNode;
};

export function ImageGalleryProvider({ images, children }: ProviderProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const goPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const goNext = useCallback(() => setCurrent((c) => Math.min(total - 1, c + 1)), [total]);
  const goToIndex = useCallback(
    (index: number) => setCurrent(Math.max(0, Math.min(total - 1, index))),
    [total]
  );

  const value: ImageGalleryContextType = {
    images,
    current,
    total,
    firstImage: current === 0,
    lastImage: current === total - 1,
    goPrev,
    goNext,
    goToIndex,
  };

  return <ImageGalleryContext.Provider value={value}>{children}</ImageGalleryContext.Provider>;
}
