'use client';

import { cn } from '@/lib/utils';

export type Props = {
  /**
   * The content to display inside the header.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes to apply to the header.
   */
  className?: string;
};

export function Header({ children, className }: Props) {
  return (
    <header
      className={cn(
        'fixed top-0 z-40 w-full border-b border-gray-200 bg-white',
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 md:px-8">
        {children}
      </div>
    </header>
  );
}
