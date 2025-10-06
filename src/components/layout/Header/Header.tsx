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
        'fixed top-0 left-0 z-10 w-full border-b border-gray-200 bg-white px-6 md:z-20',
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between md:h-[72px] md:px-16">
        {children}
      </div>
    </header>
  );
}
