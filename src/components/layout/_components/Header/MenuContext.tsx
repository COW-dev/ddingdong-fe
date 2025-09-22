'use client';

import { forwardRef, useId, useState } from 'react';

import { cn } from '@/lib/utils';

import { MenuContext } from './menu-context';

type Props = {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
};

export const MenuContainer = forwardRef<HTMLDivElement, Props>(
  ({ children, className, defaultOpen = false }, ref) => {
    const [open, setOpen] = useState(defaultOpen);
    const triggerId = useId();
    const contentId = useId();

    return (
      <MenuContext.Provider value={{ open, setOpen, triggerId, contentId }}>
        <div ref={ref} className={cn('relative', className)}>
          {children}
        </div>
      </MenuContext.Provider>
    );
  },
);

MenuContainer.displayName = 'MenuContainer';
