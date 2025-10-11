'use client';

import Link from 'next/link';

import { ReactNode, MouseEventHandler } from 'react';

import { Body3 } from 'ddingdong-design-system';

import { cn } from '@/lib/utils';

type Props = {
  href: string;
  onClick?: MouseEventHandler<HTMLElement>;
  active?: boolean;
  className?: string;
  children: ReactNode;
};

export function NavigationItem({
  href,
  onClick,
  active,
  className,
  children,
}: Props) {
  const base =
    'inline-flex items-center gap-2 rounded-md px-2 py-2 whitespace-nowrap transition-colors duration-200';
  const color = active
    ? 'text-primary-500'
    : 'text-neutral-500 hover:text-primary-300';

  return (
    <Link href={href} onClick={onClick} className={cn(base, color, className)}>
      <Body3 weight="semibold">{children}</Body3>
    </Link>
  );
}
