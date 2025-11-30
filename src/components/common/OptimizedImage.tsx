/* eslint-disable @next/next/no-img-element */
'use client';

import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react';

import { Skeleton } from 'ddingdong-design-system';

import { cn } from '../../utils/cn';

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
  sizes,
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
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      setLoaded(true);
      onLoad?.();
    }
  }, [onLoad]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setLoaded(true);
    onError?.();
  };

  const optimizedSrc = useMemo(() => {
    if (!src || src.includes('f=webp')) return src;
    return `${src}${src.includes('?') ? '&' : '?'}f=webp&w=768`;
  }, [src]);

  const generatedSrcSet = useMemo(() => {
    if (srcSet || !src) return srcSet;
    return [256, 512, 768, 1024]
      .map((w) => `${src}${src.includes('?') ? '&' : '?'}w=${w}&f=webp ${w}w`)
      .join(', ');
  }, [src, srcSet]);

  return (
    <>
      {!loaded && (
        <>
          {isSkeleton && (
            <Skeleton className="absolute inset-0 z-0 h-full w-full" />
          )}
          {placeholder === 'blur' && blurDataURL && (
            <img
              src={blurDataURL}
              alt=""
              className="absolute inset-0 h-full w-full blur-lg"
              aria-hidden="true"
            />
          )}
        </>
      )}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        sizes={
          sizes ??
          '(max-width: 512px) 100vw, (max-width: 768px) 512px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, 1280px'
        }
        srcSet={generatedSrcSet}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'relative z-10 transition-opacity',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...props}
      />
    </>
  );
}
