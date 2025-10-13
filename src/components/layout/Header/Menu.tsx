'use client';

import { useRef } from 'react';

import { useClickOutside } from '@/hooks/common/useClickOutside';
import { cn } from '@/lib/utils';

import { useMenuCtx } from './uesMenuCtx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Menu({ children, className }: Props) {
  const { open, contentId, triggerId, setOpen } = useMenuCtx();
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: menuRef,
    handler: () => setOpen(false),
  });

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      className={cn(
        'ring-opacity-5 absolute left-1/2 mt-6 w-fit min-w-25 -translate-x-1/2 transform justify-center overflow-hidden rounded-lg border border-gray-200 bg-white text-center whitespace-nowrap text-neutral-500 shadow-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
