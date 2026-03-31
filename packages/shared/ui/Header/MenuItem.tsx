'use client';

import { ReactNode } from 'react';

import { IconName } from '../assets';
import { Icon } from '../Icon';
import { Body3 } from '../Typography';

import { useMenuCtx } from './useMenuCtx';

import { cn } from '@/shared/lib/core';

export type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  rel?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  icon?: IconName;
  className?: string;
  disabled?: boolean;
};

export function MenuItem({
  children,
  onClick,
  href,
  rel,
  target = '_self',
  icon,
  className,
}: Props) {
  const { setOpen } = useMenuCtx();

  const common = cn(
    'flex w-full items-center font-semibold gap-3 whitespace-nowrap px-4 py-2 text-gray-400 transition-colors duration-150 hover:bg-gray-100',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={common}
        role="menuitem"
        onClick={() => setOpen(false)}
      >
        {icon && <Icon name={icon} size={16} />}
        {children}
      </a>
    );
  }

  const handleMenuItemClick = () => {
    onClick?.();
    setOpen(false);
  };

  return (
    <Body3 className={common} role="menuitem" weight="semibold" onClick={handleMenuItemClick}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </Body3>
  );
}
