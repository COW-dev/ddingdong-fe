'use client';

import Link from 'next/link';

import { ReactNode, MouseEventHandler } from 'react';

import { Body3 } from 'ddingdong-design-system';

import { cn } from '@/lib/utils';

type Props = {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
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
    'inline-flex items-center gap-2 rounded-md px-4 py-2 whitespace-nowrap transition-colors duration-200';
  const color = active
    ? 'text-primary-500'
    : 'text-neutral-500 hover:text-primary-300';

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        className={cn(base, color, className)}
        aria-current={active ? 'page' : undefined}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        <Body3 weight="semibold">{children}</Body3>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      className={cn(base, color, className)}
      aria-current={active ? 'page' : undefined}
    >
      <Body3 weight="semibold">{children}</Body3>
    </button>
  );
}
