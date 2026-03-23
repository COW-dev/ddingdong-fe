'use client';

import { ReactNode } from 'react';

import { cn } from '../../lib/core';
import { Body3 } from '../Typography';

type Props = {
  href: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  children: ReactNode;
};

export function NavigationItem({ href, onClick, active, className, children }: Props) {
  const base =
    'inline-flex items-center gap-2 rounded-md px-2 py-2 whitespace-nowrap transition-colors duration-200';
  const color = active ? 'text-primary-500' : 'text-neutral-500 hover:text-primary-300';

  return (
    <a href={href} onClick={onClick} className={cn(base, color, className)}>
      <Body3 weight="semibold">{children}</Body3>
    </a>
  );
}
