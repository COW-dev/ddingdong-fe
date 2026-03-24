import { ComponentProps } from 'react';

import { cn } from '@/shared/lib/core';

type AvatarProps = {
  /**
   * Size of the avatar.
   * @default 'lg'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * URL of the avatar image.
   */
  src: string;
  /**
   * Alternative text for the avatar image.
   */
  alt: string;
  /**
   * CSS class name for the avatar container.
   */
  className?: string;
} & Omit<ComponentProps<'img'>, 'src' | 'alt'>;

const avatarSizeMap = {
  sm: { class: 'size-14', width: 56, height: 56 },
  md: { class: 'size-16', width: 64, height: 64 },
  lg: { class: 'size-18', width: 72, height: 72 },
  xl: { class: 'size-20', width: 80, height: 80 },
} as const;

export function Avatar({ size = 'lg', src, alt, className, ...props }: AvatarProps) {
  const { class: sizeClass, width, height } = avatarSizeMap[size];

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={cn('rounded-full border border-gray-200 object-cover', sizeClass, className)}
      {...props}
    />
  );
}
