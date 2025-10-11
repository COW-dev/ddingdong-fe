'use client';

import { Flex } from 'ddingdong-design-system';

import { cn } from '@/lib/utils';

export type Props = {
  children: React.ReactNode;
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
      <Flex
        as="div"
        dir="row"
        alignItems="center"
        justifyContent="between"
        className="mx-auto h-16 w-full max-w-6xl md:h-[72px] md:px-16"
      >
        {children}
      </Flex>
    </header>
  );
}
