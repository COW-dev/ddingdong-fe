'use client';

import { cn } from '@/lib/utils';

import { useMenuCtx } from './useMenuCtx';

type Props = {
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
};

export function MenuTrigger({
  children,
  className,
  'aria-label': ariaLabel = 'open-menu',
}: Props) {
  const { open, setOpen, triggerId, contentId } = useMenuCtx();

  return (
    <button
      id={triggerId}
      aria-haspopup="menu"
      aria-expanded={open ? 'true' : 'false'}
      aria-controls={contentId}
      onMouseDown={() => {
        setOpen(!open);
      }}
      className={cn(
        'hover:text-primary-300 inline-flex items-center gap-2 rounded-md px-4 py-2 text-base font-semibold whitespace-nowrap text-neutral-500 transition-colors duration-200',
        className,
      )}
      aria-label={ariaLabel}
      type="button"
    >
      {children}
    </button>
  );
}
