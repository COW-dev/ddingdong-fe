'use client';

import { useId, useState, type Ref } from 'react';

import { cn } from '@/lib/utils';

import { MenuContext } from './menu-context';

type Props = {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  containerRef?: Ref<HTMLDivElement>;
};

export function MenuContainer({
  children,
  className,
  defaultOpen = false,
  containerRef,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const triggerId = useId();
  const contentId = useId();

  return (
    <MenuContext.Provider value={{ open, setOpen, triggerId, contentId }}>
      <div ref={containerRef} className={cn('relative', className)}>
        {children}
      </div>
    </MenuContext.Provider>
  );
}
