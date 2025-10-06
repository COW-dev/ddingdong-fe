'use client';

import Link from 'next/link';

import { ReactNode } from 'react';

import { IconName, Icon, Body3 } from 'ddingdong-design-system';

import { cn } from '@/lib/utils';

import { useMenuCtx } from './uesMenuCtx';

export type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  icon?: IconName;
  className?: string;
  disabled?: boolean;
};

export function MenuItem({
  children,
  onClick,
  href,
  target,
  icon,
  className,
  disabled,
}: Props) {
  const { setOpen } = useMenuCtx();
  const common = cn(
    'flex w-full items-center font-semibold gap-3 whitespace-nowrap px-4 py-2 text-gray-400 transition-colors duration-150 hover:bg-gray-100 ',
    disabled && 'pointer-events-none opacity-50',
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={common}
        role="menuitem"
        onClick={() => setOpen(false)}
      >
        {icon && <Icon name={icon} size={16} />}
        {children}
      </Link>
    );
  }

  const handleMenuItemClick = () => {
    if (disabled) return;
    onClick?.();
    setOpen(false);
  };

  return (
    <Body3
      className={common}
      role="menuitem"
      weight="semibold"
      onClick={handleMenuItemClick}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </Body3>
  );
}
