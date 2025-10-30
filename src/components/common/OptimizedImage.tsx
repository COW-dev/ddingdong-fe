/* eslint-disable @next/next/no-img-element */
'use client';

import { ComponentProps, useState } from 'react';

import { Skeleton } from 'ddingdong-design-system';

import { cn } from '../ui/utils';

type OptimizedImageProps = {
  src?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  width?: number;
  height?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  isSkeleton?: boolean;
} & Omit<ComponentProps<'img'>, 'src' | 'srcSet'>;

export function OptimizedImage({
  src,
  alt,
  priority = false,
  sizes = '100vw',
  srcSet,
  width,
  height,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  className = '',
  isSkeleton = false,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setLoaded(true);
    onError?.();
  };

  return (
    <div className="relative" style={{ width, height }}>
      {isSkeleton && !loaded && (
        <Skeleton className="absolute inset-0 h-full w-full" />
      )}
      {placeholder === 'blur' && blurDataURL && !loaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 h-full w-full blur-lg"
          aria-hidden="true"
        />
      )}
      <img
        key={src}
        src={src}
        alt={alt}
        sizes={sizes}
        srcSet={srcSet}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          isSkeleton && 'z-10 transition-opacity duration-300',
          isSkeleton ? (loaded ? 'opacity-100' : 'opacity-0') : '',
          className,
        )}
        {...props}
      />
    </div>
  );
}
