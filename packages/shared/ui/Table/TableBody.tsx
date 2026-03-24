import * as React from 'react';

import { cn } from '@/shared/lib/core';

export type Props = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string;
  children?: React.ReactNode;
};

export function TableBody({ className, children, ...props }: Props) {
  return (
    <tbody className={cn('bg-white', className)} {...props}>
      {children}
    </tbody>
  );
}
